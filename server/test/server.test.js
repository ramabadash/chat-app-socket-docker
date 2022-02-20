const request = require('supertest');
// My app
// import { http } from '../server'; // server
const http = require('../build/server').http;
// import { USERS } from '../db/users'; // USERS db
const USERS = require('../build/db/users').default;
// Mock data
const userMockData = { username: 'test-user', password: 'test12345' };

describe('Login & Register', () => {
  /* ----- REGISTER -----*/
  describe('Register', () => {
    // OK
    test('Should register with valid data and get 200 ok', async () => {
      const response = await request(http).post('/users/register').send(userMockData);
      expect(response.statusCode).toBe(201);
      const thisUser = USERS.find(user => user.name === userMockData.username);
      expect(thisUser).toBeDefined();
    });
    // Bad details
    test('Should throw 400 bad request with missing username or password', async () => {
      const response = await request(http)
        .post('/users/register')
        .send({ username: 'test-user2', password: '' });
      expect(response.statusCode).toBe(400);
      const thisUser = USERS.find(user => user.name === 'test-user2');
      expect(thisUser).toBeUndefined();
    });
  });
});

describe('Socket testing', () => {
  let io, serverSocket, clientSocket;
