# Paste this into Claude Code (run `claude` inside the Flex-Academy-Handoff folder)

---

I'm taking over a landing-page design assignment for **The Flex Academy**. Everything is in this folder. Please:

1. Read `README.md` and `BRIEF.md` first, then skim `site/v2/index.html` (the current version; V1 in `site/v1/` is frozen, don't edit it).
2. Start the local preview with `node site/server.js` and open http://localhost:8642/v2/.
3. Confirm back to me in a few lines: the audience split, the page structure, the design tokens (Deep Juniper `#2B4642`, sun yellow `#F4B740`, Inter, Liquid Glass UI, light/dark), and the open items listed in the README.

Ground rules that were agreed with the previous designer:
- Keep the structure and the Liquid Glass look. Change only what I ask.
- Copy stays short and benefit-led; no long paragraphs.
- Pills/chips instead of dropdowns for any multi-option choice.
- Every interaction must actually work (forms validate, flows reach a confirmation), and must be responsive at 1440 px and 390 px, in light and dark mode.
- After each change, check it in a real browser (Puppeteer test scripts are in `source/tools/`) and rebuild the single shareable file with `node source/tools/build-single-file.js site/v2/index.html site/v2/assets share/The-Flex-Academy.html`.

My first request is: <write what you want next here>
