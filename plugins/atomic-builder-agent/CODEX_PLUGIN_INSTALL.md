# Codex Plugin Install

Atomic Builder is published as a public Codex plugin marketplace:

```text
https://github.com/aviz85/atomic-builder-agent
```

The private `atomic-biz` repository stays private.

## CLI Install

```bash
codex plugin marketplace add aviz85/atomic-builder-agent --ref main
codex plugin add atomic-builder-agent@atomic-builder
```

Verify:

```bash
codex plugin list --marketplace atomic-builder
```

Update:

```bash
codex plugin marketplace upgrade atomic-builder
```

## Desktop Install

Use the same public repository as a Git marketplace:

```text
aviz85/atomic-builder-agent
```

If Codex Desktop exposes plugin marketplace management in the UI, add this repository as a marketplace and install `atomic-builder-agent`.

If Codex Desktop uses the local CLI-backed plugin system on the same machine, run the CLI commands above and restart Codex Desktop.

## Repository Shape

Codex plugin marketplaces expect this shape:

```text
.agents/plugins/marketplace.json
plugins/atomic-builder-agent/.codex-plugin/plugin.json
plugins/atomic-builder-agent/skills/...
```

The root-plugin shape below is not enough for `codex plugin add`:

```text
.codex-plugin/plugin.json
skills/...
```

That shape can be useful for OpenClaw or manual cloning, but Codex CLI discovers installable plugins through a marketplace.

## Same Repo Or Separate Repo?

One public repository is enough if it is shaped as a marketplace.

A separate repository is only needed if we want:

- one repo for the agent source package
- another repo for a curated marketplace containing multiple plugins
- separate versioning/release cadence

Current decision:

- keep `aviz85/atomic-biz` private
- use `aviz85/atomic-builder-agent` as the public Codex marketplace and OpenClaw adoption package

## Verified Command

This was verified with a clean temporary Codex home:

```bash
CODEX_HOME=/tmp/codex-home-atomic-public-test \
  codex plugin marketplace add aviz85/atomic-builder-agent --ref main

CODEX_HOME=/tmp/codex-home-atomic-public-test \
  codex plugin add atomic-builder-agent@atomic-builder
```

Expected status:

```text
atomic-builder-agent@atomic-builder  installed, enabled  0.1.0
```
