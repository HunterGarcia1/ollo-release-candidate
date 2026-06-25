"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";

type ReferralStatus = "Joined" | "Pending";

type Referral = {
  email: string;
  status: ReferralStatus;
  joinedLabel: string;
};

type ReferralDashboard = {
  email: string;
  referralCode: string;
  referralUrl: string;
  waitlistPosition: number;
  referrals: Referral[];
};

type OlloReferralFlowProps = {
  isOpen: boolean;
  onClose: () => void;
  initialReferralCode?: string;
};

async function joinWaitlist(input: {
  email: string;
  referralCode?: string;
}): Promise<ReferralDashboard> {
  const response = await fetch("/api/waitlist/join", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Unable to join waitlist");
  }

  return response.json();
}

async function requestDashboardLink(email: string): Promise<void> {
  const response = await fetch("/api/waitlist/dashboard-link", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Unable to send dashboard link");
  }
}

function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;
  return `${name.slice(0, 1)}***@${domain}`;
}

export function OlloReferralFlow({
  isOpen,
  onClose,
  initialReferralCode = "",
}: OlloReferralFlowProps) {
  const [mode, setMode] = useState<"join" | "returning" | "dashboard" | "sent">("join");
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState(initialReferralCode);
  const [dashboard, setDashboard] = useState<ReferralDashboard | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const joinedCount = useMemo(
    () => dashboard?.referrals.filter((referral) => referral.status === "Joined").length ?? 0,
    [dashboard],
  );

  const pendingCount = useMemo(
    () => dashboard?.referrals.filter((referral) => referral.status === "Pending").length ?? 0,
    [dashboard],
  );

  if (!isOpen) return null;

  async function handleJoin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const nextDashboard = await joinWaitlist({
        email,
        referralCode: referralCode.trim() || undefined,
      });

      setDashboard(nextDashboard);
      setMode("dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleReturning(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await requestDashboardLink(email);
      setMode("sent");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function copyReferralLink() {
    if (!dashboard?.referralUrl) return;
    await navigator.clipboard.writeText(dashboard.referralUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="olloReferralBackdrop" role="presentation">
      {mode === "join" && (
        <form className="olloReferralModal" onSubmit={handleJoin}>
          <button className="olloReferralClose" type="button" onClick={onClose} aria-label="Close">
            x
          </button>

          <h2>Join Ollo waitlist</h2>
          <p className="olloReferralMuted">
            Enter your email to join. If you arrived from a friend, their referral code is attached here.
          </p>

          <label>
            <span>Email</span>
            <input
              required
              type="email"
              value={email}
              placeholder="you@example.com"
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label>
            <span>Referral code <em>(optional)</em></span>
            <input
              type="text"
              value={referralCode}
              placeholder="OLLO-8KQ2"
              autoComplete="off"
              onChange={(event) => setReferralCode(event.target.value)}
            />
          </label>

          {error && <p className="olloReferralError">{error}</p>}

          <div className="olloReferralActions">
            <button className="olloReferralButton primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button className="olloReferralButton" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>

          <div className="olloReferralReturn">
            <p>Already joined? Get a private dashboard link sent to your inbox.</p>
            <button className="olloReferralButton cyan small" type="button" onClick={() => setMode("returning")}>
              Email my link
            </button>
          </div>
        </form>
      )}

      {mode === "returning" && (
        <form className="olloReferralModal" onSubmit={handleReturning}>
          <button className="olloReferralClose" type="button" onClick={onClose} aria-label="Close">
            x
          </button>

          <h2>Get your dashboard link</h2>
          <p className="olloReferralMuted">
            Enter the email you used for the waitlist. Ollo sends a fresh magic link. No password needed.
          </p>

          <label>
            <span>Email</span>
            <input
              required
              type="email"
              value={email}
              placeholder="you@example.com"
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          {error && <p className="olloReferralError">{error}</p>}

          <div className="olloReferralActions">
            <button className="olloReferralButton primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send magic link"}
            </button>
            <button className="olloReferralButton" type="button" onClick={() => setMode("join")}>
              Back
            </button>
          </div>
        </form>
      )}

      {mode === "sent" && (
        <section className="olloReferralModal">
          <button className="olloReferralClose" type="button" onClick={onClose} aria-label="Close">
            x
          </button>
          <span className="olloReferralPill private">MAGIC LINK SENT</span>
          <h2>Check your email.</h2>
          <p className="olloReferralMuted">
            We sent a private dashboard link to {maskEmail(email)}.
          </p>
        </section>
      )}

      {mode === "dashboard" && dashboard && (
        <section className="olloReferralModal dashboard">
          <button className="olloReferralClose" type="button" onClick={onClose} aria-label="Close">
            x
          </button>

          <span className="olloReferralPill private">PRIVATE DASHBOARD</span>
          <h2>Referral dashboard</h2>
          <p className="olloReferralMuted">
            {maskEmail(dashboard.email)} owns this private view. The code {dashboard.referralCode} is public.
          </p>

          <div className="olloReferralMetrics">
            <div>
              <b>{joinedCount}</b>
              <span>Joined</span>
            </div>
            <div>
              <b>{pendingCount}</b>
              <span>Pending</span>
            </div>
            <div>
              <b>{dashboard.waitlistPosition}</b>
              <span>Position</span>
            </div>
          </div>

          <div className="olloReferralLinkBox">
            <strong>Public referral link</strong>
            <span>{dashboard.referralUrl}</span>
          </div>

          <button className="olloReferralButton primary small" type="button" onClick={copyReferralLink}>
            {copied ? "Copied" : "Copy link"}
          </button>

          <table className="olloReferralTable">
            <thead>
              <tr>
                <th>Referral</th>
                <th>Status</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.referrals.map((referral) => (
                <tr key={`${referral.email}-${referral.joinedLabel}`}>
                  <td>{maskEmail(referral.email)}</td>
                  <td>
                    <span className={`olloReferralPill ${referral.status === "Joined" ? "joined" : "pending"}`}>
                      {referral.status}
                    </span>
                  </td>
                  <td>{referral.joinedLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
