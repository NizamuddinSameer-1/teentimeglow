# GSD Anti-Hallucination & Verification Protocol

GSD for Antigravity enforces strict anti-hallucination protocols to prevent context drift and false assertions.

## Core Rules

1. **File-First Context**: Always read the target file or command output before asserting status or editing. Never assume file contents from previous memory.
2. **Confidence Levels**:
   - **HIGH**: Grounded in current filesystem files, successful test execution, or official documentation.
   - **MEDIUM**: Plausible pattern based on standard language/framework conventions, requiring verification.
   - **LOW**: Speculative or unverified claim. Must be flagged and verified before proceeding.
3. **Verification Gates**: Every code change must pass through the 5-Tier Verification Suite:
   - Syntax Check
   - Type Check (where applicable)
   - Linter Execution
   - Test Suite Run
   - Build Verification
4. **No Auto-Pass**: Never mark a test or feature as complete without inspecting real execution output or log files.
5. **Decision Attribution**: Explicitly distinguish user-mandated decisions from agent-suggested defaults.
6. **Atomic State & Commits**: After each phase or quick task, update `.planning/STATE.md` and create an atomic git commit.
