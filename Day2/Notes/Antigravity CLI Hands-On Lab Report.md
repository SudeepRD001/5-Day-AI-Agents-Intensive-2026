# **Antigravity CLI Hands-On Lab Report**

## **Overview**

This project demonstrates hands-on experience with Antigravity CLI, Google’s terminal-based AI coding assistant. The objective was to install, configure, and explore Antigravity CLI while building a real-world application using AI-assisted development workflows.

The lab covered installation, configuration, command-line usage, shell integration, model selection, non-interactive execution, artifact generation, and full-stack application development.

---

# **Objectives**

The primary objectives of this exercise were:

·       Install and configure Antigravity CLI.

·       Authenticate using Google OAuth.

·       Understand Antigravity CLI commands and modes.

·       Explore model selection capabilities.

·       Use Shell Mode within Antigravity.

·       Build a complete application using AI-assisted development.

·       Understand artifact generation and project planning.

·       Learn AI-driven software development workflows.

---

# **Environment Setup**

## **Operating System**

·       Windows 11

·       PowerShell

## **Tools Used**

·       Antigravity CLI v1.0.8

·       Python 3.x

·       Flask

·       Git

·       GitHub CLI (gh)

·       Google OAuth Authentication

---

# **Installation Process**

A dedicated workspace directory was created:

mkdir agy-cli-projects  
 cd agy-cli-projects

Antigravity CLI was installed using PowerShell:

irm https://antigravity.google/cli/install.ps1 | iex

Version verification:

agy \--version

Output:

1.0.8

Authentication was completed using Google OAuth and the workspace was marked as trusted.

---

# **Basic Antigravity CLI Usage**

## **Initial Prompt**

A basic AI interaction was performed:

Give me a famous quote on Artificial Intelligence and who said that?

The system successfully responded with AI-related quotations and attribution.

---

# **File Creation Task**

A simple Python file was generated using Antigravity CLI.

Prompt:

Create a Python file called hello.py that prints "Hello Antigravity"

Generated file:

print("Hello Antigravity")

Execution confirmed successful file creation.

---

# **Configuration Exploration**

The following configuration areas were explored:

·       Color Scheme

·       Tool Permissions

·       Trusted Workspaces

·       Telemetry Settings

·       Verbosity Settings

Configuration file location:

C:\\Users\\<username>\\.gemini\\antigravity-cli\\settings.json

---

# **Command Line Features**

## **Help Command**

agy \--help

Important options discovered:

| Command | Purpose |
| :---- | :---- |
| agy | Launch interactive mode |
| agy \-p | Non-interactive prompt mode |
| agy –model | Select specific model |
| agy \-c | Continue previous conversation |
| agy models | List available models |
| agy –dangerously-skip-permissions | Auto-approve permissions |

---

# **Non-Interactive Mode**

Prompt:

agy \-p "What is the gcloud command to deploy to Cloud Run?"

Result:

Antigravity directly returned deployment commands without entering interactive mode.

This demonstrated the capability of using Antigravity in scripts and automation workflows.

---

# **Model Selection**

Available models:

·       Gemini 3.5 Flash (Medium)

·       Gemini 3.5 Flash (High)

·       Gemini 3.5 Flash (Low)

·       Gemini 3.1 Pro (Low)

·       Gemini 3.1 Pro (High)

·       Claude Sonnet 4.6 (Thinking)

·       Claude Opus 4.6 (Thinking)

·       GPT-OSS 120B (Medium)

Example:

agy \--model "Claude Opus 4.6 (Thinking)"

Verification confirmed that the selected model was active during the session.

---

# **Shell Mode**

Shell Mode was explored to execute terminal commands directly from within Antigravity.

Examples:

\! type hello.py

Output:

print("Hello Antigravity")

This demonstrated seamless switching between AI interaction and command execution.

---

# **AI-Assisted Application Development**

## **Project**

BigQuery Release Notes Dashboard

### **Requirements**

The application was required to:

·       Fetch BigQuery release notes from XML feed.

·       Display release notes in a web interface.

·       Support refresh functionality.

·       Include loading indicators.

·       Allow users to select updates.

·       Enable social sharing through Twitter.

---

# **Architecture**

## **Backend**

Technology:

·       Python

·       Flask

Responsibilities:

·       Fetch XML release notes feed

·       Parse release note entries

·       Cache responses

·       Provide API endpoints

Main File:

app.py

---

## **Frontend**

Technologies:

·       HTML

·       CSS

·       JavaScript

Files:

templates/index.html  
 static/css/styles.css  
 static/js/app.js

Features:

·       Search

·       Filtering

·       Sorting

·       Selection

·       Tweet integration

·       Refresh support

---

# **Generated Project Structure**

bq-release-notes/  
 │  
 ├── app.py  
 ├── requirements.txt  
 │  
 ├── templates/  
 │   └── index.html  
 │  
 ├── static/  
 │   ├── css/  
 │   │   └── styles.css  
 │   │  
 │   └── js/  
 │   	└── app.js  
 │  
 └── .venv/

---

# **Features Implemented**

## **Backend**

·       XML feed parsing

·       Categorization of release notes

·       API endpoint generation

·       Response caching

·       Force refresh support

## **Frontend**

·       Responsive dashboard

·       Search functionality

·       Category filtering

·       Statistics panels

·       Refresh button

·       Loading spinner

·       Tweet composition

·       Twitter Web Intent integration

---

# **Artifact System**

Antigravity generated multiple artifacts during development:

·       Implementation Plan

·       Task Breakdown

·       Project Overview

·       Project README

Artifacts provide transparency into:

·       Design decisions

·       Development progress

·       Task completion

·       Verification steps

---

# **Key Learnings**

Through this exercise, the following concepts were learned:

### **AI-Assisted Development**

·       Prompt-driven application generation

·       Automated planning

·       Incremental implementation

### **Developer Productivity**

·       Multi-file editing

·       Tool execution

·       Dependency management

·       Automated testing

### **Software Engineering**

·       Flask architecture

·       REST APIs

·       Frontend-backend integration

·       Release note processing

### **Antigravity CLI Features**

·       Interactive mode

·       Non-interactive mode

·       Shell mode

·       Model switching

·       Artifact management

·       Permission controls

---

# **Challenges Encountered**

·       Differences between Linux-based documentation and Windows PowerShell commands.

·       Understanding shell mode behavior on Windows.

·       Configuration command behavior differences in CLI version 1.0.8.

These issues were resolved through experimentation and verification.

---

# **Conclusion**

This hands-on exercise successfully demonstrated the capabilities of Antigravity CLI as an AI-powered development assistant. The tool effectively generated a complete Flask-based web application, managed dependencies, created project artifacts, and provided a collaborative software development experience.

The project showcased how AI agents can accelerate software development workflows while maintaining developer oversight through permission controls, artifacts, and iterative planning.

Antigravity CLI proved to be a practical and powerful tool for both learning and real-world application development.

