const swaggerAutogen = require('swagger-autogen')();

const doc = {
   info: {
      title: 'Pixy',
      description: 'A place where photographers can share their work, which users can access and download for free.',
      version: '1.0.0',
   },
   host: 'http://localhost:3000/',
   basePath: '/',
   schemes: ['http'],
   tags: [
      {
         name: 'user',
         description: 'Operations for users',
      },
      {
         name: 'albums',
         description: 'Operations for albums',
      },
      {
         name: 'clips',
         description: 'Operations for clips',
      },
      {
         name: 'photos',
         description: 'Operations for photos',
      },
   ],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

//swaggerAutogen(outputFile, endpointsFiles, doc);

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
   require('./server.js'); // Your project's root file
});
