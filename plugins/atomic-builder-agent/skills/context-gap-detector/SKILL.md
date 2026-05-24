---
name: context-gap-detector
description: Diagnose why an agent failed and identify the missing layer.
---

# Context Gap Detector

Use this skill whenever the agent produces weak, generic, wrong, or unsafe output.

## Classify The Failure

Choose the primary cause:

- Missing knowledge.
- Missing instruction.
- Missing tool.
- Missing judgment.
- Missing environment.
- Premature automation.

## Questions

1. What did the agent need to know?
2. Was that information available in the project?
3. Did `AGENTS.md` point to it?
4. Was a reusable skill missing?
5. Was an external tool required?
6. Should a human approval gate have stopped this?

## Output

Return:

- Failure class.
- Blocking layer.
- Fix now.
- Permanent improvement.
