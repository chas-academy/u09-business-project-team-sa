// import TestFetch from '../shared/components/TestFetch'
// import reactLogo from '/src/assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import { MealPlanProvider } from '../context/MealPlanContext'
import { HomeProvider } from '../context/HomeContext'

import './App.css'
import LoginPage from '../features/auth/pages/Login/LoginPage'
import SignupPage from '../features/auth/pages/Signup/SignupPage'
import HomePage from '../features/auth/pages/Home/HomePage'
import WelcomePage from '../features/auth/pages/Welcome/WelcomePage'
import ProtectedRoute from '../features/auth/components/ProtectedRoute'
import MealCard from '../features/auth/components/cards/MealCard'
import ProfilePage from '../features/auth/pages/Profile/ProfilePage'

function App() {
  return (
  <HomeProvider>
  <MealPlanProvider>
    <Router>
      <Routes>
        {/* auth routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" 
            element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* api routes */}
        <Route path="spoonacular/recipes/:id" element={<MealCard />} />
        <Route path="/meal/:id" element={<MealCard />} />
        
        {/* Redirect any unknown route to WelcomePage */}
        <Route path="*" element={<Navigate to="/" />} />
        
      </Routes>
    </Router>
  </MealPlanProvider>
  </HomeProvider>
  );
}

export default App;


// testFetch
// function App() {
//   return (
//     <div>
//       <h1>ChefMate Frontend</h1>
//       <TestFetch />
//     </div>
//   );
// }

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }
// export default App


