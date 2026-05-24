# Atomic Builder Agent

Public Codex/OpenClaw package for building Atomic Business systems layer by layer.

## Codex CLI install

```bash
codex plugin marketplace add aviz85/atomic-builder-agent --ref main
codex plugin add atomic-builder-agent@atomic-builder
```

Verify:

```bash
codex plugin list --marketplace atomic-builder
```

Update later:

```bash
codex plugin marketplace upgrade atomic-builder
```

## Codex Desktop install

Use the same marketplace repository:

```text
aviz85/atomic-builder-agent
```

If Desktop exposes plugin marketplace management through the UI, add this repository as a Git marketplace, then install `atomic-builder-agent` from the `Atomic Builder` marketplace.

If Desktop uses the CLI-backed plugin system on the same machine, run the CLI install commands above and restart Codex Desktop.

## OpenClaw adoption

Use the package under:

```text
plugins/atomic-builder-agent
```

Prompt file:

```text
plugins/atomic-builder-agent/OPENCLAW_ADOPTION_PROMPT.md
```

## Mock lab

```bash
cd plugins/atomic-builder-agent
node mocks/integration-advisor.mjs
```

Expected:

```text
Integration advisor scenarios: 5
Passed: 5
Failed: 0
```
