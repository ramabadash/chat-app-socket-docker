## Live chat app with Socket Io and docker ð¬ð

#### Assignment in the cyber4's course for practicing the socket.io library and docker

---

### Technologies in use - ð©âð»ð¨âð»

- **[React](https://reactjs.org/) - For the frontend**
- **[TypeScript](https://www.typescriptlang.org/) - As a programming language**
- **[React Router DOM](https://www.npmjs.com/package/react-router-dom) - To create single page app**
- **[Redux](https://redux.js.org/) - for state management**
- **[Docker](https://www.docker.com/) - For global use**
- **[Socket.io](https://socket.io/) - For live connection**

#### Packages ð¦

##### Front-end

- **[Axios](https://www.npmjs.com/package/axios) - For API requests**
- **[Notyf](https://www.npmjs.com/package/notyf) - for nice popUp messages**
- **[Socket.io-client](https://socket.io/docs/v4/client-api/) - For client server connection**
- **[Moment](https://momentjs.com/) - For nice dates**
- **[mui](https://mui.com/) - For design**
- **[font awesome](https://fontawesome.com/icons/user?s=solid) - For icons**

##### Back-end

- **[ts-node-dev](https://www.npmjs.com/package/ts-node-dev) and [ts-node](https://www.npmjs.com/package/ts-node)**
- **[Express](https://www.npmjs.com/package/express)**
- **[Socket.io](https://socket.io/) - For client server connection**
- **[Cors](https://www.npmjs.com/package/cors)**
- **[JWT](https://jwt.io/) - To generate tokens**
- **[Bcrypt](https://www.npmjs.com/package/bcrypt) - To encrypt passwords**
- **[Jest](https://jestjs.io/docs/) - For testing**
- **[Supertest](https://www.npmjs.com/package/supertest) - For testing**

---

## My app -

## Public use -

<!-- [Dockerhub-ramab2108/socket-chat](https://hub.docker.com/repository/docker/ramab2108/socket-chat) -->

#### Link to docker hub- â¨Not yetâ¨

#### Link to heroku- â¨Not yetâ¨

## Local use -

### Github ð±âð¤

- **Clone this repo**
- **Run `npm i` on the `client` and `server` dirs - To install all the dependencies**
- **Run `npm run dev` on `server` dir - To start the server**
- **Run `npm start` on `client` dir - To start the front-end**
- **Go to http://localhost:3000 and enjoy!**

### Docker ð

- **Docker - Run on root dir `docker build -t chat-app .` â¡ `docker run -dp 4000:4000 chat-app`**
- **Docker compose - Run on root dir `docker-compose up -d --build`**
- **Go to http://localhost:4000 and enjoy!**

---

### Features - ð«

- **Login and register with a unique username and password** ð¤
- **The online users view is updated live - online or offline indicator** ð´ð¢ð¥
- **User joined and left the chat group messages**ðª
- **Getting all your messages history**ð
- **Private messages to the user by clicking on the user** ð
- **Chat scrolls down automatically** ð½
- **Indication for the user typing live** ð¬
- **Showing the selected conversation messages**ð¥
- **Unread messages notifications**ð´1ï¸â£
- **Indication that a user is logging in or out of the chat** ð¤ââ
- **Navbar with the option to disconnect from the chat** ðª
- **Sending messages also to disconnected users**â
- **Nice design!** ð

---

## Future Plans ðð©âð

#### Front:

- **Search - Search messages and users ð**
- **Adding custom group chats ð¥**
- **Using the tokens to auth when sending messages** ð«
- **Go to last unread message page position when entering to conversation** â
- **Sending the typing signal just to the current room** ð¬

#### Back:

- **Adding custom group chats ð¥**
- **Save data in MongoDB**
- **Better error handling**

#### General:

- **Cleaning logs and code in general ð§¹ð§¼**
- **Tests - frontend ð¯**
- **Upload docker image to docker-hub ð³**
- **Deployment to heroku ð**
- **Github workflows ð±âð»**

---

## Screenshots ð¸ -

### Login and register ð

### <img src="./README-PICS/login.png"/>

### <img src="./README-PICS/register.png"/>

### Group chat ð©âð¦°ð§ð¨âð¦±

### <img src="./README-PICS/group-chat.png"/>

### Typing in a private room ð¤«

### <img src="./README-PICS/typing.png"/>

### Offline users and notification sign ð´

### <img src="./README-PICS/offline-user.png"/>

### Mobile ð±

### <img src="./README-PICS/mobile-login.png"/><img src="./README-PICS/mobile-chat.png"/><img src="./README-PICS/mobile-users.png"/>

---

## Testing ð¯ -

### Backend ð»

### <img src="./README-PICS/testing-back.png"/>

### Frontend ð¥

#### Working on it ð

---

## Graphs ð -

<img src="./README-PICS/login-logout-graph.png"/><img src="./README-PICS/sending-message-graph.png"/>
