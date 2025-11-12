# Frontend System Architecture


## 🎯 Overview

The Wellness Event Management Frontend is a modern, responsive web application built with Next.js, React, and TypeScript. It provides intuitive interfaces for both HR administrators and wellness vendors to manage wellness events.

### Key Features

- **Role-Based Dashboards** (HR & Vendor views)
- **NextAuth Authentication** (JWT-based sessions)
- **Real-time Data Fetching** (React Query)
- **Responsive Design** (HeroUI + Tailwind CSS)
- **Form Management** (React Hook Form + Yup validation)
- **Toast Notifications** (Custom context-based system)
- **Dark Mode Support** (next-themes)
- **Type Safety** (TypeScript throughout)

---

## 🛠 Technology Stack

### Core Framework

- **Framework:** Next.js 15.3.1 (App Router & Pages Router hybrid)
- **React:** 18.3.1
- **Language:** TypeScript 5.6.3
- **Runtime:** Node.js v20.x

### UI & Styling

| Library         | Version | Purpose                                     |
| --------------- | ------- | ------------------------------------------- |
| `@heroui/react` | 2.8.5   | Component library (buttons, inputs, modals) |
| `tailwindcss`   | 4.1.11  | Utility-first CSS framework                 |
| `framer-motion` | 11.18.2 | Animations & transitions                    |
| `next-themes`   | 0.4.6   | Dark/light mode theming                     |
| `react-icons`   | 5.5.0   | Icon library                                |

### State Management & Data Fetching

| Library                 | Version | Purpose                             |
| ----------------------- | ------- | ----------------------------------- |
| `@tanstack/react-query` | 5.90.7  | Server state management & caching   |
| `next-auth`             | 4.24.13 | Authentication & session management |
| `axios`                 | 1.13.2  | HTTP client for API requests        |

### Forms & Validation

| Library               | Version | Purpose                         |
| --------------------- | ------- | ------------------------------- |
| `react-hook-form`     | 7.66.0  | Form state management           |
| `@hookform/resolvers` | 5.2.2   | Validation resolver integration |
| `yup`                 | 1.7.1   | Schema validation               |

### Development Tools

- **Linting:** ESLint 9.25.1 + TypeScript ESLint
- **Formatting:** Prettier 3.5.3
- **Dev Server:** Next.js Turbopack (fast refresh)
- **Deployment:** Vercel (automatic CI/CD)

---

## 🏗 System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│  (Chrome, Firefox, Safari, Edge - Desktop & Mobile)         │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTPS
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                    Vercel CDN (Edge Network)                 │
│  • SSL/TLS Termination                                       │
│  • Static Asset Caching                                      │
│  • Image Optimization                                        │
│  • Automatic Gzip/Brotli Compression                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│               Next.js Application (Vercel)                   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Pages Router (Server-Side)                  │  │
│  │  • SSR (Server-Side Rendering)                       │  │
│  │  • API Routes (/api/auth/[...nextauth])              │  │
│  │  • Dynamic Routing                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│  ┌──────────────────────┴───────────────────────────────┐  │
│  │              React Component Tree                     │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────────┐│  │
│  │  │         Provider Layer (_app.tsx)              ││  │
│  │  │  • SessionProvider (NextAuth)                   ││  │
│  │  │  • QueryClientProvider (React Query)            ││  │
│  │  │  • HeroUIProvider (UI Components)               ││  │
│  │  │  • NextThemesProvider (Dark Mode)               ││  │
│  │  │  • ToasterProvider (Notifications)              ││  │
│  │  └─────────────────────────────────────────────────┘│  │
│  │                         │                            │  │
│  │  ┌──────────────────────┴──────────────────────────┐│  │
│  │  │            Layout Components                    ││  │
│  │  │  • DashboardLayout (HR/Vendor)                  ││  │
│  │  │  • AuthLayout (Login/Register)                  ││  │
│  │  │  • Navbar, Sidebar, Footer                      ││  │
│  │  └─────────────────────────────────────────────────┘│  │
│  │                         │                            │  │
│  │  ┌──────────────────────┴──────────────────────────┐│  │
│  │  │              View Components                    ││  │
│  │  │  • HRDashboard (Event management)               ││  │
│  │  │  • VendorDashboard (Event approval)             ││  │
│  │  │  • Login/Register views                         ││  │
│  │  └─────────────────────────────────────────────────┘│  │
│  │                         │                            │  │
│  │  ┌──────────────────────┴──────────────────────────┐│  │
│  │  │               UI Components                     ││  │
│  │  │  • EventCard, EventTable                        ││  │
│  │  │  • Modals (Create, Approve, Reject)             ││  │
│  │  │  • FilterTabs, Navbar, Sidebar                  ││  │
│  │  └─────────────────────────────────────────────────┘│  │
│  │                         │                            │  │
│  │  ┌──────────────────────┴──────────────────────────┐│  │
│  │  │           Custom Hooks Layer                    ││  │
│  │  │  • useHR() - HR dashboard logic                 ││  │
│  │  │  • useVendor() - Vendor dashboard logic         ││  │
│  │  │  • useLogin() - Authentication logic            ││  │
│  │  └─────────────────────────────────────────────────┘│  │
│  │                         │                            │  │
│  │  ┌──────────────────────┴──────────────────────────┐│  │
│  │  │            Services Layer                       ││  │
│  │  │  • authServices - Authentication API            ││  │
│  │  │  • eventServices - Event management API         ││  │
│  │  │  • vendorServices - Vendor management API       ││  │
│  │  └─────────────────────────────────────────────────┘│  │
│  │                         │                            │  │
│  │  ┌──────────────────────┴──────────────────────────┐│  │
│  │  │            Axios Instance                       ││  │
│  │  │  • Request interceptor (add JWT token)          ││  │
│  │  │  • Response interceptor (handle 401 errors)     ││  │
│  │  │  • Base URL configuration                       ││  │
│  │  └─────────────────────────────────────────────────┘│  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTPS REST API
                     ↓
┌─────────────────────────────────────────────────────────────┐
│            Backend API (api.devsatchel.com)                  │
│  • Node.js + Express + MongoDB                               │
│  • JWT Authentication                                        │
│  • RESTful Endpoints                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
frontend/
├── pages/                          # Next.js Pages Router
│   ├── _app.tsx                    # App wrapper (providers)
│   ├── _document.tsx               # HTML document structure
│   ├── index.tsx                   # Home/landing page
│   │
│   ├── api/                        # API routes (server-side)
│   │   └── auth/
│   │       └── [...nextauth].ts    # NextAuth configuration
│   │
│   ├── auth/                       # Authentication pages
│   │   ├── login/
│   │   │   └── index.tsx           # Login page
│   │   └── register/
│   │       └── index.tsx           # Registration page
│   │
│   ├── dashboard/                  # Vendor dashboard
│   │   └── index.tsx               # Vendor dashboard page
│   │
│   └── hr/                         # HR pages
│       └── dashboard/
│           └── index.tsx           # HR dashboard page
│
├── components/                     # React components
│   ├── icons/
│   │   └── index.tsx               # SVG icon components
│   │
│   ├── layouts/
│   │   ├── head.tsx                # SEO head component
│   │   ├── AuthLayout/             # Layout for login/register
│   │   │   ├── AuthLayout.tsx
│   │   │   └── index.tsx
│   │   └── DashboardLayout/        # Layout for dashboards
│   │       ├── DashboardLayout.tsx
│   │       ├── DashboardLayout.constants.tsx
│   │       └── index.tsx
│   │
│   ├── ui/                         # Reusable UI components
│   │   ├── theme-switch.tsx        # Dark/light mode toggle
│   │   ├── Banner/                 # Banner component
│   │   ├── Card/
│   │   │   └── EventCard/          # Event display card
│   │   ├── FilterTabs/             # Status filter tabs
│   │   ├── Modal/
│   │   │   ├── HR/                 # HR-specific modals
│   │   │   │   ├── CreateEventModal/       # Create event modal
│   │   │   │   ├── EventDetailModal/       # View event details
│   │   │   │   └── ApproveVendorDatesModal/ # Approve vendor dates
│   │   │   └── Vendor/             # Vendor-specific modals
│   │   │       ├── ApproveEventModal/      # Approve event modal
│   │   │       ├── ProposeNewDatesModal/   # Propose dates modal
│   │   │       └── RejectEventModal/       # Reject event modal
│   │   ├── Navbar/                 # Top navigation bar
│   │   ├── Sidebar/                # Side navigation
│   │   ├── Table/
│   │   │   └── EventTable/         # Event list table
│   │   └── Toaster/                # Toast notification
│   │
│   └── views/                      # Page-level view components
│       ├── HRDashboard/
│       │   ├── HRDashboard.tsx     # HR dashboard UI
│       │   ├── useHR.tsx           # HR dashboard logic
│       │   └── index.tsx
│       ├── VendorDashboard/
│       │   ├── VendorDashboard.tsx # Vendor dashboard UI
│       │   ├── useVendor.tsx       # Vendor dashboard logic
│       │   └── index.tsx
│       ├── Login/
│       │   ├── Login.tsx           # Login UI
│       │   ├── useLogin.tsx        # Login logic
│       │   └── index.tsx
│       └── Register/
│           ├── Register.tsx        # Registration UI
│           ├── useRegister.tsx     # Registration logic
│           └── index.tsx
│
├── services/                       # API service layer
│   ├── auth.service.ts             # Authentication API calls
│   ├── event.service.ts            # Event API calls
│   ├── vendor.service.ts           # Vendor API calls
│   └── endpoint.constant.ts        # API endpoint constants
│
├── libs/                           # Third-party library configs
│   └── axios/
│       ├── instance.ts             # Axios instance with interceptors
│       └── responseHandler.ts      # API response utilities
│
├── contexts/                       # React Context providers
│   └── ToasterContext.tsx          # Toast notification context
│
├── types/                          # TypeScript type definitions
│   ├── index.ts                    # Export all types
│   ├── Auth.ts                     # Authentication types
│   ├── Event.ts                    # Event types
│   └── Vendor.ts                   # Vendor types
│
├── utils/                          # Utility functions
│   ├── cn.ts                       # Class name utility (clsx)
│   ├── category.ts                 # Category helper functions
│   ├── date.ts                     # Date formatting utilities
│   └── labels.ts                   # Label mapping utilities
│
├── config/                         # Configuration files
│   ├── environment.ts              # Environment variables
│   ├── fonts.ts                    # Font configuration
│   └── site.ts                     # Site metadata
│
├── styles/
│   └── globals.css                 # Global CSS + Tailwind imports
│
├── middleware.ts                   # Next.js middleware (auth, etc.)
├── public/                         # Static assets
│   └── favicon.ico                 # Favicon only
│
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
├── next.config.js                  # Next.js configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── eslint.config.mjs               # ESLint configuration
├── .env                            # Environment variables (local)
└── README.md                       # Project documentation
```

---

## 🧩 Core Components

### 1. **Pages (Next.js Router)**

#### App Wrapper (`_app.tsx`)

Central configuration point with provider hierarchy:

```tsx
<SessionProvider>
  {" "}
  {/* NextAuth session management */}
  <QueryClientProvider>
    {" "}
    {/* React Query cache & state */}
    <HeroUIProvider>
      {" "}
      {/* UI component system */}
      <NextThemesProvider>
        {" "}
        {/* Dark/light mode */}
        <ToasterProvider>
          {" "}
          {/* Toast notifications */}
          <Component /> {/* Actual page */}
        </ToasterProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  </QueryClientProvider>
</SessionProvider>
```

#### Page Components

- **`pages/hr/dashboard/index.tsx`** - HR dashboard page
- **`pages/dashboard/index.tsx`** - Vendor dashboard page
- **`pages/auth/login/index.tsx`** - Login page
- **`pages/auth/register/index.tsx`** - Registration page

### 2. **View Components**

View components contain the main UI logic and use custom hooks for state management.

#### HR Dashboard View

```tsx
// components/views/HRDashboard/HRDashboard.tsx
const HRDashboard = () => {
  const {
    filteredEvents,
    isLoading,
    handleViewEvent,
    handleCreateEvent,
    // ... more state & handlers from useHR()
  } = useHR();

  return (
    <div>
      <FilterTabs statusCounts={...} />
      <EventCardGrid events={filteredEvents} />
      <CreateEventModal />
    </div>
  );
};
```

#### Vendor Dashboard View

```tsx
// components/views/VendorDashboard/VendorDashboard.tsx
const VendorDashboard = () => {
  const {
    filteredEvents,
    isLoading,
    handleApprove,
    handleReject,
    // ... more state & handlers from useVendor()
  } = useVendor();

  return (
    <div>
      <FilterTabs statusCounts={...} />
      <EventCardGrid events={filteredEvents} />
      <ApproveEventModal />
      <ProposeNewDatesModal />
      <RejectEventModal />
    </div>
  );
};
```

### 3. **Custom Hooks**

Custom hooks encapsulate business logic and API calls, keeping components clean.

#### useHR Hook

```tsx
const useHR = () => {
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch events with React Query
  const {
    data: eventsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await eventServices.getEvents();
      return response.data.data;
    },
  });

  // Create event mutation
  const createEventMutation = useMutation({
    mutationFn: (data) => eventServices.createEvent(data),
    onSuccess: () => {
      setToaster({ type: "success", message: "Event created!" });
      refetch();
    },
  });

  return {
    events: eventsData?.events || [],
    isLoading,
    selectedEvent,
    handleCreateEvent: createEventMutation.mutate,
    // ... more methods
  };
};
```

### 4. **Service Layer**

Services abstract API calls and provide a clean interface for data fetching.

```tsx
// services/event.service.ts
import axiosInstance from "@/libs/axios/instance";

class EventService {
  async getEvents() {
    return await axiosInstance.get("/events");
  }

  async createEvent(data: ICreateEventDTO) {
    return await axiosInstance.post("/events", data);
  }

  async approveEvent(id: string, data: IApproveEventDTO) {
    return await axiosInstance.put(`/events/${id}/approve`, data);
  }

  async rejectEvent(id: string, data: IRejectEventDTO) {
    return await axiosInstance.put(`/events/${id}/reject`, data);
  }

  async deleteEvent(id: string) {
    return await axiosInstance.delete(`/events/${id}`);
  }
}

export default new EventService();
```

### 5. **UI Components**

Reusable, presentational components built with HeroUI and Tailwind CSS.

#### Event Card

```tsx
const EventCard = ({ event, onView, onApprove, onReject }) => {
  return (
    <Card>
      <CardHeader>
        <h3>{event.title}</h3>
        <Badge status={event.status} />
      </CardHeader>
      <CardBody>
        <p>{event.description}</p>
        <p>Location: {event.location}</p>
        <p>Category: {getCategoryLabel(event.category)}</p>
      </CardBody>
      <CardFooter>
        <Button onPress={() => onView(event)}>View Details</Button>
        {canApprove && (
          <Button onPress={() => onApprove(event)}>Approve</Button>
        )}
        {canReject && <Button onPress={() => onReject(event)}>Reject</Button>}
      </CardFooter>
    </Card>
  );
};
```

### 6. **Layouts**

Layouts provide consistent page structure with navigation and styling.

```tsx
// components/layouts/DashboardLayout/DashboardLayout.tsx
const DashboardLayout = ({ children, title, type }) => {
  return (
    <div className="flex h-screen">
      <Sidebar type={type} />
      <div className="flex-1 flex flex-col">
        <Navbar title={title} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};
```

---

## 🔄 State Management

### 1. **Server State (React Query)**

React Query manages all server data fetching, caching, and synchronization.

```tsx
// Query configuration in _app.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true, // Refetch on window focus
      retry: false, // Don't retry failed requests
      staleTime: 0, // Data always considered stale
    },
  },
});
```

**Benefits:**

- Automatic background refetching
- Caching & deduplication
- Optimistic updates
- Loading & error states
- Pagination support

### 2. **Client State (React Hooks)**

Local component state managed with `useState` and `useReducer`.

```tsx
// Modal open/close state
const [isModalOpen, setIsModalOpen] = useState(false);

// Selected event
const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

// Filter state
const [statusFilter, setStatusFilter] = useState<string | null>("ALL");
```

### 3. **Authentication State (NextAuth)**

Session state managed by NextAuth with automatic token refresh.

```tsx
// Get session in component
const { data: session, status } = useSession();

// Access user data
const user = session?.user;
const accessToken = session?.accessToken;

// Sign out
await signOut({ redirect: false });
```

### 4. **Global State (React Context)**

Used for cross-cutting concerns like notifications.

```tsx
// contexts/ToasterContext.tsx
const ToasterContext = createContext({
  toaster: null,
  setToaster: (toast: ToastConfig) => {},
});

// Usage in components
const { setToaster } = useContext(ToasterContext);
setToaster({ type: "success", message: "Event created!" });
```

---

## 🗺 Routing & Navigation

### Page Routes

| Route            | Component                       | Access             | Description                          |
| ---------------- | ------------------------------- | ------------------ | ------------------------------------ |
| `/`              | `pages/index.tsx`               | Public             | Landing page / Redirect to dashboard |
| `/auth/login`    | `pages/auth/login/index.tsx`    | Public             | Login page                           |
| `/auth/register` | `pages/auth/register/index.tsx` | Public             | Registration page                    |
| `/dashboard`     | `pages/dashboard/index.tsx`     | Protected (Vendor) | Vendor dashboard                     |
| `/hr/dashboard`  | `pages/hr/dashboard/index.tsx`  | Protected (HR)     | HR dashboard                         |

### API Routes

| Route                     | Handler  | Description                                     |
| ------------------------- | -------- | ----------------------------------------------- |
| `/api/auth/[...nextauth]` | NextAuth | Authentication endpoints (login, session, etc.) |


### JWT Token Management

```tsx
// Axios request interceptor adds token automatically
instance.interceptors.request.use(async (request) => {
  const session = await getSession();

  if (session?.accessToken) {
    request.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return request;
});

// Response interceptor handles 401 errors
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await signOut({ redirect: false });
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);
```

---

## 🌐 API Integration

### Axios Instance Configuration

```tsx
// libs/axios/instance.ts
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // https://api.devsatchel.com/api
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, // 60 seconds
});
```

### Service Layer Pattern

```tsx
// services/event.service.ts
class EventService {
  private readonly BASE_PATH = "/events";

  async getEvents(): Promise<AxiosResponse<IEventsResponse>> {
    return await axiosInstance.get(this.BASE_PATH);
  }

  async getEventById(id: string): Promise<AxiosResponse<IEventResponse>> {
    return await axiosInstance.get(`${this.BASE_PATH}/${id}`);
  }

  async createEvent(
    data: ICreateEventDTO
  ): Promise<AxiosResponse<IEventResponse>> {
    return await axiosInstance.post(this.BASE_PATH, data);
  }

  async approveEvent(
    id: string,
    data: IApproveEventDTO
  ): Promise<AxiosResponse<IEventResponse>> {
    return await axiosInstance.put(`${this.BASE_PATH}/${id}/approve`, data);
  }

  async rejectEvent(
    id: string,
    data: IRejectEventDTO
  ): Promise<AxiosResponse<IEventResponse>> {
    return await axiosInstance.put(`${this.BASE_PATH}/${id}/reject`, data);
  }

  async deleteEvent(id: string): Promise<AxiosResponse> {
    return await axiosInstance.delete(`${this.BASE_PATH}/${id}`);
  }
}

export default new EventService();
```

### React Query Integration

```tsx
// Using service in component with React Query
const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await eventServices.getEvents();
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Mutation example
const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateEventDTO) => eventServices.createEvent(data),
    onSuccess: () => {
      // Invalidate and refetch events
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
```

---

## 🎨 UI/UX Architecture

### Design System

#### Component Library: HeroUI

- Modern React UI library based on NextUI
- Fully typed with TypeScript
- Built-in dark mode support
- Accessible (ARIA compliant)
- Framer Motion animations

#### Styling: Tailwind CSS

- Utility-first CSS framework
- Custom configuration in `tailwind.config.js`
- Dark mode via `class` strategy

---

### Environment Variables

```env
NEXT_PUBLIC_API_URL=https://api.devsatchel.com/api
NEXTAUTH_URL=https://wellness-event-app.vercel.app
NEXTAUTH_SECRET=<strong-random-secret>
```

## 🔧 Development Workflow

### Local Setup

```bash
# 1. Install dependencies
cd frontend
npm install

# 2. Setup environment variables
cp .env.example .env
# Edit .env:
# NEXT_PUBLIC_API_URL=http://localhost:3001/api
# NEXTAUTH_URL=http://localhost:3000
# NEXTAUTH_SECRET=your-secret-key

# 3. Run development server
npm run dev
# Opens at http://localhost:3000

# 4. Access in browser
open http://localhost:3000
```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack (fast refresh)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint with auto-fix
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
```

### Code Quality Tools

```bash
# ESLint configuration
# - TypeScript ESLint
# - React hooks rules
# - Import sorting
# - Unused imports detection

# Prettier configuration
# - Consistent formatting
# - Trailing commas
# - Single quotes
# - Tab width: 2 spaces
```

---
