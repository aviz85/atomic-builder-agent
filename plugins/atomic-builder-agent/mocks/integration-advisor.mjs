import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogPath = path.join(__dirname, "tool-catalog.json");
const scenariosPath = path.join(__dirname, "integration-scenarios.json");
const reportPath = path.join(__dirname, "integration-mock-report.md");

const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const scenarios = JSON.parse(fs.readFileSync(scenariosPath, "utf8"));

const preferenceRank = new Map(catalog.preferenceOrder.map((kind, index) => [kind, index]));

function chooseTools(scenario) {
  const tools = catalog.tools
    .filter((tool) => scenario.requiredSystems.includes(tool.system) || tool.system === "routine")
    .sort((a, b) => {
      const rank = preferenceRank.get(a.kind) - preferenceRank.get(b.kind);
      if (rank !== 0) return rank;
      return riskRank(a.risk) - riskRank(b.risk);
    });

  const selected = [];
  const blocked = [];
  const reasons = [];

  if (scenario.maturity.layer2 !== "stable") {
    reasons.push("Layer 2 is not stable enough for autonomous or high-risk integrations.");
  }

  if (scenario.maturity.manualSuccessCount < 2) {
    reasons.push("manual success is required before routines, sending, or remote execution.");
  }

  for (const tool of tools) {
    const supportsNeeded = tool.capabilities.some((capability) =>
      scenario.requiredCapabilities.includes(capability)
    );
    const requestedDangerousCapability = tool.capabilities.some((capability) =>
      scenario.requiredCapabilities.includes(capability) &&
      ["send_message", "send_audio", "send_media", "create_event", "scheduled_run"].includes(capability)
    );
    const isRoutine = tool.system === "routine";
    const isCriticalMessaging = tool.system === "whatsapp" && tool.risk === "critical";

    const isRiskyAlternativeForRequiredSystem =
      isCriticalMessaging && scenario.requiredSystems.includes("whatsapp");

    if (
      tool.id === "whatsapp-manual-export" &&
      scenario.requiredSystems.includes("whatsapp") &&
      !selected.some((selectedTool) => selectedTool.id === tool.id)
    ) {
      selected.push({
        id: tool.id,
        name: tool.name,
        kind: tool.kind,
        smokeTest: tool.smokeTest,
        approval: tool.requiresApproval
      });
      continue;
    }

    if (!supportsNeeded && !isRoutine && !isRiskyAlternativeForRequiredSystem) continue;

    if (
      tool.id === "gmail-api" &&
      scenario.requiredSystems.includes("gmail") &&
      scenario.externalActions.some((action) => ["create_draft", "send_message", "publish_content"].includes(action))
    ) {
      blocked.push({
        id: tool.id,
        reason: `Blocked: ${tool.name} is too strong for the current draft-first phase. Prefer Gmail CLI until account access and approval gates are proven.`
      });
      continue;
    }

    if (isRoutine || isCriticalMessaging || requestedDangerousCapability) {
      const shouldBlock =
        isRoutine ||
        isCriticalMessaging ||
        scenario.maturity.layer2 !== "stable" ||
        scenario.maturity.manualSuccessCount < 2 ||
        scenario.externalActions.some((action) =>
          ["send_message", "scheduled_run", "external_action", "publish_content", "create_event"].includes(action)
        );

      if (shouldBlock) {
        blocked.push({
          id: tool.id,
          reason: `Blocked: ${tool.name} can create external consequences. Use draft-first planning and explicit approval before ${tool.neverWithoutApproval.join(", ")}.`
        });
        continue;
      }
    }

    selected.push({
      id: tool.id,
      name: tool.name,
      kind: tool.kind,
      smokeTest: tool.smokeTest,
      approval: tool.requiresApproval
    });
  }

  if (scenario.externalActions.length > 0) {
    reasons.push(`Use a draft-first workflow for: ${scenario.externalActions.join(", ")}.`);
    reasons.push("Every externally visible action needs explicit human approval.");
  }

  if (scenario.externalActions.includes("publish_content")) {
    reasons.push("publishing must stay blocked until the owner approves the exact channel, copy, and timing.");
  }

  if (scenario.externalActions.includes("create_event")) {
    reasons.push("Calendar availability can be read, but create_event stays approval-gated.");
  }

  if (selected.some((tool) => tool.id === "voice-quick-voice")) {
    reasons.push("Voice is an interface, not authority to execute. Convert speech into an unsent action draft.");
  }

  if (selected.some((tool) => tool.id === "whatsapp-manual-export")) {
    reasons.push("Start WhatsApp with read-only manual export before connecting a live bridge.");
  }

  return { selected, blocked, reasons };
}

function riskRank(risk) {
  return { low: 0, medium: 1, high: 2, critical: 3 }[risk] ?? 9;
}

function evaluate(scenario, result) {
  const selectedIds = result.selected.map((tool) => tool.id);
  const blockedIds = result.blocked.map((tool) => tool.id);
  const reasonText = result.reasons.join(" ") + " " + result.blocked.map((tool) => tool.reason).join(" ");

  const missingRecommendations = scenario.expected.recommend.filter((id) => !selectedIds.includes(id));
  const missingBlocks = scenario.expected.block.filter((id) => !blockedIds.includes(id));
  const missingReasonHints = scenario.expected.reasonContains.filter((hint) => !reasonText.includes(hint));

  return {
    pass:
      missingRecommendations.length === 0 &&
      missingBlocks.length === 0 &&
      missingReasonHints.length === 0,
    missingRecommendations,
    missingBlocks,
    missingReasonHints
  };
}

function renderReport(rows) {
  const passed = rows.filter((row) => row.evaluation.pass).length;
  const lines = [
    "# Integration Advisor Mock Report",
    "",
    `Scenarios: ${rows.length}`,
    `Passed: ${passed}`,
    `Failed: ${rows.length - passed}`,
    "",
    "This report tests whether Atomic Builder recommends the right Layer 3 connections without using real accounts.",
    "The mock is intentionally conservative: read-only and draft-first options should win until Layer 2 is stable and manual success exists.",
    ""
  ];

  for (const row of rows) {
    lines.push(`## ${row.scenario.title}`);
    lines.push("");
    lines.push(`Status: ${row.evaluation.pass ? "PASS" : "FAIL"}`);
    lines.push(`Scenario ID: ${row.scenario.id}`);
    lines.push("");
    lines.push("Recommended:");
    for (const tool of row.result.selected) {
      lines.push(`- ${tool.id} (${tool.kind}) — smoke test: ${tool.smokeTest}`);
    }
    if (row.result.selected.length === 0) lines.push("- None");
    lines.push("");
    lines.push("Blocked:");
    for (const tool of row.result.blocked) {
      lines.push(`- ${tool.id} — ${tool.reason}`);
    }
    if (row.result.blocked.length === 0) lines.push("- None");
    lines.push("");
    lines.push("Reasoning:");
    for (const reason of row.result.reasons) {
      lines.push(`- ${reason}`);
    }
    lines.push("");
    if (!row.evaluation.pass) {
      lines.push("Missing expectations:");
      for (const id of row.evaluation.missingRecommendations) lines.push(`- recommendation: ${id}`);
      for (const id of row.evaluation.missingBlocks) lines.push(`- block: ${id}`);
      for (const hint of row.evaluation.missingReasonHints) lines.push(`- reason hint: ${hint}`);
      lines.push("");
    }
  }

  return lines.join("\n");
}

const rows = scenarios.map((scenario) => {
  const result = chooseTools(scenario);
  const evaluation = evaluate(scenario, result);
  return { scenario, result, evaluation };
});

fs.writeFileSync(reportPath, renderReport(rows));

const failed = rows.filter((row) => !row.evaluation.pass);
console.log(`Integration advisor scenarios: ${rows.length}`);
console.log(`Passed: ${rows.length - failed.length}`);
console.log(`Failed: ${failed.length}`);
console.log(`Report: ${reportPath}`);

if (failed.length > 0) {
  for (const row of failed) {
    console.log(`FAIL ${row.scenario.id}`);
  }
  process.exitCode = 1;
}
