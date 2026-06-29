# Signed-Out Account State

The terminal is primarily an authenticated product surface. In the normal signed-out case, route the user to sign-in before showing the terminal. This state exists as a polished fallback for auth loading, expired sessions, or any moment where the shell renders before Turnkey has resolved a user.

## Visual Rule

Signed in:

```txt
[ OD ]  Ollo Demo       >
       Global account
```

Signed out:

```txt
[ user icon ]  Sign in              >
              Access your account
```

## Behavior

- Clicking the signed-in row opens the account menu with Settings, Referrals, and Sign out.
- Clicking the signed-out row opens Turnkey sign-in or routes to the sign-in screen.
- Do not show Settings, Referrals, or Sign out until a user exists.
- During auth loading, show either a subtle skeleton row or the signed-out row disabled until auth resolves.

## Suggested React Shape

```tsx
type AccountIdentityState =
  | { status: "loading" }
  | { status: "signedOut" }
  | {
      status: "signedIn";
      displayName: string;
      accountLabel: string;
      initials: string;
    };

type AccountIdentityProps = {
  state: AccountIdentityState;
  onOpenAccountMenu: () => void;
  onSignIn: () => void;
};

export function AccountIdentity({
  state,
  onOpenAccountMenu,
  onSignIn,
}: AccountIdentityProps) {
  if (state.status === "loading") {
    return (
      <button className="account-trigger is-loading" disabled>
        <span className="avatar avatar-placeholder" />
        <span className="account-copy">
          <span className="account-name">Checking session</span>
          <span className="account-subtitle">Please wait</span>
        </span>
      </button>
    );
  }

  if (state.status === "signedOut") {
    return (
      <button className="account-trigger" onClick={onSignIn}>
        <span className="avatar avatar-signed-out" aria-hidden="true">
          {/* Replace with app icon component. */}
        </span>
        <span className="account-copy">
          <span className="account-name">Sign in</span>
          <span className="account-subtitle">Access your account</span>
        </span>
        <span className="account-chevron">›</span>
      </button>
    );
  }

  return (
    <button className="account-trigger" onClick={onOpenAccountMenu}>
      <span className="avatar">{state.initials}</span>
      <span className="account-copy">
        <span className="account-name">{state.displayName}</span>
        <span className="account-subtitle">{state.accountLabel}</span>
      </span>
      <span className="account-chevron">›</span>
    </button>
  );
}
```

## Menu Contract

```tsx
if (state.status === "signedOut") {
  return (
    <AccountPopover>
      <button onClick={onSignIn}>Sign in</button>
    </AccountPopover>
  );
}

if (state.status === "signedIn") {
  return (
    <AccountPopover>
      <button onClick={goToSettings}>Settings</button>
      <button onClick={goToReferrals}>Referrals</button>
      <button onClick={confirmSignOut}>Sign out</button>
    </AccountPopover>
  );
}
```

## Static Preview

Open `auth-states.html` to compare the current signed-in row and the proposed signed-out fallback row in the Ollo terminal styling.
