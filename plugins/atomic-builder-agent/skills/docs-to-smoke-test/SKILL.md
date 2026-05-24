---
name: docs-to-smoke-test
description: Turn official integration documentation into a minimal safe smoke test.
---

# Docs To Smoke Test

Use this skill when adding a new tool or integration.

## Rules

- Prefer official docs.
- Use current documentation when possible.
- Do not trust outdated blog posts for API syntax.
- Create the smallest possible smoke test.
- Never expose secrets in committed files.
- Store secrets in environment variables.
- If authentication is complex, write a checklist instead of guessing.

## Output

For each integration, produce:

- Docs link.
- Auth method.
- Required env vars.
- Minimal test command.
- Expected success response.
- Failure troubleshooting.
