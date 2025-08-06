import { Activity, Smartphone, Shield, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  const features = [
    {
      title: "Stress Test",
      description: "Run comprehensive performance tests",
      icon: Activity,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Check Device",
      description: "Scan and analyze device status",
      icon: Smartphone,
      color: "from-sky-500 to-sky-600",
    },
    {
      title: "Device Condition",
      description: "Monitor health and performance",
      icon: Shield,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      title: "Add Rules",
      description: "Configure custom parameters",
      icon: Plus,
      color: "from-blue-600 to-indigo-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900">
      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Whatata</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
        
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-14">
            <h2 className="text-5xl md:text-3xl font-bold text-white mb-6 leading-tight">
              Device Management
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h2>
            <p className="text-sm text-blue-200 max-w-3xl mx-auto leading-relaxed">
              Comprehensive device monitoring, testing, and management tools designed for modern workflows
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-md font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-blue-200 mb-6 leading-relaxed text-sm">{feature.description}</p>
                    <Button
                      className={`w-full bg-gradient-to-r ${feature.color} hover:opacity-90 text-white border-0 font-medium py-3 rounded-xl transition-all duration-300`}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}
