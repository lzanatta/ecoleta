# Ecoleta - create and find waste collection points 

### Project developed during [Rocketseat](https://rocketseat.com.br/)'s Next Level Week #1 event

The project is split into three main parts:
 - **server**: API for creating and listing waste collection points
 - **web**: web site for registering waste collection points
 - **mobile**: mobile app for viewing collection points

### Running the project:

 - Server: 
    - Create the database: `npm run knex:migrate`
    - Seed the database with collectable waste types: `npm run knex:seed`
    - Start application: `npm run dev`

 - Web: `npm start`

 - Mobile: 
    - If you don't already have it, install [expo](https://expo.io/): `npm install -g expo-cli`
    - Start application: `npm start`
