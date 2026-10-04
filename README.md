# The Flex Academy: password-protected build

This branch is for **publishing only**. It contains no readable site code, just an encrypted copy of the page behind a password screen. Point GitHub Pages at this branch to share a protected link.

| File | What it is |
|---|---|
| `index.html` | Password screen + the encrypted page (AES-256-GCM, key derived with PBKDF2-SHA256, 600k rounds). The password itself is not stored anywhere. |
| `tools/encrypt-page.js` | Builds `index.html` from the single-file page. |
| `tools/gate-template.html` | The password screen design. |

## Updating the protected page after changes on `main`

1. On `main`, rebuild the single file: `node source/tools/build-single-file.js site/v2/index.html site/v2/assets share/The-Flex-Academy.html`
2. Copy `share/The-Flex-Academy.html` somewhere outside the repo.
3. Switch to this branch and run: `node tools/encrypt-page.js path/to/The-Flex-Academy.html index.html` (it asks for the password).
4. Commit and push `index.html`.

## Limits

GitHub Pages is a static host, so the password is checked in the visitor's browser. The content is properly encrypted, but a short or common password can be guessed offline by anyone who downloads `index.html`. Use a long, uncommon password for anything sensitive. The `main` branch still holds the readable source; keep the repository private, or remove `main`'s Pages publishing, if that matters.
