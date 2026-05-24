---
name: integration-discovery
description: Decide which Layer 3 tools and integrations are needed for real user stories.
---

# Integration Discovery

Use this skill to decide which external tools the project needs.

Do not connect tools because they are cool. Connect tools only when a user story requires them.

## Process

For each user story:

1. What external system contains required data?
2. What external system must receive the output?
3. Is there a local CLI?
4. Is there an official API?
5. Is there MCP support?
6. Is browser automation acceptable?
7. What authentication is required?
8. What is the minimal smoke test?

## Preference Order

1. Existing local CLI.
2. Official API.
3. MCP connector.
4. Browser automation.
5. Manual copy/paste.

Risk can override this order.

For sensitive systems such as WhatsApp, Gmail sending, calendar creation, payments, publishing, or any client-facing action, prefer a read-only or manual path first even if a stronger integration exists.

Live integrations are only recommended after:

- the user story is clear
- Layer 2 has enough context
- the approval boundary is explicit
- the minimal smoke test is safe
- external consequences are blocked by default

## Output

Write or update `data/integration-map.md`.
