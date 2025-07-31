import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/page/Loginpage";
import DashboardPage from "./components/page/Dashboardpage";



export default function App(){
  return(
   <main className="font-font-primary">
    <Routes>
     <Route path="/" element={<LoginPage />} />
     <Route path ="/dashboard" element ={<DashboardPage />} />
   </Routes>
   </main>
  )
}