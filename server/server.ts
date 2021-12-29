// Importing module
import express from 'express';
import cors from 'cors';

const app = express();
const PORT: Number = 4000;
const http = require('http').createServer(app);

// Middlewares
app.use(cors());
app.use(express.json());

// Handling GET / Request
app.get('/', (req, res) => {
  res.send('Welcome to typescript backend!');
});

// Server setup
http.listen(PORT, () => {
  console.log(`The application is listening on port ${PORT}`);
});
