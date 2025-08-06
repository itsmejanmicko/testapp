"use client"

import { useEffect, useState } from "react"
import { Activity, CheckCircle, Cpu, AlertTriangle, Zap, Plus, Edit, Trash2, Eye } from "lucide-react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { db } from "@/config/dbConfig"
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface StressTestData {
  id: string
  sn: string
  imei: string
  version: string
  osVersion: string
  beforeBattery: number
  afterBattery: number
  timeIn: string
  timeOut: string
  status: "running" | "completed" | "failed"
}



const menuItems = [
  {
    title: "Stress Test",
    icon: Zap,
    id: "stress-test",
    badge: "12",
  },
  {
    title: "Finished Device",
    icon: CheckCircle,
    id: "finished-device",
    badge: "45",
  },
  {
    title: "Total Device",
    icon: Cpu,
    id: "total-device",
    badge: "128",
  },
  {
    title: "Active Device",
    icon: Activity,
    id: "active-device",
    badge: "67",
  },
  {
    title: "Defective Device",
    icon: AlertTriangle,
    id: "defective-device",
    badge: "16",
  },
]

function AppSidebar() {
  const [activeTab, setActiveTab] = useState("stress-test")

  return (
    <Sidebar className="border-r border-blue-200">
      <SidebarHeader className="border-b border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Cpu className="h-4 w-4 text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="text-lg font-semibold text-blue-900">Device</h2>
            <p className="text-xs text-blue-600">Testing Facility</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-gradient-to-b from-blue-50 to-white">
        <SidebarMenu className="p-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => setActiveTab(item.id)}
                isActive={activeTab === item.id}
                className="w-full justify-start gap-3 px-3 py-2 text-blue-700 hover:bg-blue-100 hover:text-blue-900 data-[active=true]:bg-blue-600 data-[active=true]:text-white"
              >
                <item.icon className="h-4 w-4" />
                <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                <Badge
                  variant="secondary"
                  className="ml-auto group-data-[collapsible=icon]:hidden bg-blue-100 text-blue-700 data-[active=true]:bg-blue-500 data-[active=true]:text-white"
                >
                  {item.badge}
                </Badge>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

function StressTestTab() {
  const [data, setData] = useState<StressTestData[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<StressTestData | null>(null)
  const [formData, setFormData] = useState<Partial<StressTestData>>({})
  
   useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "stressTests"))
        const items: StressTestData[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as StressTestData[]

        setData(items)
      } catch (error) {
        console.error("Error fetching data from Firestore:", error)
      }
    }

    fetchData()
  }, [])

 const handleAdd = async () => {
  const newItem: StressTestData = {
    id: Date.now().toString(),
    sn: formData.sn || "",
    imei: formData.imei || "",
    version: formData.version || "",
    osVersion: formData.osVersion || "",
    beforeBattery: formData.beforeBattery || 0,
    afterBattery: formData.afterBattery || 0,
    timeIn: formData.timeIn || new Date().toISOString().slice(0, 19).replace("T", " "),
    timeOut: formData.timeOut || new Date().toISOString().slice(0, 19).replace("T", " "),
    status: "running",
  }

  try {
    await addDoc(collection(db, "stressTests"), newItem)
    setData(prev => [...prev, newItem])
    setFormData({})
    setIsAddDialogOpen(false)
  } catch (error) {
    console.error("Error adding document to Firebase: ", error)
  }
}


  const handleEdit = (item: StressTestData) => {
    setEditingItem(item)
    setFormData(item)
  }

  const handleUpdate = () => {
    if (editingItem) {
      setData(data.map((item) => (item.id === editingItem.id ? { ...item, ...formData } : item)))
      setEditingItem(null)
      setFormData({})
    }
  }

  const handleDelete = (id: string) => {
    setData(data.filter((item) => item.id !== id))
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      running: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    }
    return variants[status as keyof typeof variants] || variants.running
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Stress Test Management</h1>
          <p className="text-blue-600">Monitor and manage device stress testing</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Device Test
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-blue-900">Add New Device Test</DialogTitle>
              <DialogDescription>Enter the device information to start a new stress test.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="sn">Serial Number</Label>
                <Input
                  id="sn"
                  value={formData.sn || ""}
                  onChange={(e) => setFormData({ ...formData, sn: e.target.value })}
                  placeholder="SN123456789"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imei">IMEI</Label>
                <Input
                  id="imei"
                  value={formData.imei || ""}
                  onChange={(e) => setFormData({ ...formData, imei: e.target.value })}
                  placeholder="123456789012345"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  value={formData.version || ""}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  placeholder="v2.1.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="osVersion">OS Version</Label>
                <Input
                  id="osVersion"
                  value={formData.osVersion || ""}
                  onChange={(e) => setFormData({ ...formData, osVersion: e.target.value })}
                  placeholder="Android 13"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="beforeBattery">Before Battery (%)</Label>
                <Input
                  id="beforeBattery"
                  type="number"
                  value={formData.beforeBattery || ""}
                  onChange={(e) => setFormData({ ...formData, beforeBattery: Number.parseInt(e.target.value) })}
                  placeholder="85"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="afterBattery">After Battery (%)</Label>
                <Input
                  id="afterBattery"
                  type="number"
                  value={formData.afterBattery || ""}
                  onChange={(e) => setFormData({ ...formData, afterBattery: Number.parseInt(e.target.value) })}
                  placeholder="72"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeIn">Time In</Label>
                <Input
                  id="timeIn"
                  type="datetime-local"
                  value={formData.timeIn?.replace(" ", "T") || ""}
                  onChange={(e) => setFormData({ ...formData, timeIn: e.target.value.replace("T", " ") })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeOut">Time Out</Label>
                <Input
                  id="timeOut"
                  type="datetime-local"
                  value={formData.timeOut?.replace(" ", "T") || ""}
                  onChange={(e) => setFormData({ ...formData, timeOut: e.target.value.replace("T", " ") })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
                Add Test
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
        <CardHeader className="">
          <CardTitle className="text-blue-900">Active Stress Tests</CardTitle>
          <CardDescription className="text-blue-600">Monitor ongoing and completed device stress tests</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50 hover:bg-blue-50">
                <TableHead className="text-blue-900 font-semibold">Serial Number</TableHead>
                <TableHead className="text-blue-900 font-semibold">IMEI</TableHead>
                <TableHead className="text-blue-900 font-semibold">Version</TableHead>
                <TableHead className="text-blue-900 font-semibold">OS Version</TableHead>
                <TableHead className="text-blue-900 font-semibold">Before Battery</TableHead>
                <TableHead className="text-blue-900 font-semibold">After Battery</TableHead>
                <TableHead className="text-blue-900 font-semibold">Time In</TableHead>
                <TableHead className="text-blue-900 font-semibold">Time Out</TableHead>
                <TableHead className="text-blue-900 font-semibold">Status</TableHead>
                <TableHead className="text-blue-900 font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="hover:bg-blue-50">
                  <TableCell className="font-medium text-blue-900">{item.sn}</TableCell>
                  <TableCell className="text-blue-700">{item.imei}</TableCell>
                  <TableCell className="text-blue-700">{item.version}</TableCell>
                  <TableCell className="text-blue-700">{item.osVersion}</TableCell>
                  <TableCell className="text-blue-700">{item.beforeBattery}%</TableCell>
                  <TableCell className="text-blue-700">{item.afterBattery}%</TableCell>
                  <TableCell className="text-blue-700">{item.timeIn}</TableCell>
                  <TableCell className="text-blue-700">{item.timeOut}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-100">
                          <span className="sr-only">Open menu</span>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-blue-200">
                        <DropdownMenuItem onClick={() => handleEdit(item)} className="text-blue-700 hover:bg-blue-50">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-blue-900">Edit Device Test</DialogTitle>
            <DialogDescription>Update the device test information.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-sn">Serial Number</Label>
              <Input
                id="edit-sn"
                value={formData.sn || ""}
                onChange={(e) => setFormData({ ...formData, sn: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-imei">IMEI</Label>
              <Input
                id="edit-imei"
                value={formData.imei || ""}
                onChange={(e) => setFormData({ ...formData, imei: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-version">Version</Label>
              <Input
                id="edit-version"
                value={formData.version || ""}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-osVersion">OS Version</Label>
              <Input
                id="edit-osVersion"
                value={formData.osVersion || ""}
                onChange={(e) => setFormData({ ...formData, osVersion: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-beforeBattery">Before Battery (%)</Label>
              <Input
                id="edit-beforeBattery"
                type="number"
                value={formData.beforeBattery || ""}
                onChange={(e) => setFormData({ ...formData, beforeBattery: Number.parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-afterBattery">After Battery (%)</Label>
              <Input
                id="edit-afterBattery"
                type="number"
                value={formData.afterBattery || ""}
                onChange={(e) => setFormData({ ...formData, afterBattery: Number.parseInt(e.target.value) })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingItem(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700">
              Update Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function PlaceholderTab({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Cpu className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold text-blue-900 mb-2">{title}</h2>
        <p className="text-blue-600">This section is under development</p>
      </div>
    </div>
  )
}

export function StressPage() {
  const [activeTab, setActiveTab] = useState("stress-test")

  const renderContent = () => {
    switch (activeTab) {
      case "stress-test":
        return <StressTestTab />
      case "finished-device":
        return <PlaceholderTab title="Finished Devices" />
      case "total-device":
        return <PlaceholderTab title="Total Devices" />
      case "active-device":
        return <PlaceholderTab title="Active Devices" />
      case "defective-device":
        return <PlaceholderTab title="Defective Devices" />
      default:
        return <StressTestTab />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-blue-50 to-white">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-blue-200 bg-white/80 backdrop-blur-sm px-4">
            <SidebarTrigger className="text-blue-600 hover:bg-blue-100" />
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <span>Stress Test</span>
              <span>•</span>
              <span className="font-medium text-blue-900">Backend Dashboard</span>
            </div>
          </header>
          <main className="flex-1 p-6">{renderContent()}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
