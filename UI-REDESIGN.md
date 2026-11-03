# NEBULA UI redesign

This update is a visual redesign of the existing web interface. It does not change signal generation, market analysis, WebSocket transport, authentication, or trade execution.

## Visual changes
- New NEBULA AI brand header and live-state indicator.
- Dark glassmorphism terminal styling with cyan/violet/mint accents, subtle grid texture, gradients, and restrained glow.
- Refined category tabs, timeframe selector, pair cards, search field, and primary scan action.
- Animated indicator cards, progress bar, and scan-module status labels.
- Enhanced Pocket Option scan overlay with radar rings, sweep beam, and module labels.
- Responsive layout and reduced-motion support.

## Validation
- `node --check` passed for `ai-bot.js`, `scanner-po.js`, `signal-engine.js`, `market-signal.js`, and `server.js`.
- Existing `node smoke-test.js` completed successfully.
- Full HTTP server startup was not validated in this environment because project dependencies (including `express`) are not installed. Run `npm install` before `npm start`.
