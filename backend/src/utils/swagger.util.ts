import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger_output.json";

export const swaggerOptions: swaggerUi.SwaggerUiOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Wellness Event API Documentation",
  swaggerOptions: {
    persistAuthorization: true,
  },
};

export const setupSwagger = () => {
  return {
    serve: swaggerUi.serve,
    setup: swaggerUi.setup(swaggerDocument, swaggerOptions),
  };
};
