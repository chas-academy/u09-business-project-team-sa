# 👨‍🍳 ChefMate

**ChefMate** is a full-stack recipe planning app that lets users sign up, log in, and manage their meal plans across a weekly calendar. 

Built with the MEAN stack, it combines a robust backend with an interactive frontend UI.

---

## 🚀 Features

- 🔐 User authentication (Signup & Login)
- 🗓️ Weekly meal planner (Breakfast, Lunch, Dinner, Snacks)
- 📦 MongoDB for storing user data and plans
- 🔒 JWT-based session management
- 🌍 Deployed backend (Render) and frontend (Netlify)

---

## 🛠️ Tech Stack

**Frontend:**
- Angular + TypeScript
- Axios for HTTP requests
- CSS Modules

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt for secure auth
- dotenv for environment management

---

## 📂 Project Structure

| 📂 backend service  |     |              |                            |
|---------------------|-----|--------------|----------------------------|
| backend-chefmate/   |     |              |                            |
|                     |src/ |              |                            |
|                     |     | controllers/ |                            |
|                     |     |              | userController.ts          |
|                     |     |              | userMealPlanController.ts  |
|                     |     | db/          |                            |
|                     |     |              | db.ts                      |
|                     |     | middleware/  |                            |
|                     |     |              | auth.ts                    |
|                     |     | models/      |                            |
|                     |     |              | userMealPlans.ts           |
|                     |     |              | userModel.ts               |
|                     |     | routes/      |                            |
|                     |     |              | authRoutes.ts              |
|                     |     |              | spoonacularRoutes.ts       |
|                     |     |              | userMealPlanRoutes.ts      |
|                     |     |              | userRoutes.ts              |
|                     |     | services/    |                            |
|                     |     |              | googleService.ts           |
|                     |     |              | spponacular.ts             |
| app.ts              |                    |

| 📂 frontend service |       |             |                     |             |
|---------------------|-------|-------------|---------------------|-------------|
| ChefMate/           |       |             |                     |             |
|                     | src/  |             |                     |             |
|                     |       | api/        |                     |             |
|                     |       |             | axios.ts            |             |
|                     |       | app/        |                     |             |
|                     |       |             | app.tsx             |             |
|                     |       | assets/     |                     |             |
|                     |       | context/    |                     |             |
|                     |       |             | AuthContext.tsx     |             |
|                     |       |             | MealPlanContext.tsx |             |
|                     |       | features/   |                     |             |
|                     |       |             | components/         |             |
|                     |       |             |                     | cards/      |
|                     |       |             |                     | forms/      |
|                     |       |             | pages/              |             |
|                     |       |             | styles/             |             |
|                     |       |             |                     | index.css   |
|                     |       |             |                     | buttons.css |
|                     |       | main.tsx    |                     |             |

## 🌐 Live URLs

- **Frontend**: [https://chef-mate.netlify.app](https://chef-mate.netlify.app)
- **Backend**: [https://chefmate-backend-server.onrender.com](https://chefmate-backend-server.onrender.com)


## 🧪 Local Setup

### 1. Clone the repo

git clone https://github.com/chas-academy/u09-business-project-team-sa.git

### 2. Install dependencies

Frontend

- cd cbackend-chefmate
- npm install

Backend

- cd ChefMate
- npm install

### 3. Setup environment variables

Create a .env file in the backend server:

- MONGO_URI=your-mongodb-connection-string
- JWT_SECRET=your-secret-key
- SPOONACULAR_API_KEY=your-secret-key
- GOOGLE_CLIENT_ID=your-key
- PORT=5000

Create a .env file in the frontend server:

- VITE-GOOGLE_CLIENT_ID=your-key
- VITE_API_BASE_URL=`http://localhost:5000/api`

### 4. Run the project locally

Backend

- cd backend-chefmate
- npm run dev

Frontend

- cd ChefMate
- npm run dev

Now go to http://localhost:5173

📬 API Endpoints

- POST /api/users/signup
- POST /api/users/login
- POST /api/mealplan
- GET /api/mealplan

<!-- Body:

json

{
  "username": "yourName",

  "email": "you@example.com",

  "password": "yourPassword"
}

- POST /api/users/login

Body:

json

{
  "email": "you@example.com",
  "password": "yourPassword"
} -->

# Future Features

- Calorie tracking for day and week
- Favorite meal card added to profile page showing past saved meals for an easy finding

# 🙌 Author

## Made with ❤️ by Sue and Alex