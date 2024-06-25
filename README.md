# knit

Dead simple and easy to use task management system

# how to run the app locally

1. create a new firebase app and get the credentials from the settings
2. save the settings in `.env.development` file
```.env
# .env.development

VITE_FIREBASE_KEY=
VITE_FIREBASE_DOMAIN=
VITE_FIREBASE_PROJ=
VITE_FIREBASE_BKT=
VITE_FIREBASE_MSG_ID=
VITE_FIREBASE_APP_ID=

```
3. use `npm install` to install all the dependencies
4. run the app by `npm run dev` or build it by `npm run build`

Note: NodeJS and npm are pre-requisites for the app
