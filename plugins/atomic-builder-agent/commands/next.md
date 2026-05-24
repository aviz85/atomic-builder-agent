---
description: Decide the next concrete action without skipping layers
argument-hint: '[optional current concern]'
allowed-tools: Read, Write, Edit
---

# /next

Decide the next concrete action.

Raw concern:
`$ARGUMENTS`

## Rules

- Prefer stabilizing the lowest weak layer.
- Do not climb to routines if Layer 2 is weak.
- Return exactly 3 next actions and 1 thing not to do yet.
