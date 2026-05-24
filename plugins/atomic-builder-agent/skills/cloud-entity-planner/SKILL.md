---
name: cloud-entity-planner
description: Plan Layer 6 cloud/VPS execution and remote control safely.
---

# Cloud Entity Planner

Use this skill to plan cloud execution after the local workflow is stable.

## Do Not Deploy Prematurely

Layer 6 requires stable Layers 2-5. If the project does not have a stable environment, skills, and manual routine success, recommend waiting.

## Plan

1. Why does this need to run away from the laptop?
2. What exact workflow will run?
3. What secrets are needed?
4. What repository or folder is deployed?
5. What user account runs it?
6. How is it stopped?
7. Where are logs?
8. How does the human communicate with it?
9. What actions are forbidden remotely?
10. What is the recovery plan?

## Output

Write `data/cloud-plan.md` with:

- VPS/cloud target.
- Deployment steps.
- Secrets policy.
- Remote command contract.
- Health checks.
- Stop procedure.
- Monitoring.
