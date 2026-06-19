# LinkSnap - Enterprise URL Management

LinkSnap is a modern, enterprise-grade URL shortener and link management platform. Built to help individuals and businesses scale their link management, it provides a comprehensive suite of features including secure authentication, real-time analytics, link organization, and cross-device responsive design. 

This project solves the problem of long, unmanageable links by providing short, branded links with deep analytics on click rates, device usage, and geographical data. It features a premium, responsive UI designed for maximum user engagement and usability.

## 🚀 Key Highlights
- **Premium User Experience**: Sleek, fully responsive UI built with Tailwind CSS v4 and a modern dark/light mode aesthetic.
- **Deep Analytics**: Track click-through rates, geographical locations, referring domains, and device types.
- **Robust Authentication**: Secure, cross-domain cookie-based JWT authentication with OTP-based password recovery via email.
- **High Performance**: Optimized PostgreSQL database queries using Drizzle ORM, ensuring fast link redirection.

---

## 🛠 Tech Stack

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
- **UI & Visualization**: Recharts, Sonner (Toasts), Lucide/Material Icons

### Backend
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Drizzle](https://img.shields.io/badge/drizzle-%23C5F74F.svg?style=for-the-badge&logo=drizzle&logoColor=black)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
- **Utilities**: Bcrypt, JWT, NodeMailer, NanoID, GeoIP-Lite

### Infrastructure
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

---

## ✨ Features

| Category | Feature | Description |
| :--- | :--- | :--- |
| **Core** | URL Shortening | Instantly generate short, shareable links using NanoID. |
| **Core** | Link Management | Edit, delete, and organize links from a central dashboard. |
| **Advanced** | Deep Analytics | Visualize clicks over time, geographic data, and device types using Recharts. |
| **Advanced** | Geo-Tracking | Automatically resolve IP addresses to geographical locations using `geoip-lite`. |
| **Security** | Secure Auth Flow | Cookie-based JWT authentication (`SameSite=None`, `Secure`) for cross-domain safety. |
| **Security** | Password Recovery | Secure OTP-based password reset flow utilizing NodeMailer. |
| **UX** | Responsive Design | 100% mobile-friendly interface with dynamic layouts and scalable typography. |
| **UX** | Dark Mode | Integrated light/dark mode theme switching with premium color palettes. |

---

## 📸 Application Screenshots

### Homepage
The landing page features a responsive hero section, feature highlights, and transparent pricing. Built with dynamic scaling for seamless mobile and desktop viewing.
![Homepage](./screenshots/homepage.png)

### Dashboard
The central hub for users to view total links, active links, total clicks, and average conversion rates. Includes a recent links table and an activity feed.
![Dashboard](./screenshots/dashboard.png)

### Analytics
Detailed breakdowns of individual link performance, featuring line charts for clicks over time and pie/bar charts for device, referrer, and country data.
![Analytics](./screenshots/analytics.png)

### Authentication
A sleek authentication layout with secure login, registration, and a multi-step OTP-based forgot password flow.
![Login](./screenshots/login.png)

---

## 🏗 Architecture

### Project Architecture
The application uses a decoupled client-server architecture. The React single-page application (SPA) communicates with the Express REST API via Axios.

```mermaid
graph TD
    Client[React Frontend - Vercel] -->|Axios REST Requests| API[Express API - Render]
    API -->|Read/Write| ORM[Drizzle ORM]
    ORM -->|SQL Queries| DB[(PostgreSQL)]
    API -->|Send OTP| Email[NodeMailer / SMTP]
    
    subgraph Auth Flow
    API -.->|Set-Cookie: JWT| Client
    end
```

### Folder Structure
```text
project-root/
│
├── client/                 # React Frontend Application
│   ├── src/
│   │   ├── components/     # Reusable UI elements (Buttons, Inputs, Layouts)
│   │   ├── context/        # React Context providers (AuthContext)
│   │   ├── pages/          # Route components (Dashboard, Analytics, Login)
│   │   ├── services/       # Axios API client wrappers
│   │   └── index.css       # Tailwind entry and custom CSS variables
│   └── vercel.json         # SPA routing configuration for deployment
│
├── server/                 # Node.js Backend Application
│   ├── controllers/        # Business logic for auth, url, and analytics routes
│   ├── middlewares/        # JWT verification, CORS setup
│   ├── models/             # Drizzle ORM schema definitions
│   ├── routes/             # Express route definitions
│   ├── utils/              # Email config, GeoIP resolution
│   └── drizzle.config.js   # Drizzle migration configuration
│
└── README.md
```

---

## 🗄 Database Schema

The database is built on **PostgreSQL** and managed entirely via **Drizzle ORM**. 

```mermaid
erDiagram
    USERS ||--o{ URLS : creates
    URLS ||--o{ CLICKS : receives
    
    USERS {
        uuid id PK
        varchar firstName
        varchar lastName
        varchar email UK
        text password
        boolean isVerified
        varchar resetPasswordOtp
        timestamp createdAt
    }
    
    URLS {
        uuid id PK
        varchar shortUrl UK
        text longUrl
        uuid userId FK
        timestamp expiresAt
        timestamp createdAt
    }
    
    CLICKS {
        uuid id PK
        uuid urlId FK
        timestamp timestamp
        varchar ipAddress
        varchar referrer
        varchar device
        varchar country
        varchar city
    }
```

---

## 🌐 API Endpoints

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/users/register` | Create a new user account |
| `POST` | `/api/users/login` | Authenticate user and set HttpOnly cookie |
| `POST` | `/api/users/forgot-password`| Send OTP to user email |
| `POST` | `/api/users/reset-password` | Verify OTP and reset password |

### URLs & Analytics
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/url/shorten` | Generate a new short URL |
| `GET` | `/api/url/:shortUrl` | Redirect to original URL & log click |
| `GET` | `/api/url/dashboard` | Get paginated links for authenticated user |
| `GET` | `/api/analytics/:shortUrl` | Get detailed click metrics for a specific link |
| `GET` | `/api/analytics/dashboard` | Get high-level account statistics |

---

## ⚙️ Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Database configuration
DATABASE_URL=postgresql://user:password@host:port/dbname

# Authentication
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development

# Server Configuration
PORT=5000
CLIENT_URL=http://localhost:5173

# Email Service (NodeMailer)
SMTP_HOST=smtp.your-email-provider.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
```

Create a `.env` file in the `client/` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Installation Guide

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/LinkSnap.git
cd LinkSnap
```

**2. Setup Backend**
```bash
cd server
npm install

# Push Drizzle schema to your PostgreSQL database
npm run db:push

# Start the development server
npm run dev
```

**3. Setup Frontend**
```bash
cd ../client
npm install

# Start the Vite development server
npm run dev
```

---

## ☁️ Deployment Guide

### Frontend (Vercel)
1. Push your code to GitHub.
2. Import the `client` folder as a project in Vercel.
3. Vercel automatically detects Vite. Set the Build Command to `npm run build` and Output Directory to `dist`.
4. Ensure `vercel.json` is present to handle React SPA routing (rewrites `/(.*)` to `/index.html`).

### Backend (Render)
1. Connect your repository to Render as a "Web Service".
2. Set Root Directory to `server`.
3. Set Build Command to `npm install` and Start Command to `node index.js`.
4. Add all environment variables (especially `DATABASE_URL`, `CLIENT_URL`, and `JWT_SECRET`). Ensure `CLIENT_URL` points to your Vercel domain to prevent CORS issues.

---

## 🛡️ Security Section

- **JWT in HttpOnly Cookies**: Tokens are securely stored in HttpOnly cookies, mitigating XSS (Cross-Site Scripting) attacks.
- **Cross-Domain Auth**: Implemented `SameSite=None` and `Secure=true` to allow secure session management across differing frontend (Vercel) and backend (Render) domains.
- **Password Hashing**: User passwords are encrypted using `bcrypt` before database insertion.
- **Input Validation**: API payload validation ensures integrity and prevents injection.
- **ORM Protection**: Drizzle ORM inherently protects against SQL injection through parameterized queries.

---

## ⚡ Performance Optimizations

- **Database Indexing**: The `shortUrl` column is strictly indexed (Unique Key) for lightning-fast `O(1)`/`O(log N)` lookup times during URL redirection.
- **Frontend Code Splitting**: Utilizing Vite's modern build system for optimized, chunked bundle sizes.
- **Optimized Assets**: CSS uses Tailwind's JIT engine to strip unused classes, producing minimal stylesheets.

---

## 💼 Resume Highlights

- **Architected a Full-Stack SPA**: Built a highly scalable URL management platform utilizing React 19, Node.js, and PostgreSQL, deployed across Vercel and Render.
- **Implemented Secure Authentication**: Designed a cross-domain authentication flow using HttpOnly JWT cookies (`SameSite=None`) and a secure OTP-based password recovery system via NodeMailer.
- **Data Visualization & Analytics**: Engineered an analytics engine capable of resolving IP geolocation and visualizing historical click data, devices, and top referrers using Recharts.
- **Optimized Database Operations**: Designed a relational PostgreSQL schema using Drizzle ORM, ensuring high-performance URL redirection through strategic indexing.
- **Responsive & Accessible UI**: Developed a premium, fully responsive interface utilizing modern CSS features, Tailwind CSS v4, and mobile-first design principles.
