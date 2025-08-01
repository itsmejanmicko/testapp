import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Pause, Play, Search, Zap } from "lucide-react"
import Navbar from "../ui/navbar"
import { Link } from "react-router-dom"

export default function DashboardForm() {

  const testButtons = [
    {
      id: "stress",
      label: "Stress Test",
      description: "Test device under heavy load",
      icon: Zap,
      link: '/stresstest',
      color: "bg-red-500/10 hover:bg-red-500/20 border-red-500/20 text-red-400",
    },
    {
      id: "idle",
      label: "Idle Test",
      description: "Monitor device in idle state",
      icon: Pause,
      color: "bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20 text-blue-400",
    },
    {
      id: "dispatch",
      label: "Dispatch Test",
      description: "Test task dispatching",
      icon: Play,
      color: "bg-green-500/10 hover:bg-green-500/20 border-green-500/20 text-green-400",
    },
    {
      id: "check",
      label: "Check Device",
      description: "Comprehensive device check",
      icon: Search,
      color: "bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20 text-purple-400",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="w-full max-w-4xl mx-auto">
          {/* Center Grid Layout */}
          <div className="text-center mb-12">
            {/* Main Icon */}
            <div className="inline-flex items-center justify-center w-18 h-18 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-3">
              <Activity className="h-8 w-8 text-blue-400" />
            </div>
          </div>

          {/* Floating Test Controls */}
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Device Tests</CardTitle>
              <CardDescription className="text-gray-400">Choose a test to run on your device</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testButtons.map((test) => {
                  const Icon = test.icon

                  return (
                    <Link
                      key={test.id}
                      to={test.link ? test.link : '#'} // Use `to` for the Link
                      className={`h-auto p-6 flex flex-col items-center gap-3 border transition-all duration-200 hover:text-white ${test.color}`}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <Icon className="h-6 w-6" />
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-base">{test.label}</div>
                          <div className="text-sm opacity-70">{test.description}</div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Status Indicators */}
          <div className="mt-8 flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-400">System Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">Ready for Testing</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
