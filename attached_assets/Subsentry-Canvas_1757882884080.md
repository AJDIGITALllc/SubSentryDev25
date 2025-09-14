# Subsentry — The Agentic Subscription Superhero

## Cover
**Tagline:** Cancel anything. Automatically. With proof.  
**Logo Concept:** Shield + “S” + lightning bolt emblem.

---

## Executive Summary
- Subscription fatigue is a $18.5B+ opportunity.  
- Existing players like Rocket Money track subscriptions but don’t reliably cancel.  
- **Subsentry is different:** a superhero-like AI that *executes cancellations with proof.*  
- **USP:** Autonomous execution, multi-channel persistence, verifiable evidence, transparent pricing.

---

## Validation + Risk Matrix

### Problem
- Hidden cancellation flows, phone-only requirements, retention tactics.  
- Average consumer loses $1,000+/year on unused subscriptions.  
- Current apps stop at *tracking* instead of *acting.*

### Audience
1. Time-starved professionals (25–40).  
2. Freelancers & creators with 10–25 SaaS tools.  
3. Families managing shared household subs.  

### Value Proposition
- Autonomous cancellation agents.  
- Multi-channel persistence (portal → email → chat → phone → letter).  
- Immutable proof of cancellation.  
- Transparent pay-per-task pricing.

### Risk Matrix

| Risk Area          | Severity | Mitigation |
|--------------------|----------|------------|
| Legal (impersonation) | High | Authorized proxy consent |
| Data Security      | High | E2E encryption, tokenization |
| Trust/Adoption     | High | Proof receipts + refund guarantee |
| Execution Errors   | Medium | Two-tier approval + logs |
| Merchant Pushback  | Medium | Multi-channel redundancy |
| Technical Scaling  | Medium | Crowdsourced recipes + AI monitoring |

---

## Personas & Market Trends

### Personas
- **Time-Starved Pro:** “I’d rather lose $200/year than spend 4 hours on hold.”  
- **Subscription-Stacked Creator:** 10–25 SaaS tools, forgotten trials, overlapping features.  
- **Household CFO:** Managing multiple subscriptions for family members.

### Market Trends
- Subscription fatigue → 73% of US consumers feel “drowning” in subs.  
- FTC crackdown on “dark patterns.”  
- Agentic AI acceptance (voice & task automation).  
- Outcome-based pricing preferred.

---

## Competitive Landscape

### Key Competitors
- Rocket Money: polished but confusing fees, limited automation.  
- Trim: free but dated UX, weak automation.  
- Billshark: negotiation-only, no cancellations.  
- PocketGuard/Hiatus: basic detection, no execution.

### Gap Chart

| Feature              | Rocket Money | Trim | Billshark | Others | **Subsentry** |
|----------------------|--------------|------|-----------|--------|---------------|
| Subscription detection | ✅ | ✅ | ❌ | ✅ | ✅ Advanced |
| Automated cancellations | ⚠️ Limited | ⚠️ Limited | ❌ | ❌ | ✅ 95%+ |
| Multi-channel paths | ❌ | ❌ | ❌ | ❌ | ✅ Yes |
| Proof receipts       | ❌ | ❌ | ❌ | ❌ | ✅ Yes |
| Transparent pricing  | ❌ | ❌ | ❌ | ✅ | ✅ Flat fee |
| Scalability          | ⚠️ Human-based | ⚠️ | ❌ | ⚠️ | ✅ Unlimited |

---

## Architecture Schema

### Core Entities
- Users, BankConnections, Transactions, Merchants, Subscriptions.  
- CancellationRecipes, Agents, Tasks, CommunicationLogs, Evidence, PricingRules, Invoices.  

### State Machine
```
queued → in_progress → try_portal → try_email → try_chat → try_phone → try_letter → succeeded/failed
```
- Success requires dual-artifact evidence (e.g., portal screenshot + email receipt).

### File/Folder Schema
```
/web (Next.js frontend)
/functions (Cloud Functions)
  /agents (orchestrator, voice, web automation)
  /services (bank, recipes, billing, consent)
  /middlewares (auth, consent)
/infra (firestore.rules, storage.rules)
/seed (sample recipes)
```

### Security
- Authorized proxy consent.  
- WORM evidence vault.  
- Immutable logs.  
- MFA before phone/legal actions.

---

## Final Build Prompt (Upgraded)

### Tech Stack
- **Frontend:** Next.js + shadcn/ui.  
- **Backend:** Firebase Auth, Firestore, Cloud Functions.  
- **Automation:** Playwright, Bland/Retell AI voice.  
- **Banking:** Plaid + Email receipts.  
- **Billing:** Stripe.  
- **Evidence:** GCS WORM + OpenTimestamps.

### Acceptance Criteria
- 90%+ detection accuracy.  
- 85%+ success for streaming/digital.  
- Dual-artifact proof enforced.  
- Stripe auto-refunds for failed tasks.

### QA Plan
- Functional: 10 end-to-end merchant cancels.  
- Security: MFA, consent enforcement.  
- Evidence: notarization checks.  
- Cost: guardrails enforced.  
- Accessibility: WCAG 2.1 AA.

---

## Add-ons Pack
- **Next.js ISR**: `/scorecards/[merchant].tsx` + loader.  
- **Cloud Function**: aggregates tasks → writes scorecards JSON.  
- **Schema**: merchant scorecard JSON structure.  
- **Partner One-Pager**: Markdown + PDF templates.

---

## Growth Levers
1. **Merchant Scorecards**: publish win rates, difficulty, friction flags → SEO + trust.  
2. **AgentPass**: $10/mo includes 3 cancels, priority support.  
3. **Referral Program**: Give $5, get $5.  
4. **Lifecycle Comms**: D0 scan → D30 proof + invite.  
5. **Partnerships**: Neobanks, fintechs, consumer advocacy groups.

---

## Subsentry Brand Identity (Superhero Theme)

### Archetype
- Hero + Guardian.  
- Rebel against “dark pattern villains.”

### Colors
- **Sentinel Blue (#1C4E80)** — trust, strength.  
- **Guardian Green (#3BB273)** — savings, security.  
- **Signal Yellow (#FFD447)** — hero energy.  
- **Proof Black (#111111)** — authority.

### Typography
- Headlines: Bangers / Impact.  
- Body: Inter / Work Sans.  
- Numbers: IBM Plex Mono.

### Tone
- Bold, confident, superhero metaphors.  
- Microcopy: “Justice served — proof secured.”

### Logo
- Shield + “S” + lightning bolt.  
- Hero palette: blue + yellow + green.

### Motion
- Shield swoosh arrival.  
- Victory check flash.  
- Alert pulse for escalations.

### Brand Story
Subsentry is your financial superhero. While companies hide cancellation buttons and trap you on hold, Subsentry fights back. It cancels anything, anywhere, automatically, with proof.

---

## Appendices
- SWOT / PESTLE templates.  
- Automation recipes (Zapier, n8n).  
- Delivery workflow: GitHub → Replit → Firebase → Windsurf logs.
