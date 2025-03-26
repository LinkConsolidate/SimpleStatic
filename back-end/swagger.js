const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Picture Collection API',
      version: '1.0.0',
      description: 'API documentation for managing a picture collection',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./services/router.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };