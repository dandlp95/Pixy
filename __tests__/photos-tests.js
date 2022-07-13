import request from 'supertest';
import photosRoute from '../routes/photos';

describe('GET /photos', () => {
   describe('Get all photos', () => {
      test('Should have 200 response code', async () => {
         const response = await request(photosRoute).get('/');
         expect(response.statusCode).toBe(200);
      });
   });

   describe('Get one photo', () => {
      test('Should have 200 response code', async () => {
         const response = await request(photosRoute).get('/:id');
         expect(response.statusCode).toBe(200);
      });
   });
});
