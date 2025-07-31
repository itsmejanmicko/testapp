"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarDays, Filter, MoreHorizontal, Plus, Search, Download, RefreshCw } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { AddDeviceDialog } from "@/components/form/AddDialog"
import { EditDeviceDialog } from "@/components/form/EditDialog"
import { AppSidebar } from "@/components/ui/side"

// Mock data for stress test devices
const initialDevices = [
  {
    id: "1",
    sn: "SN001234",
    imei: "123456789012345",
    ezbusVersion: "v2.1.3",
    startTime: new Date("2024-01-15T09:00:00"),
    endTime: new Date("2024-01-15T17:30:00"),
    totalHours: 8.5,
    beforeBattery: 100,
    afterBattery: 15,
    status: "completed" as const,
    remarks: "Normal operation",
    notes: "Temperature stable throughout test",
  },
  {
    id: "2",
    sn: "SN001235",
    imei: "123456789012346",
    ezbusVersion: "v2.1.4",
    startTime: new Date("2024-01-16T08:30:00"),
    endTime: null,
    totalHours: 0,
    beforeBattery: 98,
    afterBattery: 0,
    status: "running" as const,
    remarks: "In progress",
    notes: "Started stress test this morning",
  },
  {
    id: "3",
    sn: "SN001236",
    imei: "123456789012347",
    ezbusVersion: "v2.1.2",
    startTime: new Date("2024-01-14T10:15:00"),
    endTime: new Date("2024-01-14T14:45:00"),
    totalHours: 4.5,
    beforeBattery: 95,
    afterBattery: 0,
    status: "failed" as const,
    remarks: "Device overheated",
    notes: "Test terminated due to high temperature",
  },
  {
    id: "4",
    sn: "SN001237",
    imei: "123456789012348",
    ezbusVersion: "v2.1.4",
    startTime: new Date("2024-01-17T07:00:00"),
    endTime: null,
    totalHours: 0,
    beforeBattery: 100,
    afterBattery: 0,
    status: "pending" as const,
    remarks: "Scheduled",
    notes: "Waiting for test slot",
  },
]

type Device = {
  id: string
  sn: string
  imei: string
  ezbusVersion: string
  startTime: Date
  endTime: Date | null
  totalHours: number
  beforeBattery: number
  afterBattery: number
  status: "completed" | "running" | "failed" | "pending"
  remarks: string
  notes: string
}

export default function StressTestPage() {
  const [devices, setDevices] = useState<Device[]>(initialDevices)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [versionFilter, setVersionFilter] = useState<string>("all")
  const [editingDevice, setEditingDevice] = useState<Device | null>(null)

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.sn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.imei.includes(searchTerm) ||
      device.remarks.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || device.status === statusFilter
    const matchesVersion = versionFilter === "all" || device.ezbusVersion === versionFilter

    return matchesSearch && matchesStatus && matchesVersion
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-600">
            Completed
          </Badge>
        )
      case "running":
        return (
          <Badge variant="default" className="bg-blue-600">
            Running
          </Badge>
        )
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleAddDevice = (newDevice: Omit<Device, "id">) => {
    const device: Device = {
      ...newDevice,
      id: Date.now().toString(),
    }
    setDevices([...devices, device])
    console.log("Device added successfully")
  }

  const handleEditDevice = (updatedDevice: Device) => {
    setDevices(devices.map((d) => (d.id === updatedDevice.id ? updatedDevice : d)))
    setEditingDevice(null)
    console.log("Device updated successfully")
  }

  const handleDeleteDevice = (id: string) => {
    setDevices(devices.filter((d) => d.id !== id))
    console.log("Device deleted successfully")
  }

  const handleMarkCompleted = (id: string) => {
    setDevices(
      devices.map((d) =>
        d.id === id
          ? {
              ...d,
              status: "completed" as const,
              endTime: new Date(),
              totalHours: d.startTime ? (new Date().getTime() - d.startTime.getTime()) / (1000 * 60 * 60) : 0,
            }
          : d,
      ),
    )
    console.log("Test marked as completed")
  }

  const stats = {
    total: devices.length,
    running: devices.filter((d) => d.status === "running").length,
    completed: devices.filter((d) => d.status === "completed").length,
    failed: devices.filter((d) => d.status === "failed").length,
  }

  return (
    <main className="bg-gray-950 text-white">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Stress Testing</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
    
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All registered devices</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Running Tests</CardTitle>
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.running}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Badge variant="default" className="bg-green-600">
                ✓
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <p className="text-xs text-muted-foreground">Successfully finished</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed Tests</CardTitle>
              <Badge variant="destructive">✗</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Stress Test Devices</CardTitle>
                <CardDescription>Manage and monitor device stress testing operations</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <AddDeviceDialog onAddDevice={handleAddDevice}>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Device
                  </Button>
                </AddDeviceDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by SN, IMEI, or remarks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={versionFilter} onValueChange={setVersionFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Versions</SelectItem>
                  <SelectItem value="v2.1.2">v2.1.2</SelectItem>
                  <SelectItem value="v2.1.3">v2.1.3</SelectItem>
                  <SelectItem value="v2.1.4">v2.1.4</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SN</TableHead>
                    <TableHead>IMEI</TableHead>
                    <TableHead>EZBus Version</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Total Hours</TableHead>
                    <TableHead>Before Battery</TableHead>
                    <TableHead>After Battery</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Remarks</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDevices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell className="font-medium">{device.sn}</TableCell>
                      <TableCell className="font-mono text-sm">{device.imei}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{device.ezbusVersion}</Badge>
                      </TableCell>
                      <TableCell>{device.startTime ? format(device.startTime, "MMM dd, HH:mm") : "-"}</TableCell>
                      <TableCell>{device.endTime ? format(device.endTime, "MMM dd, HH:mm") : "-"}</TableCell>
                      <TableCell>{device.totalHours > 0 ? `${device.totalHours.toFixed(1)}h` : "-"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          {device.beforeBattery}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            device.afterBattery > 20
                              ? "bg-green-500"
                              : device.afterBattery > 10
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        ></div>
                        {device.afterBattery}%
                      </TableCell>
                      <TableCell>{getStatusBadge(device.status)}</TableCell>
                      <TableCell className="max-w-[150px] truncate">{device.remarks}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{device.notes}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setEditingDevice(device)}>Edit device</DropdownMenuItem>
                            {device.status === "running" && (
                              <DropdownMenuItem onClick={() => handleMarkCompleted(device.id)}>
                                Mark as completed
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteDevice(device.id)}>
                              Delete device
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredDevices.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">No devices found matching your criteria.</div>
            )}
          </CardContent>
        </Card>
      </div>

      {editingDevice && (
        <EditDeviceDialog
          device={editingDevice}
          onEditDevice={handleEditDevice}
          onClose={() => setEditingDevice(null)}
        />
      )}
    </SidebarInset>
   </SidebarProvider>
    </main>
  )
}
