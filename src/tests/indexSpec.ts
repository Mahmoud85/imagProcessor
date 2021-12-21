import supertest from 'supertest';
import app from '../index';
import { getResizedImage } from '../utilities/imageProcessing';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('get api response for resized image', async () => {
    const response = await request.get('/api/images?filename=fjord&height=300&width=320');
    expect(response.status).toBe(200);
  });

  it('should return 404 for invalid endpoint', async () => {
    const response = await request.get('/api/images?filename=invalid&width=200&height=200');
    expect(response.status).toBe(404);
  });
});

describe('Test image processing utility', () => {
  it('get resized image', async () => {
    const image = await getResizedImage('fjord', '200', '200');
    expect(image).toBeTruthy();
  });
});
