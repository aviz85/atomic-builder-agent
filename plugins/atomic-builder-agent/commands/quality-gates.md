---
description: Evaluate whether the student can safely climb to the next layer
argument-hint: '[optional layer or artifact focus]'
allowed-tools: Read, Write, Edit, Glob, Grep
---

# /quality-gates

Check whether the current layer has enough evidence to climb.

Raw focus:
`$ARGUMENTS`

## Use Skills

1. `layer-status-review`
2. `evidence-based-scoring`
3. `approval-gate-designer`

## Output

- `data/quality-gates.md`
- updated `data/layer-status.json`
- explicit climb / hold decision

## Rule

If the evidence is weak, hold the layer. Do not reward pretty documents without operational proof.
