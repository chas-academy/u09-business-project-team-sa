[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/N68_urbh)

backend installs

npm init -y
npm install express cors dotenv mongoose
npm install --save-dev nodemon
npm i --save-dev @types/node
npm install --save-dev @types/express
npm install --save-dev @types/express @types/cors
npm install --save-dev @types/react @types/react-dom
npm install --save-dev ts-node typescript @types/node nodemon
npm install --save-dev typescript
npm install mongoose
npm install axios dotenv
npx tsc --init //for the tsconfig.sjon
npm install bcrypt
npm i --save-dev @types/bcrypt
-----
For Google oAuth: 
npm install @react-oauth/google
npm install jwt-decode
npm install google-auth-library
npm install react-router-dom
-----


added this under scripts
    "start": "node app.ts",
    "dev": "nodemon app.ts",
made app.ts file

make your .env file with this - Backend

MONGO_URI_PROD=mongodb+srv://username:password@YOURcluster.kcotv.mongodb.net/ChefMate?retryWrites=true&w=majority&appName=YourCluster
PORT=5000
MONGO_URI_LOCAL=mongodb://localhost:27017/ChefMate
NODE_ENV=dev
SESSION_SECRET=your secretkey
SPOONACULAR_API_KEY=log in and get your own api key
GOOGLE_CLIENT_ID=805405718661-8tba2pt2ham5sgfv4q8omvehddc9ujdd.apps.googleusercontent.com

frontend installs

create a .env file in frontend as well with this
VITE_GOOGLE_CLIENT_ID=805405718661-8tba2pt2ham5sgfv4q8omvehddc9ujdd.apps.googleusercontent.com


npm install axios
npm install react-router-dom
npm install --save-dev @types/react-router-dom

add an .env.production to front end with
VITE_GOOGLE_CLIENT_ID=805405718661-8tba2pt2ham5sgfv4q8omvehddc9ujdd.apps.googleusercontent.com

VITE_API_BASE_URL=https://chefmate-backend-server.onrender.com/api