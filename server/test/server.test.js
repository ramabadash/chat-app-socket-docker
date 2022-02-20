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
  /* ----- LOGIN -----*/
  describe('Login', () => {
    //OK
    test('Should login with valid data and get 200 ok and accessToken as cookies', async () => {
      const response = await request(http).post('/users/login').send(userMockData);
      expect(response.statusCode).toBe(200);
      expect(response.headers['set-cookie'][0]).toMatch(/accessToken=\w+.\w+.\w+/);
      expect(response.text).toBe(userMockData.username);
    });
    //Bad details
    test('Should throw 400 bad request with wrong username or password', async () => {
      const response = await request(http)
        .post('/users/login')
        .send({ username: 'test-user', password: 'test12' });
      expect(response.statusCode).toBe(400);
    });
  });
});

describe('Socket testing', () => {
  let io, serverSocket, clientSocket;
