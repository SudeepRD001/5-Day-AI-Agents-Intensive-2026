# **Agents CLI & ADK 2.0 Report**

## **5-Day AI Agents Intensive 2026 – Day 3**

### **Managing the Agent Lifecycle with Agents CLI and ADK 2.0**

---

## **Author**

**Sudeep Doddamani**

## **Date**

June 2026

## **Course**

5-Day AI Agents Intensive 2026 – Google & Kaggle

---

# **1\. Objective**

The objective of this codelab was to learn how to manage the complete development lifecycle of AI agents using **Agents CLI** and the **Agent Development Kit (ADK) 2.0**.

The lab demonstrated how to:

* Configure authentication for Gemini models.  
* Install and configure Agents CLI.  
* Scaffold a new ADK 2.0 agent project.  
* Understand graph-based workflows.  
* Run linting and validation checks.  
* Test agents using the local playground.  
* Execute agent workflows from the command line.  
* Manage the local development lifecycle efficiently.

---

# **2\. Technologies Used**

| Technology | Purpose |
| ----- | ----- |
| Python 3.11+ | Agent development |
| Agents CLI | Agent lifecycle management |
| ADK 2.0 | Agent Development Framework |
| Gemini Models | LLM-powered reasoning |
| Antigravity IDE | Agent coding environment |
| uv Package Manager | Dependency management |
| Google Cloud / Gemini API | Authentication and model access |

---

# **3\. Environment Setup**

## **Authentication Options**

### **Option A: Gemini API Key**

export GEMINI\_API\_KEY="YOUR\_API\_KEY"  
export GOOGLE\_GENAI\_USE\_ENTERPRISE=FALSE

### **Option B: Google Cloud ADC**

gcloud auth application-default login

gcloud config set project PROJECT\_ID

export GOOGLE\_GENAI\_USE\_ENTERPRISE=TRUE  
export GOOGLE\_CLOUD\_PROJECT=PROJECT\_ID  
export GOOGLE\_CLOUD\_LOCATION=LOCATION

---

# **4\. Installing Agents CLI**

The setup process was completed using:

uvx google-agents-cli setup

This command automatically installed:

* Agents CLI  
* ADK integration tools  
* Antigravity skills

### **Installed Skills**

google-agents-cli-adk-code  
google-agents-cli-deploy  
google-agents-cli-eval  
google-agents-cli-observability  
google-agents-cli-publish  
google-agents-cli-scaffold  
google-agents-cli-workflow

These skills enable Antigravity to scaffold, evaluate, deploy, and monitor agents.

---

# **5\. Creating an Agent Project**

A new prototype agent was generated using ADK 2.0.

### **Project Goal**

Build a customer support workflow for a shipping company.

The workflow should:

1. Accept user queries.  
2. Classify the query.  
3. Determine if it is shipping-related.  
4. Route valid questions to a shipping FAQ agent.  
5. Politely reject unrelated questions.

---

# **6\. ADK 2.0 Workflow Architecture**

The generated agent uses a **graph workflow architecture**.

START  
  |  
  v  
save\_query  
  |  
  v  
categorize\_agent  
  |  
  v  
route\_inquiry  
  |  
  \+------ shipping \------\> FAQ Agent  
  |  
  \+------ unrelated \-----\> Decline Node

This architecture demonstrates conditional routing within ADK 2.0 workflows.

---

# **7\. Understanding the Core Components**

## **7.1 Workflow**

The workflow acts as the orchestration engine.

Responsibilities:

* Managing execution order  
* Routing data  
* Coordinating nodes  
* Handling conditional branching

Example:

root\_agent \= Workflow(  
    name="customer\_support\_workflow",  
    edges=\[...\]  
)

---

## **7.2 LLM Agents**

LLM agents are reusable reasoning components powered by Gemini.

Example:

categorize\_agent \= LlmAgent(  
    name="categorize",  
    model="gemini-3.1-flash-lite",  
    instruction="Classify user queries"  
)

Purpose:

* Intent classification  
* FAQ answering  
* Structured outputs

---

## **7.3 Nodes**

Nodes contain custom business logic.

Example:

@node  
def route\_inquiry(ctx, node\_input):  
    ...

Responsibilities:

* Reading state  
* Transforming data  
* Making routing decisions

---

## **7.4 Context**

Context provides access to workflow state.

Example:

ctx.state.get("user\_query")

Used for:

* Sharing information between nodes  
* Maintaining workflow memory  
* Passing intermediate results

---

## **7.5 Events**

Events are used to move information between workflow components.

Example:

yield Event(data=query)

Capabilities:

* Transfer data  
* Trigger routes  
* Update workflow state

---

## **7.6 Edges**

Edges define graph transitions.

Example:

Edge.chain(  
    "START",  
    save\_query,  
    categorize\_agent,  
    route\_inquiry  
)

They connect:

* Nodes  
* Agents  
* Routing paths

---

# **8\. Agent Workflow Execution**

### **Shipping Question**

Input:

How much is standard shipping?

Flow:

save\_query  
   ↓  
categorize\_agent  
   ↓  
route\_inquiry  
   ↓  
shipping\_faq  
   ↓  
Response

Output:

Standard shipping costs $5.99.

---

### **Unrelated Question**

Input:

What is the weather today?

Flow:

save\_query  
   ↓  
categorize\_agent  
   ↓  
route\_inquiry  
   ↓  
handle\_unrelated

Output:

I am a shipping support assistant and can only answer shipping questions.

---

# **9\. Automated Code Quality Checks**

Agents CLI provides built-in linting.

Command:

agents-cli lint

Purpose:

* Verify imports  
* Detect syntax issues  
* Apply formatting standards  
* Improve maintainability

Benefits:

* Cleaner codebase  
* Fewer runtime errors  
* Consistent project structure

---

# **10\. Interactive Testing with Playground**

The local playground provides a browser-based environment for testing agents.

Command:

agents-cli playground

Features:

* Interactive chat interface  
* Workflow visualization  
* Tool execution tracking  
* Live debugging  
* Automatic code reloads

Default URL:

http://127.0.0.1:8080/dev-ui

---

# **11\. Real-Time Auto Reloading**

One of the most useful features is automatic reload support.

Example modification:

Add emojis to shipping responses.  
Highlight free shipping threshold.

After saving:

* Playground detects file changes.  
* Agent reloads automatically.  
* No server restart required.

Benefits:

* Faster iteration  
* Rapid experimentation  
* Improved developer productivity

---

# **12\. Command-Line Agent Execution**

Agents can be tested directly from the terminal.

Example:

agents-cli run \\  
"How long does standard delivery take?"

Expected Output:

Standard delivery takes  
3–5 business days.

Advantages:

* Quick testing  
* Automation support  
* CI/CD integration  
* Scriptable workflows

---

# **13\. Cleanup Process**

After testing:

### **Stop Playground**

CTRL \+ C

### **Remove Project**

rm \-rf customer-support-agent

This removes all generated project files from the local environment.

---

# **14\. Key Learnings**

Through this codelab, I learned:

### **Agents CLI**

* Installation and configuration  
* Project scaffolding  
* Workflow execution  
* Agent testing  
* Lifecycle management

### **ADK 2.0**

* Graph-based orchestration  
* Workflow design  
* Conditional routing  
* Context management  
* Event-driven execution

### **Development Workflow**

* Linting and validation  
* Interactive debugging  
* Hot reloading  
* Command-line execution

---

# **15\. Challenges Faced**

| Challenge | Solution |
| ----- | ----- |
| Understanding workflow graphs | Studied nodes, edges, and routing |
| ADK architecture concepts | Explored generated scaffold code |
| Routing logic | Traced workflow execution step-by-step |
| Playground testing | Used live chat interface for validation |

---

# **16\. Practical Applications**

The architecture demonstrated in this codelab can be extended to:

* Customer support agents  
* IT helpdesk assistants  
* Order tracking systems  
* Internal enterprise assistants  
* Banking support workflows  
* Healthcare triage agents  
* Multi-agent orchestration systems

---

# **17\. Conclusion**

This codelab provided hands-on experience with the complete AI agent development lifecycle using **Agents CLI** and **ADK 2.0**.

By creating and testing a shipping customer-support workflow, I gained practical knowledge of:

* Graph-based agent architectures  
* LLM-powered workflow nodes  
* Conditional routing  
* Local development tooling  
* Agent testing and debugging  
* Lifecycle management best practices

Agents CLI significantly simplifies agent development by providing a standardized workflow for scaffolding, testing, linting, and running ADK-based applications, making it an essential tool for building production-ready AI agents.

---

