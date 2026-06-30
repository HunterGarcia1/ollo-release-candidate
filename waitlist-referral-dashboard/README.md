# Ollo Referral Flow

Front-end handoff for the Ollo waitlist referral modal and private referral dashboard.

This repo intentionally does not include the Ollo landing page, hero animation, or existing `Join Waitlist` button. It only contains the missing referral flow that should open from the existing landing page CTA.

## Files

- `src/OlloReferralFlow.tsx` - React/Next client component for the waitlist modal, returning-user magic link request, and private referral dashboard.
- `src/ollo-referral-flow.css` - Styles for the modal and dashboard.

## Styling Rulebook

The referral modal should feel like a native extension of the Ollo landing page, not a separate dashboard product.

- Keep the existing centered modal flow and component structure.
- Use an off-white panel surface: `#f8f7f2`.
- Use square geometry: no rounded cards, pills, or buttons.
- Use black outlines and black slab shadows, matching the current waitlist modal.
- Use lime/green only for primary action and confirmed states.
- Do not use cyan/blue/purple accent badges for this flow.
- Keep helper copy soft grey: `#77736b`.
- Keep dashboard content quiet and tabular: boxed metrics, one public referral link box, one copy action, then referral rows.
- The referral code is public. Dashboard access remains private via magic link.
- Do not add social share buttons unless they perform a true native share action.

## Expected Integration

Import the component and CSS wherever the existing landing page controls the waitlist modal.

```tsx
import { useState } from "react";
import { OlloReferralFlow } from "./src/OlloReferralFlow";
import "./src/ollo-referral-flow.css";

export function LandingPage() {
  const [isReferralOpen, setIsReferralOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsReferralOpen(true)}>Join Waitlist</button>

      <OlloReferralFlow
        isOpen={isReferralOpen}
        onClose={() => setIsReferralOpen(false)}
      />
    </>
  );
}
```

If the visitor arrives through a referral URL, pass the code into `initialReferralCode`.

```tsx
<OlloReferralFlow
  isOpen={isReferralOpen}
  onClose={() => setIsReferralOpen(false)}
  initialReferralCode={referralCodeFromUrl}
/>
```

## Backend Contract

### `POST /api/waitlist/join`

Request:

```json
{
  "email": "user@example.com",
  "referralCode": "OLLO-8KQ2"
}
```

`referralCode` is optional.

Response:

```json
{
  "email": "user@example.com",
  "referralCode": "OLLO-ABCD",
  "referralUrl": "https://ollo.foundation?ref=OLLO-ABCD",
  "waitlistPosition": 31,
  "referrals": [
    {
      "email": "friend@example.com",
      "status": "Joined",
      "joinedLabel": "Today"
    },
    {
      "email": "pending@example.com",
      "status": "Pending",
      "joinedLabel": "Invite opened"
    }
  ]
}
```

The API should also send the private dashboard magic link to the user's email after signup.

### `POST /api/waitlist/dashboard-link`

Request:

```json
{
  "email": "user@example.com"
}
```

Response can be any `2xx` status. The server should send a private magic link to the user's email. Do not return dashboard data directly from this endpoint.

## Security Notes

- Referral codes are public and only used for attribution.
- Private dashboard access should use a magic link token or authenticated session.
- Do not let someone view dashboard data by entering only an email address.
- Mask referred emails in the UI unless users explicitly consent to being shown.
