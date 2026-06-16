# BigQuery Release Notes Explorer 🚀

A modern, responsive, and feature-rich dashboard for parsing, exploring, and sharing Google Cloud BigQuery release notes. 

Historically, Google Cloud release notes are published as grouped feed entries by date. The **BigQuery Release Notes Explorer** parses this feed, decomposes date-based entries into granular, individual updates categorized by type, and presents them in an interactive, sleek, dark-themed UI.

---

## 📋 Table of Contents
- [Project Overview](#-project-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Folder Structure](#-folder-structure)
- [Technologies Used](#-technologies-used)
- [Installation Instructions](#-installation-instructions)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Future Improvements](#-future-improvements)

---

## 🔍 Project Overview

The BigQuery Release Notes Explorer solves a common problem: Google Cloud release feeds bundle multiple updates (features, deprecations, and bug fixes) under a single date entry. This application:
1. Feeds from the official BigQuery release notes Atom feed.
2. Parsers break down the bundled feed entries into individual atomic items based on structural HTML tags (`<h3>`).
3. Determines deterministic hashes for each parsed update to uniquely identify them.
4. Stores items in a local cache with a configurable expiry (default: 1 hour) to maximize efficiency and respect feed rate limits.
5. Provides a JSON API and displays updates in a glassmorphic dashboard featuring search, filters, sorting, bulk actions, and integrated social sharing.

---

## ✨ Features

- ⚡ **Atomic Parsing:** Automatically separates large monthly or daily release logs into granular, categorizable updates.
- 📂 **Categorized View:** Classifies updates dynamically into **Features**, **Issues & Fixes**, **Deprecations**, and **General**.
- 📊 **Interactive Stats Cards:** Displays real-time counts for each category at a glance.
- 🔍 **Live client-side Search:** Instantly filters cards by keywords (e.g. `Gemini`, `partition`, `JSON`, `security`) in titles or descriptions.
- 🔄 **Intelligent Cache System:** Stores parsed results in a local JSON cache. Auto-refreshes if cache exceeds 1 hour. Falls back gracefully to expired cache if internet connectivity is lost.
- 📥 **Interactive Refresh:** Let users force-refresh the feed to fetch live updates immediately from Google.
- 🔀 **Sort Toggle:** Switch chronological ordering between **Newest First** and **Oldest First**.
- 🖱️ **Multi-Selection Mode:** Select multiple cards by clicking. Displays a dynamic floating action bar for bulk operations:
  - **Copy Markdown:** Copies the selected release notes to your clipboard formatted in clean markdown.
  - **Tweet Composer:** Launches a custom modal editor to preview, edit, and publish a pre-formatted tweet containing the selected items (with automatic 280-character limit tracking).
- 🎨 **Premium Glassmorphic Design:** A sleek, fully responsive dark-mode theme utilizing the **Plus Jakarta Sans** font, glowing ambient backdrops, and **Lucide** icons.

---

## 🏗️ Architecture

```mermaid
graph TD
    A[Google BigQuery RSS/Atom Feed] -->|XML Data| B[app.py Backend]
    B -->|Parse Entry splitting at H3s| C{Is cache expired?}
    C -->|Yes / Force Refresh| D[Fetch XML + Re-parse]
    C -->|No| E[Load from release_notes_cache.json]
    D -->|Write Cache| E
    B -->|Expose JSON Endpoint| F[/api/release-notes]
    F -->|Fetch AJAX| G[static/js/app.js Frontend]
    G -->|Render DOM| H[templates/index.html Dashboard]
```

The system is split cleanly into a micro-backend service and a single-page interactive client:

1. **Backend Service (`app.py`):**
   - Implemented using **Flask**.
   - Pulls Google's XML feed via standard Python `urllib.request`.
   - Parses the XML document structure with standard `xml.etree.ElementTree`.
   - Segregates updates within each entry's HTML snippet using `BeautifulSoup` parsing by identifying `<h3>` headers.
   - Implements a deterministic hash using `hashlib.md5` on date, category, and text content to keep track of item uniqueness.
   - Manages cache lifecycle on the filesystem with `release_notes_cache.json`.

2. **Frontend UI Client (`app.js`):**
   - Vanilla ES6 JavaScript handling local application state.
   - Dynamic DOM injection and event listeners.
   - Live filters, sorting, and keyword matching.
   - Interactive modals, action bars, and toasts.

---

## 📂 Folder Structure

```text
bq-release-notes/
├── .venv/                         # Python virtual environment (ignored by git)
├── static/                        # Static assets directory
│   ├── css/
│   │   └── styles.css             # Main styling, variables, layout & animations
│   └── js/
│       └── app.js                 # Frontend application state, search, copy & tweet logic
├── templates/
│   └── index.html                 # Flask main HTML page template
├── app.py                         # Flask application & parser backend
├── release_notes_cache.json       # Generated cache store for parsed updates
├── requirements.txt               # Project dependencies
└── README.md                      # Documentation (this file)
```

---

## 🛠️ Technologies Used

### Backend
- **Python 3.x**
- **Flask (>= 3.0.0)** - Lightweight micro-web framework.
- **BeautifulSoup4 (>= 4.12.0)** - HTML parser for breaking down feed tags.
- **xml.etree.ElementTree** - Native XML processing.
- **hashlib & urllib** - Request handling and hashing.

### Frontend
- **HTML5 & CSS3** - Modern semantic tags and custom layout (Flexbox/Grid/Variables).
- **Vanilla ES6+ JavaScript** - Dynamic rendering, local state management, and clipboard API integrations.
- **Lucide Icons** - Clean vector icons.
- **Google Fonts** - *Plus Jakarta Sans* (clean modern UI font) & *JetBrains Mono* (code/hashes font).

---

## 📥 Installation Instructions

### Prerequisites
Make sure you have **Python 3.8+** installed on your system.

### Steps

1. **Clone or navigate to the repository:**
   ```bash
   cd bq-release-notes
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv .venv
   ```

3. **Activate the virtual environment:**
   - **Windows (Command Prompt):**
     ```cmd
     .venv\Scripts\activate.bat
     ```
   - **Windows (PowerShell):**
     ```powershell
     .venv\Scripts\Activate.ps1
     ```
   - **macOS / Linux:**
     ```bash
     source .venv/bin/activate
     ```

4. **Install the required packages:**
   ```bash
   pip install -r requirements.txt
   ```

---

## 🚀 Running the Application

1. **Start the Flask server:**
   ```bash
   python app.py
   ```
   *By default, the server runs in debug mode bound to `127.0.0.1` on port `5000`.*

2. **Access the application:**
   Open your browser and navigate to:
   [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

---

## 🔌 API Endpoints

### 1. View Dashboard
- **Endpoint:** `GET /`
- **Description:** Renders the frontend dashboard template.

---

### 2. Fetch Release Notes (JSON API)
- **Endpoint:** `GET /api/release-notes`
- **Description:** Returns the parsed list of release notes from cache or fetches from Google feed.
- **Query Parameters:**
  - `force_refresh` (optional, string): If set to `true`, ignores the cache and queries Google's feed directly.
- **Response Format:**
  ```json
  {
    "success": true,
    "count": 142,
    "is_fresh": false,
    "timestamp": 1718549740.123,
    "updates": [
      {
        "id": "e2fc714c4727ee9395f324cd2e7f331f",
        "date": "June 12, 2026",
        "updated": "2026-06-12T00:00:00Z",
        "link": "https://cloud.google.com/bigquery/docs/release-notes",
        "type": "Feature",
        "description_html": "<p>BigQuery now supports new SQL functions...</p>",
        "description_text": "BigQuery now supports new SQL functions..."
      }
    ]
  }
  ```

---

## 📸 Screenshots

> [!NOTE]
> Add app screenshots here once deployed or run locally.

### Main Dashboard (Dark Mode Grid)
![Main Dashboard Placeholder](https://via.placeholder.com/1200x630/1a1a24/ffffff?text=BigQuery+Release+Notes+Dashboard)
*Clean dark mode dashboard exhibiting stats counters, filters, search bar, and release update cards.*

### Selection & Bulk Actions Mode
![Selection Mode Placeholder](https://via.placeholder.com/1200x630/1a1a24/ffffff?text=Multi-Select+Floating+Action+Bar)
*Selecting multiple cards summons the floating bar at the bottom, offering copy and share functionality.*

### Twitter / X Composer Modal
![Twitter Modal Placeholder](https://via.placeholder.com/1200x630/1a1a24/ffffff?text=Tweet+Preview+Composer+Modal)
*Interactive custom modal pre-formatting selected updates into a tweet with live character limit monitoring.*

---

## 🔮 Future Improvements

1. **Slack & Discord Webhook Integration:** Allow teams to subscribe to channels and automatically push newly discovered features.
2. **AI Summarization:** Feed raw HTML text through an LLM to generate one-sentence bullet points for dense updates.
3. **Database Integration:** Move cache from a flat JSON file to a lightweight SQLite database to allow historical indexing and tagging.
4. **Subscription Notifications:** Add email subscription capability for weekly summary digests of BigQuery updates.
5. **Advanced Filters:** Add sorting/filtering by specific date ranges and support tagging of specific sub-products (e.g. BigLake, Omni, Analytics Hub).
