const Client = require('socket.io-client'); // Socket client
const request = require('supertest'); // http requests
// My app
const http = require('../build/server').http; // server
const listen = require('../build/server').httpServer; // Listening functions
const io = require('../build/server').io;
const USERS = require('../build/db/users').default; // USERS db
const MESSAGES = require('../build/db/messages').default; // MESSAGES db
// Mock data
const userMockData = { username: 'test-user', password: 'test12345' };
const messageMockData = { name: 'test-user', message: 'Hello world', to: 'rama' };

/* ---------- LOGIN & REGISTER ----------*/
describe('🔹 Login & Register', () => {
  /* ----- REGISTER -----*/
  describe('🔸 Register', () => {
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
  describe('🔸 Login', () => {
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

/* ---------- SOCKET ----------*/
describe('🔹 Socket testing ', () => {
  let serverSocket, clientSocket;

  beforeAll(done => {
    // Create client connection
    clientSocket = new Client(`http://localhost:4000`, {
      auth: { username: userMockData.username },
    });
    io.on('connection', socket => {
      serverSocket = socket;
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
    listen.close();
  });

  /* ----- USERS -----*/
  describe('🔸 Users:', () => {
    test('Should set user to online', () => {
      const thisUser = USERS.find(user => user.name === 'test-user');
      expect(thisUser.status).toBe('online');
    });

    test("Should set user's id", () => {
      const thisUser = USERS.find(user => user.name === 'test-user');
      expect(thisUser.id).not.toBe('');
    });
  });

  /* ----- MESSAGES -----*/
  describe('🔸 Messages: ', () => {
    test('Should save "user joined message" message to MESSAGES db', () => {
      const currentMessage = MESSAGES[0];
      setTimeout(() => {
        expect(currentMessage.name).toBe(messageMockData.name);
        expect(currentMessage.message).toBe('Enter to the chat');
        expect(currentMessage.to).toBe('Group');
        done();
      }, 500);
    });

    test('Should save message to MESSAGES db', () => {
      clientSocket.emit('message', messageMockData);
      const currentMessage = MESSAGES[1];
      setTimeout(() => {
        expect(currentMessage.name).toBe(messageMockData.name);
        expect(currentMessage.message).toBe(messageMockData.message);
        expect(currentMessage.to).toBe(messageMockData.to);
        done();
      }, 500);
    });
  });

  /* ----- DISCONNECTED -----*/
  describe('🔸 Disconnected: ', () => {
    test('Should change user to offline', () => {
      clientSocket.emit('disconnected');
      setTimeout(() => {
        const thisUser = USERS.find(user => user.name === userMockData.username);
        expect(thisUser.status).toBe('offline');
        done();
      }, 500);
    });

    test("Should remove user's id", () => {
      clientSocket.emit('disconnected');
      setTimeout(() => {
        const thisUser = USERS.find(user => user.name === userMockData.username);
        expect(thisUser.id).toBe('');
      }, 500);
    });

    test('Should send "user disconnected" message', () => {
      clientSocket.emit('message', messageMockData);
      const currentMessage = MESSAGES[2];
      setTimeout(() => {
        expect(currentMessage.name).toBe(messageMockData.name);
        expect(currentMessage.message).toBe('disconnected');
        expect(currentMessage.to).toBe('Group');
        done();
      }, 500);
    });
  });
});
