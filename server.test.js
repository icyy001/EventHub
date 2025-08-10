const request = require('supertest');
const app = require('./server');

describe('EventHub API', () => {
  test('GET /api/places should return array and correct content-type', async () => {
    const res = await request(app).get('/api/places');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/events should return array and correct content-type', async () => {
    const res = await request(app).get('/api/events');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/places/1 should return valid place with events', async () => {
    const res = await request(app).get('/api/places/1');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('events');
  });

  test('GET /api/events/101 should return valid event with place info', async () => {
    const res = await request(app).get('/api/events/101');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toHaveProperty('id', 101);
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('place');
  });

  test('POST /api/places with missing field should return 400', async () => {
    const res = await request(app).post('/api/places').send({ name: 'Test Only' });
    expect(res.statusCode).toBe(400);
    expect(res.headers['content-type']).toMatch(/application\/json/);
  });

  test('POST /api/events with bad placeId should return 400', async () => {
    const res = await request(app).post('/api/events').send({ title: 'Bad Test', placeId: 999 });
    expect(res.statusCode).toBe(400);
    expect(res.headers['content-type']).toMatch(/application\/json/);
  });
});
