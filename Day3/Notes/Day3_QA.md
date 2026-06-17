### Technical Mastery Interview: The Agent Skills Framework (100 Q\&A)

#### 1\. Foundational Concepts: Defining the Agent Skill (Beginner Level)

The architectural shift from monolithic system prompts to modular "procedural memory" through Agent Skills represents the professionalization of agentic systems. Traditionally, developers relied on "context dumping"—loading every possible instruction into a single system prompt. This practice inevitably leads to "context rot," where Large Language Models (LLMs) lose the ability to distinguish critical signals from instructional noise. Agent Skills address this by acting as a lightweight, portable primitive that allows a general-purpose agent to flex into a specialist role on demand. This transition is the "So What?" of modern development: it reduces friction by moving from "knowing what" (semantic memory) to "knowing how" (procedural memory), ensuring that specialized logic is loaded into the context window strictly when required.

#### Question 1

**What is the core definition of an Agent Skill?**  An Agent Skill is a modular primitive designed to equip a general-purpose agent with on-demand specialist competence. It is structured as a directory containing a mandatory  **SKILL.md**  file, which acts as the anchor for the skill’s metadata, instructions, and routing logic.

#### Question 2

**Why are Agent Skills considered "procedural memory" for LLMs?**  LLMs possess analogs for episodic memory (events) and semantic memory (facts) but have historically lacked a stable way to store step-by-step workflows. Agent Skills provide a procedural memory primitive that allows an agent to "remember" how to execute complex, repeatable tasks without those instructions being permanently hard-coded into its primary system prompt.

#### Question 3

**What are the four main friction points in AI development that Skills address?**

1. **Context rot:**  Performance degradation caused by over-long system prompts. 2\)  **Procedural gaps:**  The lack of a "know-how" primitive for workflows. 3\)  **Multi-agent overload:**  The operational complexity of maintaining dozens of sub-agents. 4\)  **Portability:**  The difficulty of moving agentic logic across different vendor landscapes (e.g., from Claude 4 to Gemini 2.5).

#### Question 4

**What is the mandatory file required for a directory to be recognized as an Agent Skill?**  The only mandatory file is  **SKILL.md** .

#### Question 5

**What is the purpose of the scripts/ directory within a skill folder?**  The  **scripts/**  directory holds executable code (Python, Bash, etc.) for deterministic work. This allows the LLM to manage high-level reasoning while offloading precise tasks—like data formatting or complex math—to software, ensuring reliability.

#### Question 6

**How does the references/ directory differ from the main instructions in SKILL.md?**  The  **references/**  directory contains supplementary context, such as domain principles, deep definitions, or edge case handling. These are loaded only when the skill is active, preventing the main  **SKILL.md**  from becoming bloated.

#### Question 7

**What should be stored in the assets/ directory?**  The  **assets/**  directory is used for static resources like output templates, configuration schemas, or JSON examples that the agent uses to structure its final results.

#### Question 8

**Describe the "file drop" installation pattern for coding agents.**  In local environments, skills are installed by dropping the skill directory into a specific path, often a shared  **.agents/skills/**  folder at the project root. The agent identifies the new directory and registers the skill upon its next reasoning cycle or restart.

#### Question 9

**What is "Progressive Disclosure" in the context of Agent Skills?**  It is a three-tiered context management strategy:

1. **Level 1 (Metadata):**  Only name and description are always in context for routing.  
2. **Level 2 (SKILL.md Body):**  Instructions load only when the skill is triggered.  
3. **Level 3 (Bundled Resources):**   **scripts/**  and  **references/**  load or execute strictly as needed.

#### Question 10

**How does an Agent Skill differ from the Model Context Protocol (MCP)?**  They are complementary. MCP provides the "reach" (connecting to external systems like Salesforce or BigQuery), whereas an Agent Skill provides the "know-how" (the specific procedural logic on how to use those tools to solve a problem).

#### Question 11

**How do Agent Skills interact with AGENTS.md?**   **AGENTS.md**  typically houses project-wide conventions and global context that remains permanently loaded. A well-architected system uses  **AGENTS.md**  as a lightweight router or catalog that points the agent toward the available library of specialist Skills.

#### Question 12

**What is "Path A" for building a skill?**  Path A involves translating existing institutional knowledge—such as a compliance runbook or HR guide—into the  **SKILL.md**  format. This allows non-technical subject matter experts (SMEs) to create skills without writing code.

#### Question 13

**What is "Path B" for building a skill?**  Path B is the "crystallization" of a successful agent run. When an agent successfully completes a repetitive task, a developer can prompt the agent to draft a  **SKILL.md**  based on its successful execution trace for future reuse.

#### Question 14

**What are the "Five Rules" for skill development found in Appendix A?**

1. One skill, one job. 2\) Descriptions are an interface. 3\) Skills are dependencies (version and test them). 4\) The right team owns the right skill. 5\) The agent runtime is interchangeable.

#### Question 15

**What is the recommended naming convention for skill directories?**  The directory name should use  **snake\_case**  (e.g., invoice\_processor).

#### Question 16

**What is the recommended naming convention for the skill name in metadata?**  The skill name in the YAML frontmatter should use  **kebab-case**  (e.g., pdf-processing).

#### Question 17

**Why is the gerund form preferred for naming?**  Using the gerund form (e.g.,  **managing-databases**  vs.  **database-manager** ) focuses the skill on the action and the procedural workflow rather than just the tool itself.

#### Question 18

**What does "One skill, one job" imply for architectural design?**  If a skill's description requires the conjunction "and" to join unrelated capabilities, it is a "skill smell" indicating the skill should be decomposed into two separate, specific modules.

#### Question 19

**According to the Quality Principles, why should you "give the reason, not just the rule"?**  LLMs generalize significantly better to edge cases when they understand the rationale behind an instruction. Capitalized imperatives like "ALWAYS" often fail in complex scenarios where a provided rationale would have allowed the model to reason through an exception.

#### Question 20

**What is the "verifiability" principle in skill drafting?**  Every instruction in a  **SKILL.md**  must be verifiable. If the agent cannot programmatically or logically determine whether it has followed a rule, the rule is too vague and will likely lead to execution failure.

#### Question 21

**How should you handle boilerplate instructions like "be polite" or "always validate output"?**  These should be cut. Every line in a skill must "earn its place" by providing specific domain logic. Modern models already possess baseline conversational norms; skills should focus on specialized "know-how."

#### Question 22

**Why is "running the task yourself first" a core quality principle?**  Actually performing the workflow manually allows the author to identify real failure points and nuances that are often missed when drafting instructions based on pure speculation.

#### Question 23

**What is the "one-line mental model" for Agent Skills?**  Skills are the specific runbook an experienced colleague hands you on day one, which the AI never forgets.

#### Question 24

**What is a "Skill Smell" related to the size of the SKILL.md?**  If the body of a  **SKILL.md**  exceeds 5,000 words, it is a "smell" suggesting that the content should be moved to  **references/**  or split into two separate skills to prevent context bloat.

#### Question 25

**What is the benefit of the UI Install pattern for enterprise workspaces?**  It democratizes skill management, allowing non-technical team members to manage skill folders via a visual registry. This facilitates team-wide adoption without requiring every user to touch a terminal.This foundational understanding of structure and anatomy sets the stage for the most critical aspect of skill performance: how the agent identifies and routes to the correct tool.

#### 2\. Strategic Routing and Implementation (Intermediate Level)

The description field of an Agent Skill is not merely documentation; it is the routing algorithm itself. In a production environment where hundreds of skills may be available, the LLM relies entirely on this L1 metadata to decide whether to load the full skill body. Vague descriptions are the primary cause of unused skills, leading to a "56% non-invocation rate" in production environments (Vercel, 2026). Effective implementation requires a strategy of "Progressive Disclosure," where trigger keywords are front-loaded to ensure the agent can make rapid, accurate routing decisions without overwhelming its initial context window.

#### Question 26

**Why is the description field considered a "routing algorithm"?**  The description is the only metadata the agent sees initially. It uses this text to perform a semantic match against the user's intent. If the description is vague, the agent will fail to trigger the skill, rendering the instructions in the body useless.

#### Question 27

**Explain the L1 level of Progressive Disclosure.**  Level 1 includes the name and description (metadata). This is "always-on" context, facilitating the routing of user queries to the correct skill without loading massive instruction sets prematurely.

#### Question 28

**Explain the L2 level of Progressive Disclosure.**  Level 2 is the  **SKILL.md**  body. This is loaded into the agent's context window only after the L1 metadata has triggered a match, saving token costs and reducing noise.

#### Question 29

**Explain the L3 level of Progressive Disclosure.**  Level 3 consists of bundled resources— **scripts/** ,  **references/** , and  **assets/** . These are loaded or called strictly as needed by the instructions in the L2 body.

#### Question 30

**What is the purpose of the**  **allowed-tools**  **field in the YAML frontmatter?**  It acts as a "Security Gate." Rather than just convenience, it defines hard permissions (e.g., Read, Bash, Write) that the skill is authorized to use. This prevents a skill from executing unauthorized tool calls even if it "wants" to.

#### Question 31

**What is the recommended length and format for a skill description?**  The description should be a one-verb-led sentence, approximately 50 words, with a hard limit of 1024 characters in the YAML frontmatter.

#### Question 32

**Explain the concept of "front-loading trigger keywords" in a description.**  You should start descriptions with specific, high-intent verbs (e.g., "Generates invoice summaries...") rather than filler phrases like "This skill is used for..." to provide immediate activation cues to the model.

#### Question 33

**How can you prevent a skill from "over-triggering"?**  By including an explicit "Do NOT use for..." section in the description to define negative boundaries and out-of-scope scenarios.

#### Question 34

**What does it mean to be "pushy" in a description?**  If a model is under-triggering, the author should make the description more assertive, using imperatives like "MUST be used whenever the user asks for X" to force activation.

#### Question 35

**Critique this description: "A helpful skill for documents."**  This is a "skill smell." It is too vague. It lacks a specific verb, doesn't define the types of documents (PDF? Excel?), and provides no negative boundaries. An optimized version: "Parses PDF invoices to extract line items. Do NOT use for Word docs or generic text files."

#### Question 36

**Critique this description: "Uses internal Z-100 logic to process incoming TX-Files."**  This fails due to "Internal Jargon." The LLM may not understand what "Z-100" or "TX-Files" means, leading to routing failures. It should use industry-standard terms: "Uses accounting logic to process transaction logs."

#### Question 37

**Critique this description: "Helps the user with their daily tasks and scheduling."**  This fails the "One skill, one job" rule. It uses "and" to join two unrelated domains (tasks vs. scheduling), which should be split into two separate skills to ensure cleaner routing.

#### Question 38

**What is "rephrasing stability"?**  It is a routing requirement where a skill must fire consistently regardless of how the user phrases their intent. It is tested by providing multiple semantic variations of the same request.

#### Question 39

**What is the L1 token cost for a typical skill library?**  In the Logistics Case Study, a library of 100 skills cost approximately 5,000 always-loaded tokens (100 skills × \~50 tokens of metadata each).

#### Question 40

**How does Path B utilize "meta-skills" for authoring?**  An agent reviews a successful execution trace and proposes a  **SKILL.md**  draft. The human then shifts from "author" to "reviewer," refining the agent's proposed description and instructions.

#### Question 41

**What is the role of trigger phrases in the SKILL.md body?**  While the description routes the skill, the "When to use" section in the body grounds the model’s understanding with concrete scenarios once the skill is active.

#### Question 42

**How do you test if a skill stays "quiet"?**  By providing a query that is related to the domain but explicitly outside the skill's defined scope, then confirming in the agent's trace that the skill was not loaded.

#### Question 43

**What is the "Programmatic Route" for installing skills?**  In frameworks like the Google Agent Development Kit (ADK), you point code to a folder path, and the framework auto-generates the load\_skill tools for the model.

#### Question 44

**What is a "Capability Profile" in systems architecture?**  It is a swappable persona that defines active skills and tool access for a specific execution state, allowing for rapid switching without context loss.

#### Question 45

**Why is "Capability Profile" switching superior to keeping all instructions in context?**  It involves a strict "teardown and rebuild" process that flushes stale variables and unloads previous instructions, preventing "context rot" from accumulating.

#### Question 46

**What is "Testable Specificity" in a description?**  It requires the author to be able to define at least 3 positive and 3 negative trigger examples for the skill to ensure the description is narrow enough.

#### Question 47

**Describe a "Positive Trigger" test case.**  A query that clearly aligns with the skill’s core purpose and should cause the agent to load the  **SKILL.md** .

#### Question 48

**Describe a "Negative Trigger" test case.**  A query that uses similar keywords but falls under the "Do NOT use for" section, testing if the model can successfully ignore the skill.

#### Question 49

**Why is "Execution Fidelity" important for routing?**  The description must accurately reflect what the skill  *currently*  does. If it describes aspirational behavior the skill hasn't implemented, it will trigger but ultimately fail to perform.

#### Question 50

**How does a community manager like "skillport" help with implementation?**  It automatically symlinks a central skills library to the various hidden directories required by different CLI tools and IDEs, ensuring consistent access across tools.

#### Question 51

**Why should descriptions avoid vendor-specific prefixes like "gemini-**  ***" or "claude-***  **"?**  Agent Skills are designed for portability. Using vendor prefixes ties the skill to a specific model family, breaking the "interchangeable runtime" rule.

#### Question 52

**What is the "Skill Smell" related to domain ownership?**  If two different business units (e.g., HR and Legal) could plausibly own a single skill, the skill hasn't been decomposed enough and should be split.

#### Question 53

**What does "front-loading" keywords do for token economics?**  It allows the model to identify a match in the first few tokens of a description, potentially allowing the router to short-circuit the evaluation of remaining skills.

#### Question 54

**How do "trigger keywords" impact the reliability of the agent?**  Precise keywords reduce the likelihood of "False Positives" where the agent loads an irrelevant skill that then pollutes the reasoning space with incorrect instructions.

#### Question 55

**What is the primary danger of an unreviewed agent-drafted skill?**  An unreviewed skill may contain an inaccurate description that leads to "Execution Failure" or, worse, unintended tool calls in a production system.Proper routing ensures a skill is loaded, but its ultimate value is determined by its performance once active. This requires a rigorous, data-driven evaluation framework.

#### 3\. The Evaluation Framework and Performance Optimization (Advanced Level)

The most dangerous pitfall in agent development is the "Compound Evaluation Trap." Testing a skill in isolation often yields false positives; a skill that achieves 90% accuracy alone may see that performance plummet to 44.2% when co-loaded with 15 other skills (Figure 4, 2026). This degradation is driven by "context rot"—the accumulation of noise that distracts the model. To combat this, elite developers use Evaluation-Driven Development (EDD) and measure performance through specific trajectory scoring modes that account for every tool call, not just text output.

#### Question 56

**What is the "Compound Evaluation Trap"?**  It is the false belief that a skill's success in isolation predicts its success in production. In reality, co-loaded skills compete for attention, leading to significant performance drops.

#### Question 57

**Define "Evaluation-Driven Development" (EDD).**  EDD involves writing three JSON evaluation cases (Input, Expected Tools, Expected Output)  *before*  drafting the  **SKILL.md**  to force a clear functional specification.

#### Question 58

**What are the four primary modes of skill failure?**

1. **Trigger Failure:**  Wrong skill or no skill fires. 2\)  **Execution Failure:**  Incorrect output or tools. 3\)  **Token Budget Failure:**  Context rot from a massive body. 4\)  **Regression:**  A new skill breaks existing routing.

#### Question 59

**What was Vercel's finding regarding the non-invocation rate of skills?**  Production analysis revealed a 56% non-invocation rate for skills that were expected to activate consistently.

#### Question 60

**According to SkillsBench (2025), what percentage of skills performed worse than having no skill?**  The benchmark found that 19% of skills actively degraded agent capability.

#### Question 61

**Explain "EXACT" trajectory scoring.**  The agent must call the exact tools in the exact order specified in the evaluation case. This is mandatory for high-stakes "action-allowed" skills.

#### Question 62

**Explain "IN\_ORDER" trajectory scoring.**  The agent must call the expected tools in the correct relative sequence, but it is permitted to include additional, non-harmful tool calls in between.

#### Question 63

**Explain "ANY\_ORDER" trajectory scoring.**  The agent must call all the expected tools, but the sequence does not matter. This is typically used for "read-only" skills.

#### Question 64

**What is the "U-curve" in the "Lost in the Middle" phenomenon (Liu et al., 2024)?**  It describes how LLM performance is highest when relevant info is at the start or end of the context, and lowest when it is in the middle, forming a U-shaped accuracy graph.

#### Question 65

**What did Chroma Research (2025) find regarding "Context Rot"?**  They found that performance degrades as input grows across all 18 frontier models tested, even when task difficulty is constant, due to the density of "noise" in the context.

#### Question 66

**Distinguish between context "size" and context "density."**  "Size" is the raw token count; "Density" is the amount of relevant signal vs. irrelevant noise. A large context window doesn't prevent failure if the "density" of noise (context rot) is too high.

#### Question 67

**What is the "pass^k" metric?**  It measures consistency by running an evaluation  $k$  times and requiring success on  *every*  run. GPT-4o, for example, dropped from 61% (pass^1) to 25% (pass^8) on Tau-bench.

#### Question 68

**What is "Simulation Bias"?**  Also known as the "Lost in Simulation" finding, it refers to an optimistic bias of up to 9% in simulation-based evaluations compared to real-world performance.

#### Question 69

**How much does production performance typically drop compared to offline benchmarks?**  ReliabilityBench shows a typical drop of 20% to 30%.

#### Question 70

**What is a "Golden Dataset"?**  A curated, versioned set of input/output pairs stored within the skill directory used to verify both trigger accuracy and execution quality.

#### Question 71

**Describe the "LLM-as-Judge" testing pattern.**  A peer model evaluates the agent's output against a rubric. To neutralize ordering bias, the outputs should be swapped and run twice.

#### Question 72

**What is "Shadow Mode" deployment?**  An offline comparison where a new skill's output is compared to the live system's output in parallel without affecting the user experience.

#### Question 73

**What is the "Two-Tiered Assert Framework"?**  It decouples logic by validating underlying script code independently while auditing the  **SKILL.md**  triggers across multiple model families to ensure portability.

#### Question 74

**Why is "isolation a trap" for the token budget?**  A skill that works in isolation (2k tokens) may cause a system with 15 co-loaded skills to hit a "Context Rot Zone" (50k+ tokens) where reasoning accuracy collapses.

#### Question 75

**What is the "Trigger Accuracy" target for graduating a skill from the Read-Only tier?**  A skill should hit at least 90% trigger accuracy.

#### Question 76

**What is "Trajectory-aware scoring" vs. "Output-only scoring"?**  Output-only scoring just checks what the agent said. Trajectory-aware scoring checks  *how*  it got there, preventing "lucky" correct answers reached via dangerous tool sequences.

#### Question 77

**How does a "5-point deficit" in the Vercel study indicate harmful skills?**  It showed a poorly designed skill (63% accuracy) performed worse than the base agent (58%), proving skills can be actively detrimental if they inject noise.

#### Question 78

**What are "Adversarial / Red-Team" probes?**  Systematic attempts to expose failure modes by using negative boundary cases and varied rephrasings to trick the agent into misfiring.

#### Question 79

**What is the "Regressions" failure mode?**  It occurs when a newly added skill overlaps with an existing one, causing previously perfect routing to fail due to semantic ambiguity.

#### Question 80

**When is "EXACT" scoring mandatory?**  In "action-allowed" scenarios where the sequence of tool calls (e.g., Auth \-\> Validate \-\> Charge) is critical to prevent unverified side effects.While evaluation ensures individual skills work, scaling to enterprise-grade systems requires high-level architectural patterns and meta-automation.

#### 4\. Systems Architecture and Meta-Automation (Architect Level)

The "Demo-to-Deploy Gap" is where team confidence collapses upon contact with messy real-world data. To bridge this gap, architects must "Shift Intelligence Left"—replacing fragile natural language rules with deterministic software constraints and Directed Acyclic Graph (DAG) orchestration. This approach treats the LLM context not as a database, but as a temporary reasoning space. By moving to a Skills Library, organizations can achieve a 98% reduction in active context while building a durable asset that captures institutional expertise as code.

#### Question 81

**Explain the concept of "Shifting Intelligence Left."**  It is the practice of moving logic out of fragile LLM prompts and into deterministic, testable software scripts or "Reviewer & Gate" nodes in a DAG. This replaces "ALWAYS DO X" rules with software that makes failure impossible.

#### Question 82

**What is DAG Orchestration in agent systems?**  Directed Acyclic Graph orchestration uses a graph-based execution where structured state is passed between nodes via a "file-bus," preventing the circular dependencies and context bloat found in simple prompt chains.

#### Question 83

**Why is the LLM context window a poor "message bus"?**  Using context to pass raw state between skills causes "obfuscation" and bloat. Architects should pass URIs or pointers via the file system to keep the reasoning space clean.

#### Question 84

**What is the "Read / Draft / Act" governance ladder?**

1. **Read-Only:**  Fetches data. 2\)  **Draft-Only:**  Human reviews output. 3\)  **Action-Allowed:**  Executes irreversible operations after domain, security, and executive sign-off.

#### Question 85

**Explain the "break-even" analysis of Skills Library vs. "One Big Prompt."**  A monolithic prompt might load 15,000 tokens every turn. A 50-skill library loads \~4,000 tokens of metadata plus \~2,000 tokens for the  *active*  skill body (\~6,000 tokens total). The library is more efficient once the monolithic prompt exceeds the metadata overhead.

#### Question 86

**What reduction in active context did Anthropic report by using skills?**  They observed a reduction of more than 98 percent (from 150,000 tokens to 2,000).

#### Question 87

**In the Claude Code v2.1.88 reverse-engineering, what percentage of the codebase was the "agent loop"?**  Only 1.6%. The other 98.4% was operational infrastructure (compaction, permissions, subagent delegation).

#### Question 88

**What is a "Meta-Skill"?**  A specialized skill whose job is to author, evaluate, or improve other skills within the library (e.g., skill-creator).

#### Question 89

**Describe "Assisted authoring from traces."**  An agent watches a successful human or system execution trace and automatically proposes a  **SKILL.md**  that captures those steps as procedural memory for the library.

#### Question 90

**Why should meta-skills always enter the library at the "Draft Tier"?**  To ensure a human-in-the-loop can scan the diff and catch errors like "overfitting" or "breaking downstream dependencies" that an autonomous loop might miss.

#### Question 91

**According to the Retail Case Study, why is**  **project-guidance**  **a "Read-Only" skill?**  It provides expertise (e.g., "how to tile a shower") but does not mutate state or spend money. It is safe to automate without a human-in-the-loop.

#### Question 92

**Why is**  **materials-list**  **categorized as a "Draft-Only" skill?**  Because it generates a bill-of-materials that a customer must review before purchase. The "Act" part of the ladder remains with the human to prevent ordering errors.

#### Question 93

**Why must**  **issue-refund**  **be an "Action-Allowed" skill?**  Because it executes an irreversible financial transaction. It requires the highest level of graduation: adversarial red-teaming and executive sign-off.

#### Question 94

**Why is distributed ownership critical in an enterprise?**  It prevents the AI team from becoming a bottleneck. Domain teams (e.g., Trades Knowledge or Fulfillment) own the expertise; the library simply encodes it.

#### Question 95

**What are "Domain Context Wrappers" in a DAG?**  Reference nodes that teach the agent specific conventions or rules (e.g., local building codes) without requiring those rules to stay in the primary reasoning prompt.

#### Question 96

**Explain "Inversion & Recovery" nodes.**  These are deterministic gates that force the agent to stop and clarify assumptions with a human before proceeding with an action, preventing "hallucinated intent."

#### Question 97

**What heuristic should be used when choosing from the 40,000+ existing skills?**  Prefer first-party skills for vendor tools (e.g., Stripe), pin specific versions to avoid dependency drift, and audit for supply-chain hygiene.

#### Question 98

**What is the "Cold Start" recommendation for organizations?**  Record an experienced practitioner narrating three regular workflows. Use those transcripts as the first-draft procedural memory for the library.

#### Question 99

**What is "Context Debt"?**  It occurs when authors bloat prompts with "ALWAYS DO X" rules. Models eventually learn to ignore these capitalized imperatives, just as developers ignore walls of warning text.

#### Question 100

**Summarize the "One-line mental model" that differentiates Skills from RAG and System Prompts.**  System prompts are instinct; AGENTS.md is the project README; RAG is the library; Skills are the specific runbook handed to a new colleague that the AI never forgets.  
