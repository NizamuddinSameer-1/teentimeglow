---
name: gsd
description: "Get Shit Done (GSD) spec-driven development and context-engineering workflow for Antigravity. Use when planning, building, refactoring, or autonomously executing software projects with atomic task phases, anti-hallucination protocols, living memory (.planning/), and verification loops."
---

# Get Shit Done (GSD) for Antigravity

GSD is a spec-driven development and context-engineering system designed to eliminate context rot, model hallucinations, and quality drops across long coding sessions in Google Antigravity.

## When to Use This Skill

Activate this skill whenever:
- The user asks to use **GSD**, **Get Shit Done**, or run any `/gsd-*` workflow.
- Planning, scaffolding, or executing a new software project or major feature.
- Executing multi-phase roadmaps with atomic git commits and strict verification.
- Requiring autonomous execution mode (`/gsd-super`) or anti-hallucination technical research (`/gsd-no-halluc`).

---

## Architecture & Directory Structure

All planning state and living project memory are maintained in `.planning/` at the project root:

```text
.planning/
├── PROJECT.md          # Project vision, goals, and technical scope
├── REQUIREMENTS.md     # Scoped v1/v2 feature requirements
├── ROADMAP.md          # Phase-by-phase execution plan
├── STATE.md            # Living state, current phase, and recent activities
├── config.json         # Workflow depth and settings
├── memory/
│   └── PROJECT-MEMORY.md # Long-term architectural decisions
├── research/           # Tech stack research and feasibility studies
└── phases/
    └── 01-phase-name/
        ├── 01-CONTEXT.md       # Technical decisions for Phase 1
        ├── 01-RESEARCH.md      # Phase research & gotchas
        ├── 01-01-PLAN.md       # Atomic task execution plan
        ├── 01-01-SUMMARY.md    # Post-execution summary
        └── 01-VERIFICATION.md  # Acceptance & test results
```

---

## Core Commands & Workflows

### 1. Autonomous & Resilience Modes
- **`/gsd-super [prompt]`**: Full autonomy. The agent gathers scope, establishes specs, branches safely (`gsd-super/feature`), executes phases sequentially, tests in the browser/CLI, debugs failures, and ships.
- **`/gsd-no-halluc [question]`**: Technical Q&A with mandatory external verification, source grounding, and confidence scores (HIGH/MEDIUM/LOW).
- **`/gsd-commit-memory [note]`**: Distill critical context and decisions into `.planning/memory/PROJECT-MEMORY.md` so future agent sessions never drift.

### 2. Standard Phased Workflow
1. **`/gsd-new-project`**: Interactive questioning → research → requirements → roadmap → `.planning/PROJECT.md`.
2. **`/gsd-discuss [phase]`**: Pin down UI, UX, database, and API preferences before writing plans.
3. **`/gsd-plan [phase]`**: Generate fine-grained, verifiable task plans (`0X-0Y-PLAN.md`).
4. **`/gsd-execute [phase]`**: Execute each atomic plan, verify outputs, and make conventional commits.
5. **`/gsd-verify [phase]`**: Run the test suite and verify with user acceptance gates.

### 3. Utilities & Ad-Hoc
- **`/gsd-quick [description]`**: Complete a small, urgent task while still enforcing syntax, test, and commit discipline.
- **`/gsd-progress`**: Summarize progress, completed milestones, blockers, and next steps.
- **`/gsd-help`**: Show the complete command reference.

---

## Terminal CLI Tools

You can also use the native `gsd` CLI directly from the terminal:
```bash
gsd status     # Display project phase, health, and config
gsd validate   # Verify .planning directory integrity
gsd init       # Initialize .planning directory
gsd version    # Display installed GSD version
```

---

## Verification & Anti-Hallucination Standards

For every atomic task in GSD:
1. **Re-read Modified Files**: Never assume a file edit succeeded without reading it back.
2. **Execute Tests & Linters**: Run test commands and inspect the output text.
3. **No Auto-Pass**: If a test or build fails, enter the diagnostic loop immediately.
4. **Reference Guide**: Consult [anti-hallucination.md](./references/anti-hallucination.md) for detailed rules.
