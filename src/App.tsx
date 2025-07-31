import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/page/Loginpage";
import DashboardPage from "./components/page/Dashboardpage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import StressTestPage from "./components/page/stresstest/Index";



export default function App(){
  return(
      <main className="font-font-primary">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path ="/stresstest" element ={<StressTestPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </main>
  )
}