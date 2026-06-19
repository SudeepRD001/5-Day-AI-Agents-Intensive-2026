# Agent Runtime Deployment Report

## 5-Day AI Agents Intensive Course with Google

### Day 5 – Deploy an ADK Agent to Agent Runtime using Agents CLI

---

## Overview

This report documents the concepts, architecture, workflow, and deployment process presented in the Day 5 optional codelab: **Deploy an ADK Agent to Agent Runtime using Agents CLI**.

The objective of the lab was to demonstrate how an Agent Development Kit (ADK) based AI agent can be transitioned from a local development environment into a production-grade cloud deployment using Google Cloud Agent Runtime and Agents CLI.

The codelab introduces enterprise deployment practices including environment preparation, agent packaging, deployment validation, cloud hosting, observability, and lifecycle management.

---

# Learning Objectives

After completing this lab, learners should understand how to:

* Prepare an ADK agent for production deployment.
* Configure Google Cloud services required for Agent Runtime.
* Install and use Agents CLI.
* Scaffold deployment-specific files.
* Perform deployment validation using dry-run workflows.
* Deploy agents to Google Cloud Agent Runtime.
* Test deployed agents.
* Monitor production agents using Cloud Trace and Cloud Logging.
* Register agents within the Agent Registry ecosystem.
* Clean up deployed resources.

---

# Solution Architecture

## High-Level Architecture

```text
+----------------------+
|  Local ADK Agent     |
|  Development Project |
+----------+-----------+
           |
           v
+----------------------+
|      Agents CLI      |
| Packaging & Deploy   |
+----------+-----------+
           |
           v
+----------------------+
|   Agent Runtime      |
| Google Cloud Hosted  |
+----------+-----------+
           |
           +----------------+
           |                |
           v                v
+----------------+   +----------------+
| Cloud Logging  |   | Cloud Trace    |
+----------------+   +----------------+
           |
           v
+----------------+
| Agent Registry |
+----------------+
```

The deployment workflow transforms a locally developed ADK agent into a managed cloud-hosted service capable of handling production workloads.

---

# Ambient Expense Agent

The codelab uses an example agent called the **Ambient Expense Agent**.

The agent automates employee expense processing using a graph-based workflow.

## Workflow Logic

### Auto Approval Path

Expenses below $100 are automatically approved.

```text
Expense Submitted
        |
        v
 Amount < $100
        |
        v
 Auto Approve
        |
        v
 Approved
```

### Human-in-the-Loop Path

Expenses equal to or greater than $100 require human review.

```text
Expense Submitted
        |
        v
 Amount >= $100
        |
        v
 Review Agent
        |
        v
 RequestInput
        |
        v
 Human Decision
        |
        v
 Approved / Rejected
```

This design demonstrates Human-in-the-Loop (HITL) workflows commonly used in enterprise AI systems.

---

# Environment Preparation

Before deployment, the Google Cloud environment must be configured.

## Required Services

The following APIs are enabled:

* Vertex AI API
* Cloud Trace API
* Cloud Build API
* Agent Registry API

These services provide:

| Service        | Purpose                  |
| -------------- | ------------------------ |
| Vertex AI      | Agent Runtime execution  |
| Cloud Build    | Packaging and deployment |
| Cloud Trace    | Observability            |
| Agent Registry | Agent discovery          |

---

# Agents CLI Installation

Agents CLI acts as the deployment and lifecycle management tool.

Installation:

```bash
uvx google-agents-cli setup
```

Verification:

```bash
agents-cli info
```

Agents CLI installs deployment skills, scaffolding utilities, evaluation tools, and workflow automation capabilities.

---

# Production Deployment Preparation

The project is enhanced for production deployment using:

```bash
agents-cli scaffold enhance \
--deployment-target agent_runtime \
--yes
```

Generated artifacts include:

## agent_runtime_app.py

Production service wrapper responsible for hosting the agent within Agent Runtime.

## deployment_metadata.json

Deployment configuration and runtime metadata used by Agent Runtime.

Importantly, the core agent implementation remains unchanged.

---

# Dependency Locking and Validation

Before deployment, dependencies are locked.

```bash
uv lock
```

A dry-run deployment validates configuration integrity.

```bash
agents-cli deploy --dry-run
```

Benefits include:

* Dependency verification
* Configuration validation
* Deployment preview
* Early issue detection

---

# Agent Deployment

Deployment is performed using:

```bash
agents-cli deploy \
--project PROJECT_ID \
--region us-west1
```

Deployment stages:

1. Package agent source code.
2. Upload artifacts.
3. Provision Agent Runtime resources.
4. Create execution environment.
5. Generate endpoint URL.
6. Register deployment metadata.

Typical deployment time:

5–10 minutes.

---

# Agent Testing

After deployment, functional testing validates business logic.

## Test Case 1 – Auto Approval

Input:

```json
{
  "amount": 50,
  "category": "meals"
}
```

Expected Result:

```text
Approved Automatically
```

## Test Case 2 – Human Review

Input:

```json
{
  "amount": 150,
  "category": "meals"
}
```

Expected Result:

```text
RequestInput Triggered
Human Review Required
```

These tests confirm both automated and human-supervised execution paths.

---

# Monitoring and Observability

Agent Runtime automatically integrates with Google Cloud observability services.

## Cloud Logging

Provides:

* Runtime logs
* Error tracking
* Execution records
* Tool outputs

## Cloud Trace

Provides:

* Execution traces
* Latency analysis
* Workflow visibility
* Tool invocation tracking

Benefits include:

* Faster debugging
* Production monitoring
* Performance analysis
* Root cause investigation

---

# Agent Registry Integration

Deployed agents are automatically registered within the Agent Registry.

Benefits:

* Centralized discovery
* Organizational sharing
* Governance support
* Lifecycle tracking

Verification command:

```bash
agents-cli publish gemini-enterprise --list
```

---

# Security Considerations

The deployment architecture incorporates multiple security controls.

## Managed Runtime

* Isolated execution environment
* Controlled infrastructure

## Human-in-the-Loop

* Prevents unsafe autonomous actions
* Enables approval workflows

## Observability

* Auditability
* Compliance support

## Agent Registry

* Controlled agent distribution
* Governance enforcement

---

# Key Takeaways

* Agent Runtime enables production hosting of ADK agents.
* Agents CLI simplifies deployment workflows.
* Human-in-the-Loop workflows improve governance.
* Cloud Trace and Logging provide enterprise observability.
* Agent Registry enables discoverability and lifecycle management.
* Production deployment requires validation, monitoring, and security controls.

---

# Conclusion

This codelab demonstrated the complete workflow for deploying an ADK-based AI agent from a local development environment into Google Cloud Agent Runtime.

The exercise highlighted how modern agent platforms simplify productionization through managed infrastructure, deployment automation, observability tooling, and governance mechanisms. By combining Agents CLI, Agent Runtime, Cloud Trace, Cloud Logging, and Agent Registry, developers can move beyond local experimentation and deploy scalable, enterprise-ready AI agents capable of supporting real-world business workflows.

---

## References

* Day 5 Optional Codelab: Deploy an ADK Agent to Agent Runtime using Agents CLI
* Google Agent Development Kit (ADK)
* Google Agent Runtime
* Google Cloud Trace
* Google Cloud Logging
* Agents CLI Documentation
