# REST API Starter

This is a starter project for building REST APIs using Node.js, Express, MongoDB, and Redis.

## Getting Started

To get started, clone the repository and install the dependencies.

```bash
git clone git@github.com:hifarhanali/REST-API-Starter.git
cd REST-API-Starter
yarn install
```

## Setting up the Environment

The app uses environment variables to configure the app. You can create a `.env` file in the root directory of the project and add the following variables:

```bash
# Node environment
NODE_ENV=development # or production

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

# Google OAuth credentials
GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=
GOOGLE_OAUTH_REDIRECT_URL=http://localhost:8000/api/sessions/oauth/google

# Email credentials for sending emails
EMAIL_USER= # email address to send emails from
EMAIL_PASS= # SMTP master password
EMAIL_HOST= # smtp-relay.sendinblue.com for sendinblue
EMAIL_PORT= # 587 for sendinblue

# Phone verification API settings
PHONE_VERIFICATION_API_URL=http://localhost:13000/api # url for the phone verification API
PHONE_VERIFICATION_API_SIGNATURE= # signature for the phone verification API
```

## Running the App

> Note: You will need to have a instance of MongoDB and redis running on your machine. You can use docker to run these services. See the [MongoDB and Redis Docker Containers](#mongodb-and-redis-docker-containers) section for more details.

After installing the dependencies and running the MongoDB and redis instances, you can run the app in development mode using the following command:

```bash
yarn start
```

This will start the server in development mode at [http://localhost:8000](http://localhost:8000).

## MongoDB and Redis Docker Containers

### Environment Variables

> Note: MongoDB requires some environment variables to be set in order to run. You can set these variables in the `/docker/.env` file.

```bash
MONGO_INITDB_ROOT_USERNAME=admin # username for the root user
MONGO_INITDB_ROOT_PASSWORD=admin # password for the root user
MONGO_INITDB_DATABASE=database # name of the database to create
```

> Note: Update the `DATABASE_URL` environment variable in the `/.env` file to match the values set in the `/docker/.env` file.

To run MongoDB and redis in docker containers, run the following commands:

```bash
make dev
```

This will start two containers, one for MongoDB and one for redis in the background.

To stop the containers, run the following command:

```bash
make dev-down
```
