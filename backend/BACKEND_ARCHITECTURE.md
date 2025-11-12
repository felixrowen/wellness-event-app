# Backend System Architecture

## 🎯 Overview

The Wellness Event Management Backend is a RESTful API service built with Node.js, Express, and TypeScript. It's a platform to manage wellness events between HR administrators and wellness vendors.

### Key Features

- **User Authentication & Authorization** (JWT-based)
- **Role-Based Access Control (RBAC)** (HR & Vendor roles)
- **Event Management** (CRUD operations with status workflow)
- **Vendor Management** (HR can manage vendors)
- **Real-time Event Status Updates** (Automated background jobs)
- **API Documentation** (Swagger/OpenAPI)

---

## 🛠 Technology Stack

### Core Technologies

- **Runtime:** Node.js v20.x
- **Framework:** Express.js v5.1.0
- **Language:** TypeScript v5.9.3
- **Database:** MongoDB (via MongoDB Atlas)
- **ODM:** Mongoose v8.19.3

### Key Libraries

| Library              | Version | Purpose                    |
| -------------------- | ------- | -------------------------- |
| `jsonwebtoken`       | 9.0.2   | JWT authentication         |
| `bcryptjs`           | -       | Password hashing           |
| `yup`                | 1.7.1   | Request validation         |
| `cors`               | 2.8.5   | Cross-origin requests      |
| `body-parser`        | 2.2.0   | Request body parsing       |
| `swagger-ui-express` | 5.0.1   | API documentation          |
| `swagger-autogen`    | 2.23.7  | Auto-generate Swagger docs |

### Development Tools

- **Dev Server:** ts-node-dev (hot reload)
- **Code Quality:** ESLint + Prettier
- **Type Checking:** TypeScript compiler

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── index.ts                    # Application entry point
│   │
│   ├── config/
│   │   └── index.ts                # Environment configuration
│   │
│   ├── constants/
│   │   ├── index.ts                # Export all constants
│   │   ├── roles.ts                # User roles (HR, VENDOR)
│   │   └── events.ts               # Event categories & statuses
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts      # Authentication endpoints
│   │   ├── event.controller.ts     # Event management endpoints
│   │   └── vendor.controller.ts    # Vendor management endpoints
│   │
│   ├── database/
│   │   └── connection.ts           # MongoDB connection setup
│   │
│   ├── docs/
│   │   ├── swagger.ts              # Swagger configuration
│   │   └── swagger_output.json     # Auto-generated Swagger spec
│   │
│   ├── middlewares/
│   │   ├── index.ts                # Export all middlewares
│   │   ├── auth.middleware.ts      # JWT authentication
│   │   ├── acl.middleware.ts       # Access control (RBAC)
│   │   ├── validation.middleware.ts # Request validation
│   │   └── errorHandler.middleware.ts # Global error handler
│   │
│   ├── models/
│   │   ├── user.model.ts           # User schema (HR & Vendor)
│   │   └── event.model.ts          # Event schema
│   │
│   ├── repositories/
│   │   ├── user.repository.ts      # User database operations
│   │   └── event.repository.ts     # Event database operations
│   │
│   ├── routes/
│   │   ├── index.ts                # Main router
│   │   ├── auth.routes.ts          # Auth routes
│   │   ├── event.routes.ts         # Event routes
│   │   └── vendor.routes.ts        # Vendor routes
│   │
│   ├── services/
│   │   ├── auth.service.ts         # Authentication business logic
│   │   ├── event.service.ts        # Event business logic
│   │   └── vendor.service.ts       # Vendor business logic
│   │
│   ├── types/
│   │   ├── index.ts                # Export all types
│   │   ├── auth.types.ts           # Authentication types
│   │   ├── event.types.ts          # Event types
│   │   └── vendor.types.ts         # Vendor types
│   │
│   ├── utils/
│   │   ├── encryption.util.ts      # Password hashing
│   │   ├── jwt.util.ts             # JWT token operations
│   │   ├── response.util.ts        # Standardized API responses
│   │   └── swagger.util.ts         # Swagger setup utility
│   │
│   └── validators/
│       ├── auth.validator.ts       # Auth request validators
│       └── event.validator.ts      # Event request validators
│
├── dist/                           # Compiled JavaScript (build output)
├── logs/                           # Application logs (PM2)
├── nginx.conf                      # Nginx reverse proxy config
├── ecosystem.config.js             # PM2 process configuration
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
├── vercel.json                     # Vercel deployment config (legacy)
├── .env                            # Environment variables
└── .env.example                    # Environment variables template
```

---

## 🧩 Core Components

### 1. **Controllers**

Handle HTTP requests and responses, delegate business logic to services.


### 2. **Services**

Contain business logic and orchestrate repository operations.


### 3. **Repositories**

Abstract database operations, provide clean data access layer.



### 4. **Middlewares**

#### Authentication Middleware

```typescript
export const authenticate = (
  req: IReqUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const decoded = jwt.verify(token, config.secret);
  req.user = decoded;
  next();
};
```

#### ACL (Access Control) Middleware

```typescript
export const restrictTo = (...roles: string[]) => {
  return (req: IReqUser, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
```

#### Validation Middleware

```typescript
export const validate = (schema: AnySchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body);
      next();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
};
```

### 5. **Models**

#### User Model

```typescript
interface IUser {
  _id: ObjectId;
  email: string;
  password: string; // Hashed
  companyName: string;
  role: "HR" | "VENDOR";
  createdAt: Date;
  updatedAt: Date;
}
```

#### Event Model

```typescript
interface IEvent {
  _id: ObjectId;
  title: string;
  description: string;
  category: EVENT_CATEGORY;
  status: EventStatus; // PENDING, APPROVED, REJECTED, etc.
  proposedDates: Date[];
  confirmedDate?: Date;
  location: string;
  duration: string;
  audience: string;
  companyInfo: ObjectId; // HR user who created
  assignedVendorId: ObjectId; // Assigned vendor
  approvedVendorId?: ObjectId; // Vendor who approved
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🔄 Data Flow

### Example: Event Creation Flow

```
1. Client Request
   POST /api/events
   Headers: { Authorization: "Bearer <JWT>" }
   Body: { title, description, category, proposedDates, ... }

2. Nginx Reverse Proxy
   → Forwards to Express (localhost:3001)

3. Express Middleware Chain
   → CORS check
   → Body parsing
   → authenticate() middleware → Verify JWT
   → restrictTo("HR") → Check user role
   → validate(createEventValidator) → Validate request body

4. Route Handler
   → eventRoutes: POST /events
   → Calls EventController.createEvent()

5. Controller
   → Extracts user ID from req.user
   → Calls EventService.createEvent(data, userId)

6. Service (Business Logic)
   → Determines initial status based on proposedDates
   → Calls EventRepository.create()

7. Repository
   → Calls EventModel.create() (Mongoose)
   → Saves to MongoDB

8. Response Flow (reversed)
   Repository → Service → Controller → Route → Express → Nginx → Client

9. Client Response
   Status: 201 Created
   Body: {
     success: true,
     data: { event },
     message: "Event created successfully"
   }
```

---

## 🌐 API Architecture

### Base URL

- **Production:** `https://api.devsatchel.com/api`
- **Local:** `http://localhost:3001/api`

### API Endpoints

#### Authentication Routes (`/api/auth`)

| Method | Endpoint    | Access    | Description                   |
| ------ | ----------- | --------- | ----------------------------- |
| POST   | `/register` | Public    | Register new user (HR/Vendor) |
| POST   | `/login`    | Public    | Login and get JWT token       |
| GET    | `/me`       | Protected | Get current user profile      |

#### Event Routes (`/api/events`)

| Method | Endpoint       | Access      | Description                       |
| ------ | -------------- | ----------- | --------------------------------- |
| GET    | `/`            | Protected   | Get all events (filtered by role) |
| GET    | `/:id`         | Protected   | Get single event by ID            |
| POST   | `/`            | HR Only     | Create new event                  |
| PUT    | `/:id/approve` | Vendor Only | Approve event (or propose dates)  |
| PUT    | `/:id/reject`  | Vendor/HR   | Reject event                      |
| DELETE | `/:id`         | HR Only     | Cancel/delete event               |

#### Vendor Routes (`/api/vendors`)

| Method | Endpoint | Access    | Description      |
| ------ | -------- | --------- | ---------------- |
| GET    | `/`      | HR Only   | Get all vendors  |
| GET    | `/:id`   | Protected | Get vendor by ID |

#### Utility Routes

| Method | Endpoint    | Access | Description           |
| ------ | ----------- | ------ | --------------------- |
| GET    | `/health`   | Public | Health check endpoint |
| GET    | `/api-docs` | Public | Swagger documentation |

### Response Format

#### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

#### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

---

## 🔒 Security Architecture

### 1. **Authentication**

- **JWT (JSON Web Tokens)** for stateless authentication
- Tokens expire after 24 hours
- Secret key stored in environment variables

### 2. **Password Security**

- Passwords hashed using bcrypt
- Salt rounds: 10
- Never stored in plain text

### 3. **Authorization (RBAC)**

- Two roles: `HR` and `VENDOR`
- Access control enforced via middleware
- Resource-level permissions

### 4. **CORS Configuration**

- Allows all origins in current setup (`origin: "*"`)
- Configurable for specific domains in production
- Handles preflight requests

### 5. **Input Validation**

- Yup schemas for all request bodies
- Prevents injection attacks
- Type safety with TypeScript

### 6. **Environment Variables**

- Sensitive data (DB connection, JWT secret) in `.env`
- Never committed to version control

### 7. **HTTPS/SSL**

- Nginx handles SSL termination
- Let's Encrypt certificates
- HTTP automatically redirects to HTTPS

---

## 🗄 Database Schema

### Collections

#### Users Collection

```javascript
{
  _id: ObjectId,
  email: "hr@company.com",
  password: "$2b$10$...",  // Hashed
  companyName: "ABC Corp",
  role: "HR",  // or "VENDOR"
  createdAt: ISODate,
  updatedAt: ISODate
}
```

**Indexes:**

- `email` (unique)
- `role`

#### Events Collection

```javascript
{
  _id: ObjectId,
  title: "Mental Health Workshop",
  description: "...",
  category: 2,  // MENTAL_WELLNESS
  status: "PENDING",
  proposedDates: [ISODate, ISODate],
  confirmedDate: ISODate,
  location: "Conference Room A",
  duration: "2 hours",
  audience: "All employees",
  companyInfo: ObjectId,      // ref: Users (HR)
  assignedVendorId: ObjectId, // ref: Users (Vendor)
  approvedVendorId: ObjectId, // ref: Users (Vendor)
  rejectionReason: null,
  createdAt: ISODate,
  updatedAt: ISODate
}
```

**Indexes:**

- `companyInfo`
- `assignedVendorId`
- `status`
- `confirmedDate`

### Event Status Workflow

```
                    ┌─────────────────────────┐
                    │  AWAITING_VENDOR_      │
                    │     PROPOSAL           │
                    └───────────┬─────────────┘
                                │ Vendor proposes dates
                                ↓
┌─────────────┐         ┌──────────────┐
│   PENDING   │ ←──────│  AWAITING_HR  │
└──────┬──────┘         │   APPROVAL    │
       │                └───────┬───────┘
       │ Vendor approves        │ HR approves
       │ with confirmedDate     │ vendor's dates
       ↓                        ↓
┌─────────────┐         ┌──────────────┐
│  APPROVED   │─────────│   APPROVED   │
└──────┬──────┘         └──────┬───────┘
       │                       │
       │ Event date passes     │
       ↓                       ↓
┌─────────────┐         ┌──────────────┐
│  COMPLETE   │         │   COMPLETE   │
└─────────────┘         └──────────────┘

       │                       │
       │ All dates expired     │
       ↓                       ↓
┌─────────────┐         ┌──────────────┐
│   EXPIRED   │         │   REJECTED   │
└─────────────┘         └──────────────┘
```

---


### Environment Configuration

#### Development

```env
NODE_ENV=development
PORT=3001
DATABASE_URL
SECRET=dev-secret-key
```

## 🔧 Development Workflow

### Local Setup

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your MongoDB connection string

# Run development server (hot reload)
npm run dev

# Generate Swagger docs
npm run swagger

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

### Code Quality

```bash
# Run all checks
npm run check-all

# Format code
npm run format

# Fix linting issues
npm run lint:fix
```

---
