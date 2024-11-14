import swaggerJsDoc from "swagger-jsdoc";


const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Short Url api with express",
      version: "1.0.0",
    },
  },
  apis: ["./src/**/*.ts"],
};

export default options;
