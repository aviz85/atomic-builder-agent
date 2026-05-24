---
name: evidence-based-scoring
description: Score each layer by evidence, not confidence or presentation quality.
---

# Evidence Based Scoring

Use this skill whenever Atomic Builder evaluates progress, decides whether to climb a layer, or reviews a student's artifacts.

The goal is to prevent the agent from producing convincing documents that are not yet operational.

## Scoring Scale

Use 0-3 only:

- 0: missing
- 1: described but not tested
- 2: tested once with a controlled example
- 3: repeated with real or realistic examples and clear failure handling

## Evidence Types

Prefer stronger evidence:

- real business example
- sanitized real example
- realistic simulation
- artifact review by the owner
- dry-run result
- smoke-test result
- repeated manual success

Weak evidence:

- generic strategy text
- tool list without user story
- skill created without repeated workflow
- routine planned before manual success
- demo that cannot be used in the student's business

## Layer-Specific Gates

### Layer 0

Minimum evidence:

- clear business energy statement
- unique judgment/value identified
- non-delegable decisions listed
- first project chosen because it removes real friction

Do not pass if the answer is generic ambition.

### Layer 1

Minimum evidence:

- student can open the agent runtime
- student understands what the agent may and may not do
- approval boundary is clear

Do not pass if the student treats the agent as magic automation.

### Layer 2

Minimum evidence:

- project folder exists
- `AGENTS.md` or equivalent exists
- key knowledge gaps are listed
- project state files are named
- one user story has enough context to run manually

Do not pass if the environment is only a prompt.

### Layer 3

Minimum evidence:

- integration is tied to a user story
- tool preference is justified
- authentication and risk are known
- minimal smoke test is defined
- external actions are blocked behind approval

Do not pass if the tool is selected because it is impressive.

### Layer 4

Minimum evidence:

- skill is based on a repeated or clearly recurring workflow
- skill lives inside the student's project
- inputs, workflow, outputs, safety rules, and failure modes are explicit
- one example exists

Do not pass if the skill is a generic business template.

### Layer 5

Minimum evidence:

- manual workflow succeeded at least twice
- trigger condition is explicit
- dry run exists
- log/output location is defined
- failure path is defined

Do not pass if the routine replaces supervision too early.

### Layer 6

Minimum evidence:

- local routine is stable
- remote environment need is justified
- deployment, monitoring, rollback, and credentials policy are defined
- external communication is approval-gated

Do not pass if the VPS is used to look advanced.

### Layer 7

Minimum evidence:

- multiple layers interact coherently
- the owner manages decisions instead of babysitting tasks
- bottleneck reduction is visible
- feedback loops improve the system

Do not pass if the business has many disconnected agents.

## Output Format

Write or update `data/quality-gates.md`:

```markdown
# Quality Gates

## Current Layer

Layer:
Decision: climb | hold

## Evidence Table

| Layer | Score | Evidence | Missing Evidence | Decision |
|---:|---:|---|---|---|

## Blocking Concern

...

## Next Evidence To Collect

1. ...
2. ...
3. ...
```

## Operating Rule

When in doubt, hold the layer and ask for better evidence.
