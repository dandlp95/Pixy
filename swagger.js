const swaggerAutogen = require('swagger-autogen')();

const doc = {
   info: {
      title: 'Pixy',
      description: 'A place where photographers can share their work, which users can access and download for free.',
      version: '1.0.0',
   },
   host: 'localhost:3000',
   basePath: '/',
   schemes: ['http'],
   tags: [
      {
         name: 'Users',
         description: 'Operations for users',
      },
      {
         name: 'Albums',
         description: 'Operations for albums',
      },
      {
         name: 'Clips',
         description: 'Operations for clips',
      },
      {
         name: 'Photos',
         description: 'Operations for photos',
      },      
      {
         name: 'Other',
         description: 'Operations for other endpoints',
      },
   ],
   definitions: {
      User: {
         firstName: "User's First Name",
         lastName: "User's Last Name",
         email: "usersemail@email.com",
         password: "User's Password",
      },
      Users:[{$ref: "#/definitions/User"}],
      Media: {
         name: "Media's Name",
         description: "Media's Description",
         encodedMedia: "Encoded Media",
         location: "Media's Location",
         user: "User's name who created the media",
         cameraUsed: "Camera Type",
         tags: [ "tagOne", "tagTwo" ]
      },
      Medias:[{ $ref: "#/definitions/Media" }],
      Album: {
         name: "Album's Name",
         photos: [{ $ref: "#/definitions/Medias" }],
         user: "Owner of the Album",
         tags: [ "tagOne", "tagTwo" ]
      },
      Albums:[{ $ref: "#/definitions/Album" }],
   }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

//swaggerAutogen(outputFile, endpointsFiles, doc);

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
   require('./server.js'); // Your project's root file
});
