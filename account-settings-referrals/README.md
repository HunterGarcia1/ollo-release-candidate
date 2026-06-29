# Ollo Account, Settings, Referrals Handoff

This is the clean static handoff for the account menu and related pages.

## Review

Open `index.html` directly, or run a local static server from this folder:

```bash
python3 -m http.server 8766
```

Then open:

`http://localhost:8766/index.html`

Shareable routes:

- `#/settings/profile`
- `#/settings/security`
- `#/referrals`
- `#/portfolio`

## Included Behavior

- Clicking `Ollo Demo` opens the account popover.
- `Settings` routes to account settings.
- `Referrals` routes to the referrals dashboard.
- `Sign out` opens a confirmation modal with `Cancel` and `Sign out`.
- Left navigation updates active state for portfolio, settings, and referrals.
- Settings sections are navigable and shareable by hash route.
- Referral copy button copies the public referral link when browser permissions allow it.
- `auth-states.html` shows the signed-in and signed-out account row states.
- `SIGNED_OUT_STATE.md` documents the React implementation contract for auth loading, signed-out, and signed-in states.

## Content Scope

Only user-provided settings content is included.

Profile Settings:

- Display Name: `Steve`
- Email Address: `steve@ollo.trade`
- Time Zone: `Eastern Time (US & Canada)`
- Close Account

Security Settings:

- Passkey
- Google
- Apple, `Set Up`
- Authenticator, `Set Up`
- Signed in Devices
- Lock Account

Referrals:

- Private dashboard label
- `h***@blockfx.trade owns this private view. The code OLLO-6592 is public.`
- Joined: `0`
- Pending: `0`
- Position: `6`
- Public referral link: `https://ollo.foundation/?ref=OLLO-6592`
- Empty referral table

## Integration Notes

- Replace the static hash router in `app.js` with your Next routes or router state.
- Replace CSS-drawn placeholder icons with your app's icon system.
- Keep the account popover anchored to the sidebar account row.
- Keep Settings as a full page, not a center modal.
- Keep Sign out as a confirmation modal.
- Turnkey-specific actions should wire from the Security Settings rows.
- If there is no signed-in Turnkey user, use the signed-out account row as a sign-in entry point and do not render Settings, Referrals, or Sign out in the account menu.
