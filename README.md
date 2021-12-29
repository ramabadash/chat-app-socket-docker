## Chat app with Socket Io and docker

## Task:

### End goal - A chat app which is divided into two containers.

- One container will contain our server side
- Second container will contain our client side

### Requirements:

- The server will contain an array of all users currently logged in to chat.
- The server will notify all users of a user's login and logout.
- There will be a list on the chat side (frontend) which will contain the name / id of everyone who is currently logged in to the chat.
- When clicking on the name / id of a user who is currently logged in to the chat you will be given the option to send a specific message to that user only.
- Dockerize both of your directories (front and back)
- Add a `docker compose` file.
- Run your docker-compose.yml file and see that your full app is running.

### Bonus:

- Add a "typing ..." comment which will be sent to all online users when one of them types (it is recommended to add the name of the same person typing to the comment)
