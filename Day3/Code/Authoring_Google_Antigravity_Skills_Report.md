# Authoring Google Antigravity Skills – Day 3 Codelab Report

## Course Information

**Course:** 5-Day AI Agents: Intensive Vibe Coding Course With Google
**Day:** 3 – Agent Skills
**Codelab:** Authoring Google Antigravity Skills
**Date Completed:** June 17, 2026

---

# Objective

The objective of this codelab was to understand and implement Agent Skills in Google Antigravity. Skills provide a lightweight and modular mechanism for extending AI agent capabilities through reusable instructions, resources, examples, and executable scripts.

The lab focused on:

* Understanding the purpose of Agent Skills
* Installing and configuring skills
* Exploring different skill design patterns
* Executing skills within Antigravity CLI
* Understanding progressive disclosure and context management

---

# Introduction to Agent Skills

Modern AI agents often suffer from:

* Context saturation
* Tool overload
* Increased latency
* Context rot

Agent Skills solve these problems through a concept known as **Progressive Disclosure**.

Instead of loading all instructions and tools into the model context at startup, only lightweight metadata is initially exposed. Detailed instructions, scripts, templates, and resources are loaded only when the user request matches a particular skill.

Benefits include:

* Reduced token consumption
* Faster reasoning
* Better context quality
* Modular architecture
* Reusable workflows

---

# Skill Architecture

A typical skill follows the structure:

```text
my-skill/
├── SKILL.md
├── scripts/
├── resources/
├── examples/
└── assets/
```

## Components

### SKILL.md

Contains:

* Skill metadata
* Trigger description
* Instructions
* Constraints
* Examples

### Scripts

Optional executable code that performs deterministic actions.

Examples:

* Python
* Bash
* Node.js

### Resources

Static content such as:

* Templates
* Documentation
* Legal text
* Configuration files

### Examples

Few-shot learning examples that guide the agent.

---

# Skills Installed

The following skills were installed in the project scope:

```text
Day3/Code/.agents/skills/
├── database-schema-validator
├── git-commit-formatter
├── json-to-pydantic
└── license-header-adder
```

Installation source:

https://github.com/rominirani/antigravity-skills

---

# Skill Discovery Verification

After installation, Antigravity CLI successfully detected the available skills.

Command:

```text
What skills are available?
```

Detected skills:

1. database-schema-validator
2. git-commit-formatter
3. json-to-pydantic
4. license-header-adder

Result:

✅ Successful

---

# Skill Demonstration 1: Git Commit Formatter

## Purpose

Automatically generate commit messages that comply with the Conventional Commits specification.

## Workflow

### Repository Setup

Created:

```python
def login():
    pass
```

inside:

```text
git_test/auth.py
```

### Feature Addition

Google Login functionality was added.

### Commit Execution

Prompt:

```text
Stage the changes and commit them using the Conventional Commits skill.
```

Generated commit:

```text
feat(auth): add google login functionality
```

## Outcome

The skill correctly:

* Loaded SKILL.md
* Analyzed changes
* Determined commit type
* Generated a valid Conventional Commit message

Result:

✅ Successful

---

# Skill Demonstration 2: License Header Adder

## Purpose

Automatically add standard copyright and license headers to source files.

## Workflow

Created:

```python
def hello():
    print("Hello World")
```

in:

```text
my_script.py
```

The skill automatically:

* Read HEADER_TEMPLATE.txt
* Converted comment syntax for Python
* Prepended the license header

Resulting file included:

```python
# Copyright (c) 2026 MyCompany LLC
# Licensed under the Apache License, Version 2.0
```

## Outcome

The skill correctly applied the license template.

Result:

✅ Successful

---

# Skill Demonstration 3: JSON to Pydantic

## Purpose

Convert JSON structures into strongly typed Pydantic models.

## Input

```json
{
  "product": "Widget",
  "cost": 10.99,
  "stock": null
}
```

## Processing

The skill:

* Read product.json
* Loaded few-shot examples
* Inferred data types
* Generated a Pydantic model

Example output:

```python
from pydantic import BaseModel
from typing import Optional

class Product(BaseModel):
    product: str
    cost: float
    stock: Optional[int] = None
```

## Outcome

The model compiled and validated successfully.

Result:

✅ Successful

---

# Skill Demonstration 4: Database Schema Validator

## Purpose

Validate SQL schemas against organizational database standards.

## Validation Rules

### Safety

No:

```sql
DROP TABLE
```

statements allowed.

### Naming

All tables must use:

```text
snake_case
```

### Structure

Each table must contain:

```sql
id PRIMARY KEY
```

## Planned Test Schema

```sql
DROP TABLE IF EXISTS legacy_users;

CREATE TABLE userProfile (
    id INT PRIMARY KEY,
    bio TEXT
);

CREATE TABLE posts (
    title TEXT,
    content TEXT,
    created_at TIMESTAMP
);
```

Expected errors:

```text
DROP TABLE statements are forbidden.
Table 'userProfile' must be snake_case.
Table 'posts' is missing a primary key named 'id'.
```

## Outcome

The skill was successfully installed and discovered.

Execution could not be completed because the Antigravity Starter quota was exhausted before the final validation step.

Result:

⚠ Quota limitation encountered

Skill installation and discovery were verified successfully.

---

# Key Skill Design Patterns Learned

## 1. Router Pattern

Example:

```text
git-commit-formatter
```

Purpose:

* Intent routing
* Instruction-only skills

---

## 2. Asset Utilization Pattern

Example:

```text
license-header-adder
```

Purpose:

* Load external resources
* Reduce prompt size
* Avoid duplicating static text

---

## 3. Few-Shot Learning Pattern

Example:

```text
json-to-pydantic
```

Purpose:

* Learn from examples
* Improve consistency
* Reduce instruction complexity

---

## 4. Tool Use Pattern

Example:

```text
database-schema-validator
```

Purpose:

* Execute deterministic scripts
* Validate outputs
* Combine reasoning with automation

---

# Skills Scope

## Project Scope

```text
<project-root>/.agents/skills/
```

Available only within the current project.

## Global Scope

```text
~/.gemini/config/skills/
```

Available across all Antigravity projects.

---

# Key Learnings

* Agent Skills enable modular AI agent capabilities.
* Progressive Disclosure prevents context saturation.
* Skills can contain instructions, resources, examples, and executable scripts.
* Skills are dynamically loaded only when relevant.
* Different skill patterns serve different use cases.
* Antigravity can automatically discover and activate installed skills.
* Skills significantly improve maintainability and specialization of AI agents.

---

# Conclusion

This codelab demonstrated how Google Antigravity Skills extend AI agents with reusable and specialized capabilities. Through installation and execution of multiple skills, it became clear how progressive disclosure improves context efficiency while maintaining powerful task-specific behavior.

The exercises showcased several common patterns including instruction routing, resource utilization, few-shot learning, and script-based validation. These patterns provide a strong foundation for building scalable and maintainable AI-powered development workflows.

Overall Status:

* Skill Installation: ✅ Completed
* Skill Discovery: ✅ Completed
* Git Commit Formatter: ✅ Completed
* License Header Adder: ✅ Completed
* JSON to Pydantic: ✅ Completed
* Database Schema Validator: ⚠ Quota Limited
* Learning Objectives Achieved: ✅ Completed