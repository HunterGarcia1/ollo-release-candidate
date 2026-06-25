# Ollo Release Candidate

This repository collects the current Ollo UI handoff work in one private release-candidate workspace. Each feature area is kept in its own folder so it can be reviewed, replaced, or integrated independently without creating a new repo for every prototype.

## Structure

- `user-portfolio/` - existing Ollo terminal user portfolio prototype and design token reference.
- `account-settings-referrals/` - static handoff for the terminal account popover, full-page settings views, referral dashboard view, and sign-out modal.
- `waitlist-referral-dashboard/` - existing waitlist referral dashboard source copied from `HunterGarcia1/Waitlist-Referral-dashboard`.

## Review The Account Settings Handoff

Open `account-settings-referrals/index.html` in a browser. It is a static prototype with hash routes:

- `#/settings/profile`
- `#/settings/security`
- `#/referrals`
- `#/portfolio`

The sidebar account row opens a compact account menu with Settings, Referrals, and Sign Out. Settings and Referrals are full-page terminal views styled to match the Ollo portfolio screen rather than center modals.

## Account Settings Scope

The settings prototype intentionally includes only the flows provided in the reference screenshots:

- Profile Settings: display name, email address, time zone, close account.
- Security Settings: passkey, Google, Apple, authenticator, signed in devices, lock account.
- Referrals: joined, pending, position, public referral link, copy link, empty referral table.
- Sign Out: confirmation modal with Cancel and Sign Out actions.

## Integration Notes

- The `account-settings-referrals/` handoff is plain HTML, CSS, and JavaScript so design and interaction can be reviewed without a build step.
- The styles use Ollo terminal values from the provided design token reference: dark canvas, raised panels, restrained borders, compact rows, and the existing sidebar/header proportions.
- The static routes and click handlers are intentionally simple. In the production React/Next implementation, map these to the app router, Turnkey account/auth flows, and the existing referrals destination.
