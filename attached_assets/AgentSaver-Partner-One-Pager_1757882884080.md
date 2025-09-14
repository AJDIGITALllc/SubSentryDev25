# AgentSaver — Partner One-Pager (B2B2C)

## What Users See
- Detect subscriptions (bank + email receipts)
- One-tap “Cancel with Proof” — receipt + portal screenshot
- Typical resolution: **hours, not days**

## What You Get (Fintech/Neobank)
- Higher NPS & lower disputes
- New revenue share per completed task
- Stickier daily/weekly engagement

## Pilot Proposal (60 Days)
- Cohort: 5–10k users
- Integration: deep link + webhook (no SDK required)
- Shared dashboard: win rate, time-to-resolution, top merchants

## Integration Sketch
- **Deep Link**: `https://agentsaver.app/partner/start?token=<jwt>`
- **Webhook (POST)**: `/webhooks/task-succeeded` → `{userId, taskId, merchantId, proofUrls[]}`
- **Data**: no raw credentials; tokenized access only

## Pricing & Rev Share
- Flat fee per task ($5–$15 depending on complexity)
- 20–30% revenue share to partner for completed tasks

## Compliance & Trust
- Authorized Proxy consent (revocable)
- WORM evidence vault + notarized proof
- Immutable audit logs; PII redaction

## Why Now
- Subscription fatigue + regulatory tailwinds (dark pattern crackdowns)
- Agentic AI makes cancellations scalable and fast

**15‑minute sandbox demo available.**
Contact: partnerships@agentsaver.app
