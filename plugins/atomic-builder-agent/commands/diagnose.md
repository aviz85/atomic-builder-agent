---
description: Diagnose the current project using the Atomic Business 7-layer model
argument-hint: '[optional focus]'
allowed-tools: Read, Glob, Grep
---

# /diagnose

Diagnose the current project using the 7-layer model.

Raw focus:
`$ARGUMENTS`

## Read If Present

- `AGENTS.md`
- `data/student-profile.md`
- `data/project-spec.md`
- `data/knowledge-map.md`
- `data/user-stories.md`
- `data/integration-map.md`
- `data/layer-status.json`

## Output

- Layer score.
- Missing context.
- Missing tools.
- Missing skills.
- Human approval risks.
- Blocking layer.
- Next action.
