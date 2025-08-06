

import type React from "react"
import {toast} from "sonner";
import {  useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/config/dbConfig"
import { useNavigate } from "react-router-dom"

export default function SunmiLoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [error, setShowError] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault()
     try {
      toast.promise(
        signInWithEmailAndPassword(auth, email, password),
        {
          loading: "Logging in...",
          success: () => {
            navigate("/dashboard")
            return "Login successful!"
          },
          error: (err) => {
            setShowError(true);
            console.error(err);
            return <div className="text-red-500">Login failed. Please check your credentials.</div>
          }
        }
      )
     } catch (error) {
      setShowError(true);
      throw new Error("Login failed. Please check your credentials.")
     }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-100 via-sky-50 to-blue-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-16 h-16 bg-blue-400 rounded-lg transform rotate-12 shadow-lg"></div>
        <div className="absolute top-40 left-40 w-12 h-12 bg-sky-300 rounded-full shadow-md"></div>
        <div className="absolute top-60 left-60 w-20 h-8 bg-blue-500 rounded-lg transform -rotate-6 shadow-lg"></div>
        <div className="absolute bottom-40 left-32 w-14 h-14 bg-sky-400 rounded-lg transform rotate-45 shadow-md"></div>
        <div className="absolute top-32 right-40 w-18 h-18 bg-blue-300 rounded-lg transform -rotate-12 shadow-lg"></div>
        <div className="absolute bottom-60 right-60 w-16 h-16 bg-sky-500 rounded-full shadow-md"></div>
        <div className="absolute bottom-20 right-20 w-12 h-20 bg-blue-400 rounded-lg transform rotate-30 shadow-lg"></div>
      </div>

      {/* Isometric 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Computer/Monitor */}
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-20 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-t-lg shadow-xl transform perspective-1000 rotateX-10 rotateY-15"></div>
            <div className="w-24 h-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded-b-lg shadow-lg transform translate-y-1"></div>
          </div>
        </div>

        {/* Server/Database */}
        <div className="absolute top-1/3 left-1/6 transform">
          <div className="space-y-1">
            <div className="w-16 h-4 bg-gradient-to-r from-sky-600 to-sky-800 rounded shadow-md"></div>
            <div className="w-16 h-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded shadow-md"></div>
            <div className="w-16 h-4 bg-gradient-to-r from-sky-600 to-sky-800 rounded shadow-md"></div>
          </div>
        </div>

        {/* Mobile Device */}
        <div className="absolute bottom-1/3 left-1/5 transform rotate-12">
          <div className="w-8 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-xl"></div>
          <div className="absolute top-2 left-1 w-6 h-10 bg-sky-100 rounded"></div>
        </div>

        {/* Cube Elements */}
        <div className="absolute top-1/2 left-1/3 transform -rotate-12">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg transform perspective-1000 rotateX-15 rotateY-15"></div>
        </div>

        {/* Chart/Analytics */}
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2">
          <div className="flex items-end space-x-1">
            <div className="w-2 h-8 bg-blue-500 rounded-t"></div>
            <div className="w-2 h-12 bg-sky-500 rounded-t"></div>
            <div className="w-2 h-6 bg-blue-400 rounded-t"></div>
            <div className="w-2 h-10 bg-sky-400 rounded-t"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-blue-600">WhatTh3Test</div>
        </div>
        <div className="flex space-x-4 text-sm text-gray-600">
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md mx-4 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-semibold text-gray-800">Log In With A WTT Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email address/phone number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${error ? "border-red-500" : ""}`}
                  required
                />
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Please enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${error ? "border-red-500" : ""}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Login
              </Button>
            </form>

            <div className="flex justify-between text-sm">
             
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-gray-500 pb-6">
        <div className="space-x-4">
          <span>© WhatTh3Test. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}
