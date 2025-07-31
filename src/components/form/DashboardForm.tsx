
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Activity, LogOut, Menu, Pause, Play, Search, Settings, Smartphone, Zap } from "lucide-react"

export default function DashboardForm() {
  const [isRunningTest, setIsRunningTest] = useState<string | null>(null)

  const handleLogout = () => {
    console.log("Logging out...")
    // Add your logout logic here
  }

  const handleTest = (testType: string) => {
    setIsRunningTest(testType)
    console.log(`Running ${testType}...`)

    // Simulate test completion after 3 seconds
    setTimeout(() => {
      setIsRunningTest(null)
    }, 3000)
  }

  const testButtons = [
    {
      id: "stress",
      label: "Stress Test",
      description: "Test device under heavy load",
      icon: Zap,
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
      <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Smartphone className="h-8 w-8 text-blue-400" />
              </div>
            </div>

            {/* Menu Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-gray-800 transition-colors">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-800">
                <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="hover:bg-gray-800 focus:bg-gray-800 text-red-400 focus:text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="w-full max-w-4xl mx-auto">
          {/* Center Grid Layout */}
          <div className="text-center mb-12">
            {/* Main Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-6">
              <Activity className="h-12 w-12 text-blue-400" />
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
                  const isRunning = isRunningTest === test.id

                  return (
                    <Button
                      key={test.id}
                      onClick={() => handleTest(test.id)}
                      disabled={isRunningTest !== null}
                      className={`h-auto p-6 flex flex-col items-center gap-3 border transition-all duration-200 ${test.color} ${
                        isRunning ? "animate-pulse" : ""
                      }`}
                      variant="outline"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <Icon className="h-6 w-6" />
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-base">{test.label}</div>
                          <div className="text-sm opacity-70">{test.description}</div>
                        </div>
                        {isRunning && (
                          <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                            Running...
                          </Badge>
                        )}
                      </div>
                    </Button>
                  )
                })}
              </div>

              {isRunningTest && (
                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">Test in progress... Please wait for completion.</span>
                  </div>
                </div>
              )}
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
