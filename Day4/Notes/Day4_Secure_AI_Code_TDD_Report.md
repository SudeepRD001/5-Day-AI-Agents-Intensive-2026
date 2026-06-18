# Day 4 – Secure AI Code: Automated Threat Scans, Safety Guards, and Security Testing

## Course

5-Day AI Agents Intensive (Google + Kaggle)

## Module

Vibe Coding Agent Security and Evaluation

## Codelab

Vibecode and Secure an AI Agent Lifecycle with Antigravity and TDD

---

# Executive Summary

This codelab demonstrated how to build AI agents using a Secure-by-Design development workflow.

Rather than treating security as a final review step, security controls were integrated directly into the software development lifecycle through:

* Test Driven Development (TDD)
* Secure Coding Standards
* STRIDE Threat Modeling
* Semgrep Static Analysis
* Git Pre-Commit Security Gates
* Agent Execution Hooks
* Automated Remediation Loops

The project implemented an ADK 2.0 Shopping Assistant Agent capable of redeeming discount codes while enforcing strict business and security rules.

---

# Objectives

The primary goals of this codelab were:

* Build an ADK 2.0 Shopping Assistant Agent
* Establish secure development standards
* Implement automated threat modeling
* Create outcome-based security tests
* Configure static analysis pipelines
* Detect hardcoded secrets automatically
* Demonstrate agent self-correction workflows

---

# Technology Stack

## Core Components

* Python
* Google ADK 2.0
* Antigravity IDE
* Agents CLI
* Pytest
* Git
* Semgrep
* Pre-Commit Hooks

---

# Project Overview

The Shopping Assistant Agent provides:

### Discount Redemption Tool

Supported discount codes:

* WELCOME50
* SUMMER20

Business Rules:

* Codes can only be redeemed once.
* Invalid codes are rejected.
* Guest users cannot redeem discounts.
* Registered users are required.

---

# Secure Development Workflow

Traditional Development:

Requirements → Code → Test → Security Review

Secure Development:

Requirements → Threat Model → Security Controls → Code → Tests → Security Scan → Commit

This approach shifts security left and catches vulnerabilities earlier.

---

# Project Structure

shopping-assistant/

├── app/
│ └── agent.py
│
├── tests/
│ └── test_agent.py
│
├── .agents/
│ ├── CONTEXT.md
│ ├── hooks.json
│ ├── scripts/
│ └── skills/
│
├── .semgrep/
│ └── rules.yaml
│
├── .pre-commit-config.yaml
│
└── pyproject.toml

---

# Secure Coding Standards

A persistent context file was created:

.agents/CONTEXT.md

Purpose:

* Define approved development practices
* Reduce context rot
* Enforce consistent security behavior

Rules included:

## Tool Input Validation

All tool inputs must use:

* Pydantic Schemas
* Structured Validation

Benefits:

* Prevent malformed inputs
* Reduce injection risks

## No Shell Execution

Raw shell commands are prohibited unless explicitly approved.

Benefits:

* Prevent command injection
* Restrict dangerous operations

## Pre-Commit Remediation Loop

Failed commits trigger:

1. Security analysis
2. Refactoring
3. Retesting
4. Recommit attempt

---

# Simulated Vulnerability

To demonstrate automated detection, the agent intentionally included a hardcoded Gemini API key.

Example:

api_key="AIzaSyD-mock-key-value-12345"

This served as a controlled security flaw for testing static analysis controls.

---

# Semgrep Security Scanning

## Custom Detection Rule

A custom Semgrep rule was created to detect Google API keys.

Pattern:

AIzaSy[A-Za-z0-9_-]*

Detection Severity:

ERROR

Purpose:

* Prevent credential leakage
* Block insecure commits

---

# Git Pre-Commit Hooks

A Git security gate was configured using:

.pre-commit-config.yaml

Hooks executed:

### End-of-File Fixer

Ensures proper file formatting.

### Trailing Whitespace Fixer

Removes unnecessary whitespace.

### Semgrep Security Scan

Scans source code for:

* Secrets
* Credentials
* Security vulnerabilities

Any failed scan blocks the commit automatically.

---

# Agent Execution Hooks

Beyond Git hooks, the codelab implemented runtime agent hooks.

Configuration:

.agents/hooks.json

Purpose:

* Intercept tool executions
* Validate commands
* Prevent destructive operations

Examples blocked:

* rm -rf /
* mkfs

This provides defense during agent execution rather than only during commits.

---

# STRIDE Threat Modeling

A custom Antigravity skill was created:

stride-threat-model

The skill automatically analyzes the project against six threat categories.

## Spoofing

Can users impersonate legitimate identities?

## Tampering

Can system state be modified improperly?

## Repudiation

Are actions auditable?

## Information Disclosure

Can sensitive information leak?

## Denial of Service

Can expensive operations be abused?

## Elevation of Privilege

Can unauthorized users gain additional access?

The skill generates:

threat_model.md

for continuous security assessment.

---

# TDD Security Planning Gate

A mandatory planning stage was introduced.

Every implementation plan must include:

Security Boundaries & Assertions

Examples:

* Race conditions
* Privilege escalation
* Unauthorized tool access
* Negative input values

This forces security considerations before implementation begins.

---

# Outcome-Based Security Testing

Security tests were generated using Pytest.

Testing philosophy:

Assert outcomes rather than internal implementation details.

Benefits:

* Less fragile tests
* Better long-term maintainability

---

# Test Scenarios

## Single Use Discount Enforcement

Verify a code cannot be redeemed twice.

Expected Result:

Second redemption fails.

---

## Invalid Discount Rejection

Verify unknown codes are blocked.

Expected Result:

Error returned.

---

## Guest Account Restriction

Verify anonymous users cannot redeem discounts.

Expected Result:

Access denied.

---

# Automated Remediation Loop

The most important demonstration involved:

1. Writing vulnerable code
2. Running Git commit
3. Triggering Semgrep
4. Blocking commit
5. Refactoring automatically
6. Running tests
7. Recommitting successfully

Workflow:

Developer → Commit
↓
Pre-Commit Hook
↓
Semgrep Detection
↓
Commit Blocked
↓
Refactor
↓
Tests Pass
↓
Commit Approved

This ensures vulnerabilities are removed before code enters version control.

---

# Security Benefits

The workflow provides:

* Early vulnerability detection
* Automated secret scanning
* Strong validation controls
* Threat-model-driven development
* Reduced human error
* Continuous security verification

---

# Key Learnings

1. Security should begin at project inception.
2. TDD improves both quality and security.
3. Semgrep is effective for detecting secrets.
4. Git hooks provide powerful local enforcement.
5. Agent hooks secure runtime behavior.
6. STRIDE offers a systematic threat analysis framework.
7. Automated remediation reduces developer workload.
8. Secure-by-default workflows produce safer AI agents.

---

# Screenshots

## Workspace Initialization

(Add Screenshot)

---

## Shopping Assistant Agent

(Add Screenshot)

---

## STRIDE Threat Model Output

(Add Screenshot)

---

## Semgrep Detection

(Add Screenshot)

---

## Failed Commit Due to Security Scan

(Add Screenshot)

---

## Successful Commit After Remediation

(Add Screenshot)

---

## Pytest Results

(Add Screenshot)

---

# Conclusion

This codelab demonstrated how modern AI agent development can integrate security throughout the entire software lifecycle.

By combining Antigravity IDE, ADK 2.0, Agents CLI, STRIDE threat modeling, Semgrep scanning, Git pre-commit hooks, and TDD practices, a secure development workflow was established that continuously validates code quality and security.

The result is a development process where vulnerabilities are detected, tested, and remediated before they ever reach production.