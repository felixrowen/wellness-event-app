# Wellness Event Management Application

A full-stack web application for managing wellness events between HR administrators and wellness vendors. Built with Next.js, Express.js, TypeScript, and MongoDB.

---
## 🏗 Architecture

This is a monorepo containing both frontend and backend applications:

```
wellness-event-app/
├── frontend/           # Next.js web application (Vercel)
├── backend/            # Express.js API server (KVM VPS)
└── README.md           
```

### Documentation

| Component | Description | Documentation |
|-----------|-------------|---------------|
| **Backend** | Express.js REST API with MongoDB | [Backend Architecture](./backend/ARCHITECTURE.md) |
| **Frontend** | Next.js React application | [Frontend Architecture](./frontend/ARCHITECTURE.md) |

---

## 🚀 Quick Start

### Prerequisites

- Node.js v20.x or higher
- MongoDB Atlas account (or local MongoDB)
- Git

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your MongoDB connection string and secrets

# Run development server
npm run dev

# Server runs on http://localhost:3001
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with API URL and NextAuth configuration

# Run development server
npm run dev

# Application opens at http://localhost:3000
```

---

## 🛠 Technology Stack

### Frontend
- **Framework:** Next.js 15.3.1 (React 18.3.1)
- **Language:** TypeScript 5.6.3
- **UI Library:** HeroUI 2.8.5 + Tailwind CSS 4.1.11
- **State Management:** TanStack React Query 5.90.7
- **Authentication:** NextAuth 4.24.13
- **Forms:** React Hook Form 7.66.0 + Yup 1.7.1
- **Deployment:** Vercel

### Backend
- **Framework:** Express.js 5.1.0
- **Language:** TypeScript 5.9.3
- **Database:** MongoDB (Atlas)
- **ODM:** Mongoose 8.19.3
- **Authentication:** JWT (jsonwebtoken 9.0.2)
- **Validation:** Yup 1.7.1
- **Deployment:** KVM VPS with PM2 + Nginx

---

## 📱 User Roles

### HR (Human Resources)
- Create wellness events
- View all events
- Manage vendors
- Approve vendor-proposed dates
- Delete/cancel events

### Vendor (Wellness Service Provider)
- View assigned events
- Approve events
- Reject events with reason
- Propose alternative dates
- Cannot create or delete events

---

## 🔄 Event Status Flow

Events progress through the following statuses:

1. **PENDING** → Event created, waiting for vendor response
2. **APPROVED** → Vendor accepted the event
3. **REJECTED** → Event was rejected (by vendor or HR)
4. **AWAITING_VENDOR_PROPOSAL** → Vendor needs to suggest dates
5. **AWAITING_HR_CONFIRMATION** → HR needs to confirm vendor's proposal
6. **CONFIRMED** → Final confirmation from HR
7. **COMPLETE** → Event finished successfully
8. **EXPIRED** → Event date passed without confirmation
9. **CANCELLED** → Event was cancelled

---

## 🌐 Deployment

### Production URLs

- **Frontend:** https://wellness-event-app.vercel.app
- **Backend API:** https://api.devsatchel.com/api
- **API Documentation:** https://api.devsatchel.com/api-docs

### Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Users / Browsers                      │
└──────────────────┬──────────────────────────────────────┘
                   │
         ┌─────────┴──────────┐
         │                    │
         ↓                    ↓
┌────────────────┐   ┌────────────────────┐
│ Vercel (CDN)   │   │ KVM VPS + Nginx    │
│ Frontend       │   │ Backend API        │
│ Next.js App    │   │ Express.js         │
└────────────────┘   └─────────┬──────────┘
                               │
                               ↓
                     ┌──────────────────┐
                     │ MongoDB Atlas    │
                     │ Cloud Database   │
                     └──────────────────┘
```

**📖 Deployment Details:**
- [Backend Deployment Guide](./backend/ARCHITECTURE.md#deployment-architecture)
- [Frontend Deployment Guide](./frontend/ARCHITECTURE.md#deployment-architecture)

---

## 📂 Project Structure

### Backend Structure

```
backend/
├── src/
│   ├── controllers/       # Request handlers
│   ├── services/          # Business logic
│   ├── repositories/      # Database operations
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── middlewares/       # Auth, validation, error handling
│   ├── validators/        # Request validators
│   ├── utils/             # Helper functions
│   └── types/             # TypeScript types
├── ecosystem.config.js    # PM2 configuration
├── nginx.conf             # Nginx configuration
└── package.json
```

**📖 Full Structure:** [Backend Architecture - Project Structure](./backend/ARCHITECTURE.md#project-structure)

### Frontend Structure

```
frontend/
├── pages/                 # Next.js pages (routes)
├── components/
│   ├── layouts/          # Page layouts
│   ├── views/            # Page-level components
│   └── ui/               # Reusable UI components
├── services/             # API service layer
├── libs/                 # Third-party configs
├── contexts/             # React Context providers
├── types/                # TypeScript types
├── utils/                # Helper functions
└── config/               # Configuration files
```

**📖 Full Structure:** [Frontend Architecture - Project Structure](./frontend/ARCHITECTURE.md#project-structure)

---

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user profile

### Events Management
- `GET /api/events` - Get all events (filtered by role)
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (HR only)
- `PUT /api/events/:id/approve` - Approve event (Vendor only)
- `PUT /api/events/:id/reject` - Reject event
- `DELETE /api/events/:id` - Delete event (HR only)

### Vendors
- `GET /api/vendors` - Get all vendors (HR only)
- `GET /api/vendors/:id` - Get vendor by ID

**📖 Full API Documentation:** [Backend Architecture - API Architecture](./backend/ARCHITECTURE.md#api-architecture)


## 🔧 Development Workflow

### 1. Start Backend

```bash
cd backend
npm run dev
# Backend runs on http://localhost:3001
```

### 2. Start Frontend

```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
```

### 3. Access Application

- Open browser: http://localhost:3000
- Login or register
- Start managing wellness events!

---

## 🌟 Key Features Explained

### For HR Staff

1. **Create Events** - Fill out form with event details (title, description, dates, location)
2. **View All Events** - See all events across all vendors
3. **Filter Events** - Filter by status (pending, approved, confirmed, etc.)
4. **Approve Vendor Dates** - When vendor proposes alternative dates
5. **Delete Events** - Cancel unwanted events

### For Vendors

1. **View Assigned Events** - See events assigned to your company
2. **Approve Events** - Accept events with proposed dates
3. **Propose Alternative Dates** - Suggest different dates for events
4. **Reject Events** - Decline events with reason
5. **Track Status** - Monitor event progress through statuses

---

## 📊 Database Schema

### Users Collection
```javascript
{
  email: "user@company.com",
  password: "hashed_password",
  companyName: "ABC Corp",
  role: "HR" | "VENDOR",
  createdAt: Date,
  updatedAt: Date
}
```

### Events Collection
```javascript
{
  title: "Yoga Workshop",
  description: "...",
  category: 1, // PHYSICAL_WELLNESS
  status: "PENDING",
  proposedDates: [Date, Date],
  confirmedDate: Date,
  location: "Conference Room",
  duration: "1 hour",
  audience: "All employees",
  companyInfo: ObjectId, // HR who created
  assignedVendorId: ObjectId,
  rejectionReason: String,
  createdAt: Date,
  updatedAt: Date
}
```

**📖 Full Schema:** [Backend Architecture - Database Schema](./backend/ARCHITECTURE.md#database-schema)

---

## 🎨 UI Components

### Layouts
- **DashboardLayout** - Header + Sidebar + Content
- **AuthLayout** - Centered layout for login/register

### Views
- **HRDashboard** - Event management for HR
- **VendorDashboard** - Event approval for vendors
- **Login** - Authentication form
- **Register** - Registration form

### UI Components
- **EventCard** - Card displaying event information
- **EventTable** - Table view of events
- **FilterTabs** - Status filter tabs
- **Modals** - Various modals for actions
- **Navbar** - Top navigation
- **Sidebar** - Side menu navigation
- **Toaster** - Toast notifications

**📖 Component Details:** [Frontend Architecture - Core Components](./frontend/ARCHITECTURE.md#core-components)

---

## 📝 Environment Variables

### Backend (.env)

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/wellness-events

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# API
BASE_URL=http://localhost:3001
```

### Frontend (.env)

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here
```

---
