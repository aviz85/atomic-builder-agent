---
name: routine-planner
description: Plan Layer 5 scheduled routines safely without premature autonomy.
---

# Routine Planner

Use this skill for Layer 5 planning.

Never schedule a routine until the workflow has succeeded manually at least twice.

## Questions

1. What should run automatically?
2. How often?
3. What input does it need?
4. What output should it create?
5. Who reviews it?
6. What actions are forbidden?
7. What happens if it fails?
8. How do we prevent duplicate runs?

## Required Safety

- Dry run mode.
- Lock strategy.
- Logs.
- Human approval gates.
- Failure behavior.

## Output

Write `data/routine-plan.md` with:

- Routine name.
- Schedule.
- Command.
- Lock strategy.
- Log path.
- Approval gates.
- Rollback/failure behavior.
