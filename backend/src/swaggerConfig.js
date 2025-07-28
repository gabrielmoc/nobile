const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Nobile",
      version: "1.0.0",
      description: "Documentação dos endpoints da API do projeto Nobile",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Caminho dos arquivos de rota
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
