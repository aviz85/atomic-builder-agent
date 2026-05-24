---
name: layer-status-review
description: Score progress across all 7 layers and identify the blocking layer.
---

# Layer Status Review

Use this skill at the end of every session.

## Scoring

0 = not started
1 = rough idea
2 = partially built
3 = usable with supervision
4 = reliable
5 = ready for routines/delegation

## Layers

0. Human nucleus.
1. Agent nucleus.
2. Environment.
3. Tools.
4. Skills.
5. Routines.
6. Cloud entity.
7. Atomic business.

## Output

Update `data/layer-status.json`.

Return:

- Current strongest layer.
- Weakest blocking layer.
- Next 3 actions.
- What not to do yet.
- Open loops.
