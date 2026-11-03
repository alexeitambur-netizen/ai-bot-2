# Bot-AI — patched signal engine

This archive contains a focused first-pass repair of `signal-engine.js`.

## Fixes
- Removed the raw WebSocket tick-direction override. A short tick burst no longer bypasses scored candle/market analysis and force a CALL/PUT.
- Added strict OHLC and timestamp validation. Invalid, duplicate, or out-of-order candles produce `NO_TRADE` instead of feeding corrupted data into indicators.
- Backtest entry is now modeled at the evaluated candle's **open**, not assumed to be the previous candle's close. Outcome is evaluated against that candle's close.

## Test
Run:
```bash
node smoke-test.js
```
The smoke test checks:
1. Engine emits a valid decision on a 240-candle fixture.
2. Malformed OHLC is rejected.
3. Tick burst cannot override candle-derived direction.
4. Backtest executes without runtime errors.

## Important limitations
The test fixture is synthetic and deliberately trending. Its result is **not** evidence of real-market profitability or accuracy. Before live use:
- replay actual Pocket Option candles/ticks with correct broker timestamps and expiry semantics;
- account for payout, spread/quote quirks, latency, ties/pushes, and OTC separately;
- run walk-forward/out-of-sample tests on multiple assets and market regimes;
- confirm UI calls `SignalEngine.decide` and no parallel signal logic bypasses it.
This is not a guarantee of profit. Keep live trading disabled until a real-data test is completed.
