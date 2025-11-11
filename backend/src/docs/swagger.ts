import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v0.0.1",
    title: "Wellness Event Management API",
    description: "API Documentation for Wellness Event Management System",
  },
  servers: [
    {
      url: "http://localhost:3001/api",
      description: "Local Server",
    },
    {
      url: "https://wellness-event-app-api.vercel.app/api",
      description: "Production Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      LoginRequest: {
        email: "hr@example.com",
        password: "Password123!",
      },
      RegisterRequest: {
        email: "vendor@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
        companyName: "ABC Wellness Company",
        role: "VENDOR",
      },
      CreateEventRequest: {
        title: "Mental Health Workshop",
        description: "A comprehensive workshop on mental health awareness",
        category: 1,
        proposedDates: ["2025-12-01T10:00:00Z", "2025-12-02T10:00:00Z"],
        location: "Conference Room A",
        duration: "2 hours",
        audience: "All employees",
        assignedVendorId: "vendor object id",
      },
      ApproveEventRequest: {
        confirmedDate: "2025-12-01T10:00:00Z",
        proposedDates: ["2025-12-01T10:00:00Z", "2025-12-02T10:00:00Z"],
      },
      RejectEventRequest: {
        rejectionReason: "The proposed dates do not work for our schedule",
      },
    },
  },
};

const outputFile = "./src/docs/swagger_output.json";
const endpointsFiles = ["./src/routes/index.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
