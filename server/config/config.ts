import dotenv from 'dotenv';
dotenv.config();

const config = {
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    accessTime: '2h',
    refreshTime: '24h',
  },
};

export default config;
