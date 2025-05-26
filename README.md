[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/N68_urbh)

backend installs

npm init -y
npm install express cors dotenv mongoose
npm install --save-dev nodemon
npm i --save-dev @types/node
npm install --save-dev @types/express
npm install --save-dev @types/express @types/cors
npm install --save-dev ts-node typescript @types/node nodemon
npm install --save-dev typescript
npm install mongoose
npm install axios dotenv
npx tsc --init //for the tsconfig.sjon
npm install bcrypt
npm i --save-dev @types/bcrypt

added this under scripts 
    "start": "node app.ts",
    "dev": "nodemon app.ts",
made app.ts file

make your .env file with this -

MONGO_URI_PROD=mongodb+srv://username:password@YOURcluster.kcotv.mongodb.net/ChefMate?retryWrites=true&w=majority&appName=YourCluster
PORT=5000
MONGO_URI_LOCAL=mongodb://localhost:27017/ChefMate
NODE_ENV=dev
SESSION_SECRET=your secretkey
SPOONACULAR_API_KEY=log in and get your own api key

frontend installs

npm install axios
npm install react-router-dom
npm install --save-dev @types/react-router-dom