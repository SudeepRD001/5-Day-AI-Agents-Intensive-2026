# Google Developer Knowledge MCP Server Integration with Antigravity CLI

## Objective

The objective of this lab was to configure and test the Google Developer Knowledge MCP (Model Context Protocol) Server using Antigravity CLI. The task involved enabling the Developer Knowledge API in Google Cloud, creating and securing an API key, configuring the MCP server in Antigravity, validating the connection, testing documentation retrieval capabilities, and finally cleaning up cloud resources.

---

# Introduction

Google Developer Knowledge is a machine-readable knowledge source that provides access to Google's official developer documentation through APIs and MCP servers. It allows AI agents to retrieve accurate and up-to-date information directly from Google documentation rather than relying solely on model training data.

The Model Context Protocol (MCP) enables AI systems to securely access external tools and data sources. By integrating the Google Developer Knowledge MCP Server with Antigravity, developers can access Google documentation using natural language queries.

---

# Prerequisites

The following prerequisites were required:

* Google Cloud Project
* Developer Knowledge API access
* API Key
* Antigravity CLI installed
* Internet connection
* Windows operating system

---

# Implementation Steps

## Step 1: Google Cloud Project Setup

A Google Cloud project was selected and configured for the lab environment.

### Actions Performed

1. Opened Google Cloud Console.
2. Selected an existing Google Cloud project.
3. Verified project access permissions.

---

## Step 2: Enable Developer Knowledge API

The Developer Knowledge API was enabled to allow access to Google's official developer documentation through MCP.

### Actions Performed

1. Navigated to APIs & Services.
2. Searched for "Developer Knowledge API".
3. Enabled the API successfully.

### Result

The API became available for authentication and MCP integration.

---

## Step 3: Create API Key

An API key was generated and restricted for secure access.

### Actions Performed

1. Opened APIs & Services → Credentials.
2. Selected Create Credentials → API Key.
3. Assigned a name for the key.
4. Restricted usage to Developer Knowledge API.
5. Generated and copied the API key securely.

### Security Note

The API key was not shared publicly and was used only for local MCP configuration.

---

## Step 4: Configure Antigravity MCP Server

The MCP server configuration was added to the Antigravity configuration file.

### Configuration File Location

Windows:

C:\Users\<username>\.gemini\config\mcp_config.json

### MCP Configuration

{
"mcpServers": {
"google-developer-knowledge": {
"headers": {
"X-Goog-Api-Key": "<API_KEY>"
},
"serverUrl": "https://developerknowledge.googleapis.com/mcp"
}
}
}

### Actions Performed

1. Opened the MCP configuration file.
2. Added the Google Developer Knowledge MCP entry.
3. Replaced the placeholder with the generated API key.
4. Saved the configuration.

---

## Step 5: Validate MCP Installation

The Antigravity CLI was launched and MCP servers were verified.

### Command Used

agy

### MCP Validation Command

/mcp

### Output Observed

✓ google-developer-knowledge

Available Tools:

* search_documents
* answer_query
* get_documents

### Result

The MCP server loaded successfully and was recognized by Antigravity CLI.

---

## Step 6: Test Google Developer Knowledge MCP

Several natural language prompts were executed to verify functionality.

### Example Prompts

1. Based on the Google Developer Knowledge, does Google Workspace support MCP servers?

2. Give me a list of the Google Workspace and Cloud Run API names.

3. Based on the Google Developer Knowledge, create a Python script to upload a file to Google Drive.

### Observations

* Antigravity requested tool execution permission.
* MCP tools were invoked successfully.
* Responses were generated using official Google documentation.
* Documentation retrieval worked as expected.

### Result

The integration was verified successfully.

---

# Validation Evidence

### Antigravity CLI MCP Status

MCP Servers

✓ google-developer-knowledge

Tools:

* search_documents
* answer_query
* get_documents

### Verification Outcome

The successful appearance of the MCP server and available tools confirmed:

* Correct API configuration
* Successful authentication
* Proper MCP integration
* Functional communication with Google Developer Knowledge services

---

# Cleanup Activities

After successful testing, cloud resources were cleaned up.

## Actions Performed

### Disable Developer Knowledge API

1. Opened Google Cloud Console.
2. Navigated to APIs & Services Dashboard.
3. Selected Developer Knowledge API.
4. Clicked Disable API.

### Delete API Key

1. Opened APIs & Services → Credentials.
2. Selected the created API key.
3. Deleted the API key permanently.

### Result

All cloud resources created for the lab were removed successfully.

---

# Learning Outcomes

After completing this lab, the following skills were acquired:

* Understanding of Model Context Protocol (MCP)
* Configuration of external MCP servers
* Google Cloud API management
* API key creation and restriction
* Integration of Google Developer Knowledge with AI agents
* Verification and testing of MCP tools
* Secure cleanup of cloud resources

---

# Conclusion

The Google Developer Knowledge MCP Server was successfully integrated with Antigravity CLI. The setup enabled direct access to Google's official developer documentation through MCP tools such as search_documents, answer_query, and get_documents. The integration was validated through multiple test prompts, demonstrating successful retrieval of authoritative documentation. After validation, all cloud resources were properly cleaned up by disabling the API and deleting the API key.

The lab successfully demonstrated how AI agents can leverage Google's official documentation through MCP to reduce hallucinations and improve the accuracy of generated responses.
