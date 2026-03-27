# Advisors Dashboard

This project is a dashboard built with Next.js to manage Advisors based on their income. It allows searching, sorting, creating, editing, and deleting advisors.

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

### 3. Open the app

[http://localhost:3000](http://localhost:3000)

## ⚠️ Backend / API

This project depends on a local API server.
For the purpose of this test, the provided backend runs on:

```bash
http://localhost:3001
```

Make sure the API server is running before starting the frontend, otherwise the app won’t be able to fetch data.

## 🧠 Technical Approach

- Built using Next.js (App Router)
- Data fetched dynamically via API
- State handled through URL search params for shareability
- Reusable components (Button, Modal, etc.)
- Separation of concerns:
  - Services → API calls
  - Components → UI
  - Hooks → logic (e.g. pagination)

Project is organized by responsibilities (components, services, hooks) to keep things simple and maintainable.

## 🧩 Features

- Search advisors by income range
- Paginated results (max 10 per page)
- Sort by name and income (asc/desc)
- Advisor detail view
- Create / Edit advisor (modal)
- Delete advisor
- Shareable URL with state (income, sort, page)

## ✨ Final Thoughts

I think the app works well overall, but the flow feels a bit long for simple tasks. For example, editing or deleting an advisor requires going through multiple views, which makes the interaction slower than it needs to be.
To improve this, I’d make the list view the main place where the Admin actually works:

- Allow editing and deleting directly from the list (without having to go into the detail view)
- Open the modal from the list when editing
- Make the detail view less necessary, or turn it into a side drawer so the full list stays visible

I’d also add a few small improvements:

- Confirmation messages when editing or deleting
- Better use of Next.js loading components (they’re already implemented, but could be improved with skeletons or clearer states)

With these changes, the app would feel more practical and efficient, especially for quick and repetitive tasks.With these changes, the app would feel more practical and efficient, especially for quick and repetitive tasks.

## Autors :ribbon:

[<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
</svg> **Angie Pérez**](https://www.linkedin.com/in/agieperez-webdeveloper/)
