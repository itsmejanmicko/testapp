

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/config/dbConfig"
import { useNavigate } from "react-router-dom"

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
 
    async function handleLogin(e:React.FormEvent){
        e.preventDefault();
       try {
        await signInWithEmailAndPassword(auth,email, password);
        alert("Login successful!");
        navigate('/dashboard');

       } catch (error) {
          console.error("Login failed:", error);
          alert("Login failed. Please check your credentials and try again.");
       }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-3xl font-bold text-center text-slate-800">Welcome back</CardTitle>
          <p className="text-slate-600 text-center text-sm">Sign in to your account to continue</p>
        </CardHeader>
       <form onSubmit={handleLogin} className="space-y-6">
         <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700 font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="h-12 pr-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <Button 
          type="submit"
          className="w-full h-12 bg-slate-800 hover:bg-slate-900 text-white font-medium text-base">
            Sign In
          </Button>
        </CardContent>
       </form>
      </Card>
    </div>
  )
}
