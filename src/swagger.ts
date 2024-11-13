import swaggerJsDoc from "swagger-jsdoc";
import swagger from "swagger-ui-express";

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Short Url api with express",
      version: "1.0.0",
    },
  },
};