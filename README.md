# Dashboard Navigation & Theme Project

A responsive **dashboard sidebar navigation system** with support for:
- Collapsible sidebar
- Dark & light theme toggle
- Section switching (Dashboard, Tasks, Settings, Account)
- Persistent state using **localStorage**
- Search with category filtering
- Breadcrumbs & titles update dynamically

-----------

## Project Structure

project-root/
│── index.html # Main HTML file
│── style.css # All styles
│── script.js # All JavaScript logic
│── assets/
│ ├── favicon.ico # Favicon (or PNG/SVG logo)
│ └── logo.png # Logo image


---------

## Tech Stack

- **HTML5** – Structure of the app
- **CSS3** – Styling and responsive design (custom, no frameworks)
- **JavaScript (ES6+)** – Core logic (theme toggle, sidebar, search, localStorage state)
- **LocalStorage API** – For persisting theme, sidebar state, and active section across reloads
- **SVG Icons** – Clean, scalable icons directly embedded in the UI


---------

## Features
- **Sidebar Collapse / Expand** – Smooth toggle with button or logo click.
- **Theme Switch** – Light / Dark mode with saved preference.
- **Dynamic Sections** – Dashboard, Tasks, Settings, and Account each with unique content area.
- **Search & Filter** – Instantly filter items and sub-items in the sidebar.
- **Breadcrumb Navigation** – Updates automatically based on the section/item.
- **Persistent State** – Theme, sidebar state, and last active section are restored on reload.

---------

## Getting Started

1. **Clone this project** or copy the files into your workspace.
   ```bash
   git clone https://github.com/yourusername/dashboard-project.git
   cd dashboard-project

2. **Project live demo**
    https://dualsidebardashbord.netlify.app/
