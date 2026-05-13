# PharmaCare – Pharmacy Management System

A modern, full-featured pharmacy management system built with **React + Vite**, **Tailwind CSS**, and **Supabase**.

## 🚀 Features

- 📊 **Dashboard** – Real-time stats, sales trend chart, inventory breakdown, and activity feed
- 💊 **Inventory** – Full CRUD with table/grid views, search, category filtering, and stock alerts
- 📂 **Medicine Groups** – Browse medicines organized by category with totals
- 📈 **Reports** – Generate and download PDF reports (Sales, Inventory, Expiry)
- 🔐 **Authentication** – Supabase auth with protected routes and role-based access
- 🌙 **Dark Mode** – Full dark/light theme toggle with persistence
- 📱 **Responsive** – Mobile-first design with collapsible sidebar

## 🛠️ Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Frontend   | React 18 + Vite         |
| Styling    | Tailwind CSS v3         |
| Database   | Supabase (PostgreSQL)   |
| Auth       | Supabase Auth           |
| Charts     | Chart.js + react-chartjs-2 |
| PDF Export | jsPDF + autoTable       |
| Icons      | Lucide React            |
| Routing    | React Router v6         |
| Toasts     | React Hot Toast         |
| Deployment | Netlify                 |

## 📦 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Supabase
Edit `.env` with your Supabase project credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Setup database
Run the SQL files in order in your Supabase SQL editor:
1. `database/schema.sql` – Creates all tables and indexes
2. `database/users_table.sql` – Adds RLS policies
3. `database/medicines_table.sql` – Seeds sample medicines
4. `database/inventory_table.sql` – Seeds sample transactions
5. `database/reports_table.sql` – Creates helper views

### 4. Run development server
```bash
npm run dev
```

> **Demo Mode**: If Supabase is not configured, the app auto-uses dummy data. Click "Continue with Demo Account" on the login page.

## 🗂️ Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── auth/       # Login, Register, ProtectedRoute
│   ├── dashboard/  # Cards, Charts, Activities
│   ├── inventory/  # Table, Form, Details, Card
│   ├── navbar/     # Navbar, UserProfile
│   ├── reports/    # ReportCard, Table, Download
│   ├── sidebar/    # Sidebar, Menu, Item
│   └── ui/         # Button, Modal, Card, Loader, Toast
├── context/        # Auth, Theme, Sidebar contexts
├── data/           # Dummy seed data
├── hooks/          # useAuth, useMedicines, useInventory, useReports
├── layouts/        # MainLayout, AuthLayout
├── pages/          # Dashboard, Inventory, Reports, etc.
├── routes/         # AppRoutes
├── services/       # Supabase service modules
└── utils/          # formatDate, generatePDF, validators, constants
```

## 🚢 Deployment

Push to GitHub and connect to [Netlify](https://netlify.com). The `netlify.toml` handles build and SPA routing.

```bash
npm run build
```

## 📄 License
MIT
