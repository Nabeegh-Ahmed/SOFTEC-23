# GamBazar


## Getting Started

To get started, clone the repository.

```bash
git clone git@github.com:nabeegh-ahmed/softec.git
cd softec
```

## Setting up the Environment (Frontend)
```bash
VITE_URL=http://localhost:8000
```
## Setting up the Environment (Backend)



### IMPORTANT
The system assumes that an admin user exists. You can create an admin user through the following steps
1. Register
2. Login
3. Then navigate to the database in a GUI tool such as MongoDB Compass and change the role to "admin"

The app uses environment variables to configure the app. You need to create a `.env` file in the backend directory of the project and add the following variables:

```bash
NODE_ENV=development # or production
PORT=8000 # port to run the app on

# MONGO DATABASE_URL
MONGO_DATABASE_URL=mongodb://admin:admin@localhost:6000/database?authSource=admin

# REDIS Cache URL
REDIS_DATABASE_URL=redis://localhost:6379

# JWT access token private key
ACCESS_TOKEN_PRIVATE_KEY=
ACCESS_TOKEN_PUBLIC_KEY=

# JWT refresh token private key
REFRESH_TOKEN_PRIVATE_KEY=
REFRESH_TOKEN_PUBLIC_KEY=
```

## Running the App

> Note: To run the app, you need to have MongoDB and redis server running either locally or in a docker container.
> To use the docker container, you need to set some environment variables in the `/docker/.env` file. Visit [this](#mongodb-and-redis-docker-containers) section for more information.

After setting up the environment variables, run the following command to start the server:

```bash
make dev
```

This will start the server in development mode at [http://localhost:8000](http://localhost:8000). 

> Note: The port number specified in the `PORT` environment variable in `/.env` will be used to run the app.

## Stopping the App

To stop the app, run the following command:

```bash
make dev-down
```

## MongoDB and Redis Docker Containers

### Environment Variables

> Note: MongoDB requires some environment variables to be set in order to run. You can set these variables in the `/docker/.env` file.

```bash
MONGO_INITDB_ROOT_USERNAME=admin # username for the root user
MONGO_INITDB_ROOT_PASSWORD=admin # password for the root user
MONGO_INITDB_DATABASE=database # name of the database to create
```

> Note: Update the `DATABASE_URL` environment variable in the `/.env` file to match the values set in the `/docker/.env` file.
