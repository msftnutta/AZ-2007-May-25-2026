# 🌍 World Weather Dashboard

A full-stack Node.js weather application built for the **AZ-2007** training course. This app demonstrates real-world web development patterns and serves as a hands-on project for learning **GitHub Copilot** in VS Code.

![Node.js](https://img.shields.io/badge/Node.js-v18+-green) ![Express](https://img.shields.io/badge/Express-5.x-blue) ![Jest](https://img.shields.io/badge/Tests-Jest-red) ![Coverage](https://img.shields.io/badge/Coverage-85%25+-brightgreen)

---

## What This App Does

- Displays live weather for **8 cities across all continents** using the [Open-Meteo API](https://open-meteo.com/)
- Shows current temperature, humidity, wind speed, and weather conditions with emoji indicators
- Provides a **7-day forecast** detail page for each city
- Includes a **REST API endpoint** (`/api/weather`) returning JSON data
- Supports **dark/light theme toggle** with persistent preference
- Fully server-side rendered with EJS templates and styled with Tailwind CSS

---

## Project Structure

```
├── app.js              # Main Express server, routes, and helper functions
├── app.test.js         # Unit & integration tests (Jest + Supertest)
├── package.json        # Dependencies and npm scripts
├── routes/
│   └── weather.js      # Azure Maps weather route (bonus feature)
├── views/
│   ├── index.ejs       # Dashboard home page
│   ├── city.ejs        # City detail / 7-day forecast page
│   └── weather.ejs     # Azure Maps weather page
├── public/
│   └── style.css       # Static stylesheet
└── .env                # Environment variables (not committed)
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [VS Code](https://code.visualstudio.com/) with the **GitHub Copilot** extension installed

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Create a .env file (optional — the app works without it)
echo "PORT=3000" > .env

# 3. Start the app
npm start

# 4. Open in browser
# http://localhost:3000
```

### Running Tests

```bash
npm test
```

This runs **32 unit and integration tests** with code coverage:

| Category             | What It Tests                              |
|----------------------|--------------------------------------------|
| `getWeatherEmoji`    | WMO weather code → emoji mapping           |
| `getWeatherDescription` | WMO weather code → text description     |
| `Cities data`        | Data integrity of the cities array         |
| `Routes`             | HTTP endpoints (status codes, response format) |

---

## API Endpoints

| Method | Path            | Description                          |
|--------|-----------------|--------------------------------------|
| GET    | `/`             | Dashboard with all cities            |
| GET    | `/city/:id`     | 7-day forecast for a specific city   |
| GET    | `/api/weather`  | JSON array of current weather for all cities |

---

## 🤖 Learning GitHub Copilot with This Project

This project is designed as a sandbox for practicing GitHub Copilot features. Below are structured exercises and tips.

### Exercise 1: Ask Copilot to Explain Code

> **Try:** Select the `getWeatherEmoji` function in `app.js`, then press `Ctrl+I` and type:
> ```
> /explain what does this function do?
> ```

**Tip:** Copilot Chat can explain unfamiliar code, regex patterns, or complex logic. Highlight any section and ask!

---

### Exercise 2: Generate New Code with Inline Chat

> **Try:** Place your cursor after the `cities` array and press `Ctrl+I`:
> ```
> Add a function that returns the UV index description based on a numeric value
> ```

**Tip:** Be specific in your prompts. Instead of "add a function", say "add a function that takes a UV index number and returns a risk level string (Low, Moderate, High, Very High, Extreme)."

---

### Exercise 3: Generate Unit Tests

> **Try:** Open `app.test.js`, go to the end, press `Ctrl+I` and type:
> ```
> Add tests for the /city/:id route that verify the response contains forecast data
> ```

**Tip:** Copilot understands your test framework (Jest/Supertest) from existing test patterns. It will follow the same style automatically.

---

### Exercise 4: Use Copilot Chat for Refactoring

> **Try:** Open the Copilot Chat panel (`Ctrl+Shift+I`) and ask:
> ```
> How can I refactor the weather code mappings in app.js to use a lookup object instead of if statements?
> ```

**Tip:** You can ask Copilot to refactor using different patterns — it will show you the before/after comparison.

---

### Exercise 5: Fix Bugs with Copilot

> **Try:** Introduce a deliberate bug (e.g., change `code === 0` to `code === -1`), run tests, then ask:
> ```
> /fix the failing test
> ```

**Tip:** Use `/fix` in inline chat when you see red squiggles or test failures. Copilot reads the error context.

---

### Exercise 6: Generate Documentation

> **Try:** Select the entire `app.get('/api/weather', ...)` route handler, press `Ctrl+I`:
> ```
> /doc add JSDoc documentation
> ```

**Tip:** Copilot's `/doc` command generates JSDoc, Python docstrings, or language-appropriate documentation.

---

### Exercise 7: Use Chat Participants

> **Try these in Copilot Chat:**
> ```
> @workspace what npm scripts are available?
> @workspace how are the routes organized?
> @terminal run the tests and show me the coverage
> ```

**Tip:** `@workspace` searches your entire codebase. `@terminal` can run commands. These participants give Copilot more context.

---

## 💡 GitHub Copilot Tips & Tricks

### Inline Completions (Ghost Text)

| Technique | How |
|-----------|-----|
| Accept suggestion | Press `Tab` |
| Accept word-by-word | Press `Ctrl+Right Arrow` |
| Dismiss suggestion | Press `Esc` |
| See alternatives | Press `Alt+]` / `Alt+[` |

### Writing Better Prompts

1. **Be specific** — "Add error handling for network timeouts with a 5-second limit" beats "add error handling"
2. **Give context** — "Using the existing Express app and axios" helps Copilot pick the right patterns
3. **Use examples** — "Following the same pattern as getWeatherEmoji, create getWindDescription"
4. **Iterate** — If the first suggestion isn't right, refine your prompt rather than starting over

### Slash Commands in Chat

| Command | Purpose |
|---------|---------|
| `/explain` | Explain selected code |
| `/fix` | Fix errors in selection |
| `/doc` | Generate documentation |
| `/tests` | Generate unit tests |
| `/new` | Scaffold a new project |

### Power Features

- **Multi-file edits** — Ask Copilot to make changes across multiple files in one request
- **Terminal integration** — Ask `@terminal` to run commands and interpret output
- **Agent mode** — Let Copilot autonomously plan and execute multi-step tasks
- **Custom instructions** — Create `.github/copilot-instructions.md` to give Copilot project-specific context

---

## 🎯 Suggested Learning Path

1. **Explore** — Read through `app.js` and use `/explain` on sections you find interesting
2. **Test** — Run `npm test` and examine how the tests are structured in `app.test.js`
3. **Extend** — Use Copilot to add a new city to the dashboard
4. **Create** — Ask Copilot to add a new feature (e.g., air quality index, sunrise/sunset times)
5. **Refactor** — Use Copilot Chat to improve code quality (extract helpers, add types, etc.)
6. **Deploy** — Ask Copilot how to deploy this app to Azure App Service

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Express 5** | Web framework |
| **EJS** | Server-side templating |
| **Tailwind CSS** | Utility-first styling |
| **Open-Meteo API** | Free weather data (no API key needed) |
| **Jest** | Testing framework |
| **Supertest** | HTTP assertion library |
| **dotenv** | Environment variable management |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 3000) |
| `AZURE_MAPS_KEY` | No | Azure Maps key (for the `/weather` route only) |

---

# 🌟 Training Recap — GitHub Copilot (AZ-2007 Day 1)

## 🎯 Main Topic

The core focus of this session was:

👉 **Using GitHub Copilot for AI-assisted development**

The training demonstrated how AI can help developers:

* Write code faster
* Generate documentation
* Perform testing
* Fix bugs
* Improve applications

The goal was to show how developers can **work with AI as a pair programmer**, rather than coding everything manually.

---

## 🧠 Key Concepts Covered

### 1. What is GitHub Copilot?

* GitHub Copilot is an **AI coding assistant** integrated into development tools (like VS Code).
* It is designed **specifically for coding tasks**, unlike general AI tools.
* It supports:
  * Code generation
  * Code explanation
  * Documentation
  * Testing
  * Refactoring

💡 Key idea:  
Instead of copying code from the internet, developers can now let AI generate and suggest code directly.

### 2. Getting Started (Setup & Requirements)

To use GitHub Copilot:

* Create a **GitHub account (personal account recommended)**
* Activate Copilot (free tier available)
* Install the extension in your IDE (e.g., VS Code)
* Sign in to start using it

💡 Important note from session:

* No lab credentials were required
* All work is done using **your own GitHub account**

### 3. Learning Approach & Resources

The training relies mainly on **Microsoft Learn** instead of slides.

#### 📚 Learning resources shared:

* [Official GitHub Copilot Learning Path](https://learn.microsoft.com/en-us/training/paths/accelerate-app-development-using-github-copilot/)
* [Self-paced labs repository](https://microsoftlearning.github.io/mslearn-github-copilot-dev/)
* [Lab environment portal](https://esi.learnondemand.net/)
* [GitHub Copilot overview page](https://github.com/features/copilot)
* [Sample training GitHub repository](https://github.com/msftnutta/AZ-2007-May-25-2026)

💡 Guidance:

* Bookmark the **learning path** (main reference)
* Labs can be done later at your own pace

### 4. Core Features of GitHub Copilot

#### a. Chat in IDE (like built-in ChatGPT)

* Ask questions about your code
* Generate or modify code directly in your editor

#### b. Modes of Operation

Three main modes were demonstrated:

| Mode      | Purpose                            |
| --------- | ---------------------------------- |
| **Plan**  | Generate a plan (no coding yet)    |
| **Ask**   | Ask questions and get explanations |
| **Agent** | Perform actions and write code     |

💡 Best practice:

* Start with **Plan mode** → review → then implement

#### c. Code Completion (Inline Suggestions)

* Automatically suggests code while typing
* Can provide multiple alternatives

#### d. Explain Code

* Highlight code → ask Copilot to explain
* Useful for learning unfamiliar code

#### e. CLI Integration

* Copilot can run in command line
* Allows running tasks in background while coding

#### f. Cloud Agent (Powerful Feature)

You can assign tasks like:

* Fix bugs
* Add features
* Improve UI

GitHub Copilot will:

1. Analyze code
2. Plan changes
3. Create a pull request

💡 This simulates having an **AI developer working for you**

### 5. Hands-on Demo (End-to-End Scenario)

A full example was demonstrated:

#### 🛠 Build an app using Copilot

* Created a **Node.js web app**
* Displays:
  * Date & time
  * Weather information

#### ⚙️ Steps showcased:

* Plan the app using AI
* Generate project structure
* Auto-create files (app.js, HTML, CSS)
* Run the app locally

### 6. Debugging & Fixing Issues

AI was used to:

* Fix API errors (401 authentication issue)
* Update endpoints
* Troubleshoot runtime problems

💡 Key learning:

* AI helps, but **human validation is still required**

### 7. GitHub Workflow with AI

The session demonstrated a full developer workflow:

#### 🧩 Using Issues + Pull Requests

* Create issue → describe problem
* Assign to Copilot
* Copilot:
  * Analyzes issue
  * Generates fix
  * Creates PR
* User reviews & merges

#### Example tasks done:

* Fix UI bugs
* Update app behavior
* Resolve merge conflicts

### 8. UI Improvements with AI

AI was used to:

* Improve design (UI/UX)
* Add features:
  * World map
  * City grouping
  * Theme switch (dark/light)
  * Weather icons

💡 Insight:

* Copilot can act like a **frontend developer + designer**

### 9. Unit Testing with Copilot

AI was used to:

* Generate test files automatically
* Run tests (`npm test`)
* Validate application behavior

Results:

* Multiple test cases created
* All tests passed ✅

💡 Key benefit:

* Saves time writing test scripts manually

### 10. Code Optimization & Refactoring

Copilot can:

* Improve code structure
* Suggest better patterns
* Help modernize applications

💡 Example:

* Migrating or restructuring apps becomes easier with AI support

### 11. Prompting Best Practices

Important guidance from session:

✔ Use clear instructions  
✔ Add details when needed  
✔ Avoid relying on old slash commands (`/fix`, `/test`)

💡 Modern approach:
👉 Just write natural language prompts

Example:

> "Help me write documentation for this app"

### 12. Customization & Control

You can control:

* Models used
* Code style
* Dependencies
* Runtime versions

Also possible:

* Define reusable **instructions (skills)** for consistent behavior

### 13. Labs (Practice Work)

Participants worked on:

1. Explore Copilot settings
2. Generate documentation
3. Develop features with Copilot

💡 Labs are mostly:

* Self-paced
* Based on real projects

---

## 🚀 Key Takeaways

### ⭐ Biggest Value of GitHub Copilot

* Acts as your **AI coding partner**
* Helps across the **entire lifecycle**:
  * Plan → Code → Test → Fix → Improve

### ✅ What You Should Remember

* Start with **Plan mode**
* Always **review AI-generated code**
* Use **clear prompts instead of commands**
* Combine:
  * VS Code usage
  * CLI usage
  * Cloud agent for automation

### ⚠️ Important Mindset Shift

Before:
➡️ Copy code from internet

Now:
➡️ Collaborate with AI in real time

---

## 📌 Final Thought

> 👉 **Developers are still in control — AI just accelerates everything**
>
> You're not replacing coding — you're **powering it with AI**.

---

## License

ISC

The response provides temperature, weather description, humidity, wind speed, and other meteorological data.

## Dependencies

| Package | Purpose |
|---------|---------|
| express | Web framework |
| ejs | Server-side HTML templating |
| axios | HTTP client for API calls |
| dotenv | Load environment variables from `.env` |
| @azure/identity | Azure authentication (optional, for Entra ID auth) |
