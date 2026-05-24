# Integration Advisor Mock Report

Scenarios: 5
Passed: 5
Failed: 0

This report tests whether Atomic Builder recommends the right Layer 3 connections without using real accounts.
The mock is intentionally conservative: read-only and draft-first options should win until Layer 2 is stable and manual success exists.

## Client follow-up control room

Status: PASS
Scenario ID: client-follow-up-control-room

Recommended:
- gmail-cli (local-cli) — smoke test: Search for one known thread by subject and create no draft.
- google-drive-cli (local-cli) — smoke test: List one approved project folder and read no document body.
- gmail-api (official-api) — smoke test: Read metadata for one approved thread without body extraction first.
- whatsapp-manual-export (manual) — smoke test: Parse a sanitized exported chat sample and extract last message only.

Blocked:
- vps-cron — Blocked: VPS Cron Worker can create external consequences. Use draft-first planning and explicit approval before external_action, unsupervised_sending.
- whatsapp-baileys — Blocked: WhatsApp Baileys Bridge can create external consequences. Use draft-first planning and explicit approval before send_message, send_audio, send_media.

Reasoning:
- Layer 2 is not stable enough for autonomous or high-risk integrations.
- manual success is required before routines, sending, or remote execution.
- Use a draft-first workflow for: draft_message.
- Every externally visible action needs explicit human approval.
- Start WhatsApp with read-only manual export before connecting a live bridge.

## Atomic growth engine

Status: PASS
Scenario ID: advanced-marketing-engine

Recommended:
- gmail-cli (local-cli) — smoke test: Search for one known thread by subject and create no draft.
- google-drive-cli (local-cli) — smoke test: List one approved project folder and read no document body.
- browser-harness (browser-automation) — smoke test: Open a public documentation page and extract one heading.

Blocked:
- vps-cron — Blocked: VPS Cron Worker can create external consequences. Use draft-first planning and explicit approval before external_action, unsupervised_sending.
- gmail-api — Blocked: Gmail Official API is too strong for the current draft-first phase. Prefer Gmail CLI until account access and approval gates are proven.

Reasoning:
- manual success is required before routines, sending, or remote execution.
- Use a draft-first workflow for: create_draft, publish_content.
- Every externally visible action needs explicit human approval.
- publishing must stay blocked until the owner approves the exact channel, copy, and timing.

## Voice interface demo

Status: PASS
Scenario ID: voice-command-demo

Recommended:
- voice-quick-voice (mcp-connector) — smoke test: Capture a voice command and convert it into an unsent action draft.
- browser-harness (browser-automation) — smoke test: Open a public documentation page and extract one heading.

Blocked:
- vps-cron — Blocked: VPS Cron Worker can create external consequences. Use draft-first planning and explicit approval before external_action, unsupervised_sending.

Reasoning:
- Use a draft-first workflow for: external_action.
- Every externally visible action needs explicit human approval.
- Voice is an interface, not authority to execute. Convert speech into an unsent action draft.

## Premature routine request

Status: PASS
Scenario ID: routine-too-early

Recommended:
- whatsapp-manual-export (manual) — smoke test: Parse a sanitized exported chat sample and extract last message only.

Blocked:
- vps-cron — Blocked: VPS Cron Worker can create external consequences. Use draft-first planning and explicit approval before external_action, unsupervised_sending.
- whatsapp-baileys — Blocked: WhatsApp Baileys Bridge can create external consequences. Use draft-first planning and explicit approval before send_message, send_audio, send_media.

Reasoning:
- Layer 2 is not stable enough for autonomous or high-risk integrations.
- manual success is required before routines, sending, or remote execution.
- Use a draft-first workflow for: send_message, scheduled_run.
- Every externally visible action needs explicit human approval.
- Start WhatsApp with read-only manual export before connecting a live bridge.

## Calendar prep meeting

Status: PASS
Scenario ID: calendar-prep-meeting

Recommended:
- gmail-cli (local-cli) — smoke test: Search for one known thread by subject and create no draft.
- google-calendar-cli (local-cli) — smoke test: Read availability for a manually approved date range.
- gmail-api (official-api) — smoke test: Read metadata for one approved thread without body extraction first.

Blocked:
- vps-cron — Blocked: VPS Cron Worker can create external consequences. Use draft-first planning and explicit approval before external_action, unsupervised_sending.

Reasoning:
- manual success is required before routines, sending, or remote execution.
- Use a draft-first workflow for: draft_message, create_event.
- Every externally visible action needs explicit human approval.
- Calendar availability can be read, but create_event stays approval-gated.
