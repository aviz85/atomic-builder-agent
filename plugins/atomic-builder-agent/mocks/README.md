# Atomic Builder Mock Integration Lab

This folder tests whether Atomic Builder can recommend the right Layer 3 tools before real accounts are connected.

It is intentionally a mock:

- no Gmail connection
- no Drive connection
- no WhatsApp connection
- no Calendar connection
- no browser session
- no VPS deployment

## Files

- `tool-catalog.json` - mock catalog of possible tools and their risk boundaries.
- `integration-scenarios.json` - workshop-style scenarios to evaluate.
- `integration-advisor.mjs` - small rule engine that recommends, blocks, and explains.
- `integration-mock-report.md` - generated report.

## Run

```bash
node atomic-builder-agent/mocks/integration-advisor.mjs
```

## Design Contract

The mock follows the 7-layer method:

- recommend integrations only from user stories
- prefer CLI/API/MCP/browser/manual in that order, except when risk requires manual first
- block live messaging, publishing, event creation, and routines without explicit approval
- block routines until manual success exists
- treat voice as an interface, not permission to act
- keep student skills in the student's project, not inside Atomic Builder's package

## Future Real Adapter Shape

Replace mock catalog entries with real adapters that expose this minimal contract:

```js
{
  id: "gmail-cli",
  can(capability) {},
  dryRun(input) {},
  execute(input, approvalToken) {}
}
```

`dryRun` must be available before `execute`. `execute` must require an approval token for every externally visible action.
