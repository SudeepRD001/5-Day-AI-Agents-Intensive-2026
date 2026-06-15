# ***🚀 The New SDLC With Vibe Coding – Day 1 Summary***

***Kaggle 5-Day AI Agents Intensive Course (Day 1\)***  
*Understanding the evolution from traditional software development to AI-driven Agentic Engineering.*

---

## ***📖 Overview***

*Software engineering is experiencing its biggest transformation since the introduction of high-level programming languages.*

*The traditional focus on **syntax** (writing code line by line) is rapidly shifting toward **intent** (describing what should be built and allowing AI systems to implement it).*

*This concept is explored in Google's whitepaper:*

***"The New SDLC With Vibe Coding: From Ad-Hoc Prompting to Agentic Engineering"***  
*by **Addy Osmani, Shubham Saboo, and Sokratis Kartakis**.*

*This repository contains my Day 1 learnings, notes, insights, and key takeaways from the Kaggle AI Agents Intensive Course.*

---

# ***🎯 Learning Objectives***

*By completing Day 1, I learned:*

* *The evolution of AI-assisted software development*  
* *What Vibe Coding really means*  
* *The difference between Vibe Coding and Agentic Engineering*  
* *How AI is transforming the Software Development Life Cycle (SDLC)*  
* *The importance of Context Engineering*  
* *The role of AI Coding Agents*  
* *The Factory Model of modern software development*  
* *Harness Engineering and AI agent infrastructure*  
* *Economic impacts of AI-assisted development*  
  ---

  # ***🧠 The Shift From Syntax to Intent***

*Historically, developers spent most of their time translating:*

* *Business Problem*  
*         *↓*  
* *Technical Design*  
*         *↓*  
* *Code Syntax*  
*         *↓*  
* *Machine Execution*


*Today, AI systems increasingly handle the implementation layer.*

*The developer's responsibility is shifting toward:*

* *Defining goals*  
* *Designing architecture*  
* *Creating specifications*  
* *Establishing constraints*  
* *Verifying outputs*

*In short:*

*Developers are moving from writing code to expressing intent.*

---

# ***📈 Evolution of AI Coding***

| *Year* | *Evolution Stage* |
| ----- | ----- |
| *\~2021* | *Autocomplete* |
| *\~2022* | *Inline Code Suggestions* |
| *\~2023* | *Chat-Based Code Generation* |
| *\~2024-25* | *Coding Agents* |
| *\~2025-26* | *Autonomous Agents* |

### ***Modern Autonomous Agents Can:***

* *Clone repositories*  
* *Analyze codebases*  
* *Plan implementations*  
* *Execute code*  
* *Run tests*  
* *Fix errors*  
* *Submit pull requests*

*without human keystrokes.*

---

# ***🤖 What Is Vibe Coding?***

*Vibe Coding is a development style where:*

1. *A developer describes what they want.*  
2. *AI generates code.*  
3. *Errors are copied back into the AI.*  
4. *AI attempts fixes.*

*Typical workflow:*

* *Prompt*  
*    *↓*  
* *Generate*  
*    *↓*  
* *Run*  
*    *↓*  
* *Error*  
*    *↓*  
* *Prompt Again*


  ### ***Advantages***

* *Extremely fast*  
* *Great for prototypes*  
* *Useful for hackathons*  
* *Ideal for experimentation*

  ### ***Limitations***

* *Minimal verification*  
* *High technical debt*  
* *Security risks*  
* *Difficult maintenance*  
  ---

  # ***🏗️ Agentic Engineering***

*Agentic Engineering is a structured and production-ready AI development methodology.*

*Instead of relying solely on prompts, developers use:*

* *Specifications*  
* *Architecture documents*  
* *Testing frameworks*  
* *Evaluation suites*  
* *Context systems*  
* *Guardrails*

  ### ***Goal***

*Build reliable software using AI while maintaining engineering discipline.*

---

# ***⚖️ Vibe Coding vs Agentic Engineering***

| *Category* | *Vibe Coding* | *Agentic Engineering* |
| ----- | ----- | ----- |
| *Intent Definition* | *Casual prompts* | *Formal specifications* |
| *Verification* | *Manual checks* | *Automated tests & evals* |
| *Risk Level* | *High* | *Low* |
| *Code Understanding* | *Minimal* | *Architectural review* |
| *Best For* | *Prototypes* | *Production systems* |
| *Scalability* | *Limited* | *Enterprise-ready* |

---

# ***🧩 AI Agents Explained***

*An AI Agent follows a continuous loop:*

* *Perceive Goal*  
*       *↓*  
* *Plan*  
*       *↓*  
* *Act*  
*       *↓*  
* *Observe*  
*       *↓*  
* *Iterate*


  ## ***Core Components***

  ### ***1\. Model***

*Reasoning engine.*

### ***2\. Tools***

*APIs, databases, scripts, web access.*

### ***3\. Memory***

*Stores context and project knowledge.*

### ***4\. Orchestration***

*Controls workflows and decisions.*

### ***5\. Deployment***

*Infrastructure and production runtime.*

---

# ***🧠 Context Engineering***

*The whitepaper highlights:*

*Prompt Engineering is evolving into Context Engineering.*

*The quality of AI output depends more on context than prompt wording.*

---

## ***Six Types of Context***

### ***Instructions***

*Agent goals and responsibilities.*

### ***Knowledge***

*Documentation and reference materials.*

### ***Memory***

*Persistent project information.*

### ***Examples***

*Reference implementations.*

### ***Tools***

*Available APIs and resources.*

### ***Guardrails***

*Constraints and safety checks.*

---

## ***Static vs Dynamic Context***

### ***Static Context***

*Always loaded.*

*Examples:*

* *AGENTS.md*  
* *CLAUDE.md*  
* *GEMINI.md*  
* *System Instructions*

  ### ***Dynamic Context***

*Loaded only when needed.*

*Examples:*

* *Tool results*  
* *RAG documents*  
* *Session history*  
* *Agent skills*  
  ---

  # ***🏭 The Factory Model***

*Traditional View:*

* *Developer → Writes Code*


*Modern View:*

* *Developer*  
*     *↓*  
* *Designs System*  
*     *↓*  
* *AI Agents*  
*     *↓*  
* *Generate Code*  
*     *↓*  
* *Tests Verify*  
*     *↓*  
* *Deploy*


*The developer becomes a:*

*Factory Manager*

*responsible for designing the software-production system.*

---

# ***🔧 Harness Engineering***

*The Whitepaper introduces a critical concept:*

* *Agent \= Model \+ Harness*


  ### ***Approximate Contribution***

* *Model   ≈ 10%*  
* *Harness ≈ 90%*  
    
  ---

  ## ***Components of a Harness***

  ### ***Instructions***

*Rules and objectives.*

### ***Tools***

*APIs and MCP servers.*

### ***Sandboxes***

*Secure execution environments.*

### ***Orchestration***

*Workflow management.*

### ***Guardrails***

*Policy enforcement.*

### ***Observability***

*Logs, metrics, tracing.*

---

# ***🔄 AI-Driven SDLC***

## ***Traditional SDLC***

* *Requirements*  
*      *↓*  
* *Design*  
*      *↓*  
* *Implementation*  
*      *↓*  
* *Testing*  
*      *↓*  
* *Deployment*  
*      *↓*  
* *Maintenance*  
    
  ---

  ## ***AI-Driven SDLC***

* *Requirements*  
*      *↓*  
* *AI-Assisted Design*  
*      *↓*  
* *Agent Implementation*  
*      *↓*  
* *Automated Testing*  
*      *↓*  
* *AI Review*  
*      *↓*  
* *Deployment*  
*      *↓*  
* *Continuous Optimization*


*Implementation time is shrinking dramatically, while:*

* *Requirements*  
* *Architecture*  
* *Verification*

*remain heavily human-driven.*

---

# ***🎼 Developer Roles***

*The paper introduces two new modes.*

---

## ***Conductor Mode***

*Real-time collaboration with AI.*

*Examples:*

* *Pair programming*  
* *Debugging*  
* *Refactoring*

*Characteristics:*

* *Immediate feedback*  
* *Fine-grained control*  
* *Interactive development*  
  ---

  ## ***Orchestrator Mode***

*Delegating tasks to autonomous agents.*

*Examples:*

* *Code migrations*  
* *Test generation*  
* *Large feature implementation*

*Characteristics:*

* *High leverage*  
* *Multi-agent workflows*  
* *Asynchronous execution*  
  ---

  # ***⚠️ The 80% Problem***

*AI can often generate:*

* *80% of a feature quickly*


*but struggles with:*

* *Edge cases*  
* *Business logic*  
* *Ambiguous requirements*  
* *Architectural trade-offs*  
* *Long-term maintainability*

*The final 20% remains highly dependent on human expertise.*

---

# ***💰 Economics of AI Development***

## ***Vibe Coding***

### ***Pros***

* *Low upfront investment*  
* *Fast iteration*

  ### ***Cons***

* *High token costs*  
* *Technical debt*  
* *Security risks*  
* *Maintenance burden*  
  ---

  ## ***Agentic Engineering***

  ### ***Pros***

* *Reliable outputs*  
* *Better scalability*  
* *Lower long-term costs*  
* *Strong governance*

  ### ***Cons***

* *Higher initial setup effort*  
  ---

  # ***🚀 Practical Recommendations***

  ## ***For Developers***

* *Create an `AGENTS.md`*  
* *Define coding standards*  
* *Write tests before generating code*  
* *Review AI-generated output carefully*  
* *Maintain debugging skills*  
  ---

  ## ***For Engineering Teams***

* *Treat context as code*  
* *Version control prompts and agent skills*  
* *Build evaluation suites*  
* *Reuse harness configurations*  
* *Focus on reliability over demos*  
  ---

  # ***📌 Key Takeaways***

  ### ***1\. Structure Scales, Vibes Don't***

*Vibe Coding is excellent for experimentation.*

*Production systems require Agentic Engineering.*

---

### ***2\. AI Amplifies Engineering Culture***

*Good engineering practices become stronger.*

*Poor practices become more expensive.*

---

### ***3\. Intent Is the New Interface***

*Future developers will spend less time writing code and more time:*

* *Designing systems*  
* *Defining specifications*  
* *Creating context*  
* *Evaluating outcomes*  
  ---

  # ***🎓 Day 1 Reflection***

*The most important insight from Day 1 is:*

*The future of software engineering is not about writing more code. It is about designing systems that enable AI agents to build reliable software from human intent.*

*The role of developers is evolving from coders to architects, orchestrators, and quality decision-makers.*

---

## ***📚 References***

* *Google Whitepaper: The New SDLC With Vibe Coding (May 2026\)*  
* *Authors:*  
  * *Addy Osmani*  
  * *Shubham Saboo*  
  * *Sokratis Kartakis*  
* *Kaggle 5-Day AI Agents Intensive Course*  
  ---

  ## ***⭐ Repository Purpose***

*This repository serves as:*

* *Day 1 course notes*  
* *AI Agent learning journal*  
* *Reference guide for Agentic Engineering concepts*  
* *Foundation for future AI Agent projects and capstone work*  
  ---

  ### ***Author***

***Sudeep Doddamani***

*Cybersecurity | AI | Machine Learning | Threat Intelligence | AI Agents*

