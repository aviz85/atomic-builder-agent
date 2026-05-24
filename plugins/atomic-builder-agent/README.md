# Atomic Builder Agent

A modular Codex-based companion for helping students build an Atomic Business layer by layer.

This agent is intentionally written in English, even when Aviz refines the concept in Hebrew. Translate Hebrew refinements into precise English instructions before editing these files.

## Purpose

Atomic Builder helps a student turn a real business project into an agentic application:

- Layer 0: clarify the human nucleus.
- Layer 1: operate Codex/agent runtime correctly.
- Layer 2: build a project environment and knowledge base.
- Layer 3: plan and connect tools/integrations.
- Layer 4: distill repeatable workflows into skills.
- Layer 5: plan safe routines.
- Layer 6: plan cloud/remote execution.
- Layer 7: design an atomic operating system for the business.

## Start

Open this folder in Codex and run:

```text
/start
```

Recommended workshop sequence:

```text
/start
/build-layer-2
/plan-integrations
/create-skill
/score
/next
```

## Public Codex Plugin

The public installable marketplace is:

```text
https://github.com/aviz85/atomic-builder-agent
```

CLI:

```bash
codex plugin marketplace add aviz85/atomic-builder-agent --ref main
codex plugin add atomic-builder-agent@atomic-builder
```

See `CODEX_PLUGIN_INSTALL.md` for Desktop notes and repository shape.

## Mock Integration Lab

Before connecting real tools, run the mock Layer 3 lab:

```bash
node atomic-builder-agent/mocks/integration-advisor.mjs
```

The lab checks whether Atomic Builder recommends conservative integrations for different scenarios and blocks unsafe jumps to live WhatsApp, publishing, scheduling, voice execution, or VPS routines.

## Design Rule

This is not one giant prompt. It is a small orchestrator plus strong skills, explicit data files, and clear commands.

When in doubt:

```text
Do not climb higher. Stabilize the layer below.
```

## Skill Boundary

The bundled skills are training and coaching skills for Atomic Builder. They are not the student's business skills.

Students should build their own skills inside their own project folders, from their own use cases. Atomic Builder's role is to teach and guide that process.
