"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface EditDeviceDialogProps {
  device: any
  onEditDevice: (device: any) => void
  onClose: () => void
}

export function EditDeviceDialog({ device, onEditDevice, onClose }: EditDeviceDialogProps) {
  const [formData, setFormData] = useState({
    id: "",
    sn: "",
    imei: "",
    ezbusVersion: "",
    startTime: null as Date | null,
    endTime: null as Date | null,
    totalHours: 0,
    beforeBattery: 100,
    afterBattery: 0,
    status: "pending",
    remarks: "",
    notes: "",
  })

  useEffect(() => {
    if (device) {
      setFormData({
        id: device.id,
        sn: device.sn,
        imei: device.imei,
        ezbusVersion: device.ezbusVersion,
        startTime: device.startTime,
        endTime: device.endTime,
        totalHours: device.totalHours,
        beforeBattery: device.beforeBattery,
        afterBattery: device.afterBattery,
        status: device.status,
        remarks: device.remarks,
        notes: device.notes,
      })
    }
  }, [device])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onEditDevice(formData)
  }

  return (
    <Dialog open={!!device} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Stress Test Device</DialogTitle>
          <DialogDescription>Update the device information and test results.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sn">Serial Number</Label>
                <Input
                  id="sn"
                  value={formData.sn}
                  onChange={(e) => setFormData({ ...formData, sn: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="imei">IMEI</Label>
                <Input
                  id="imei"
                  value={formData.imei}
                  onChange={(e) => setFormData({ ...formData, imei: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="version">EZBus Version</Label>
                <Select
                  value={formData.ezbusVersion}
                  onValueChange={(value) => setFormData({ ...formData, ezbusVersion: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="v2.1.2">v2.1.2</SelectItem>
                    <SelectItem value="v2.1.3">v2.1.3</SelectItem>
                    <SelectItem value="v2.1.4">v2.1.4</SelectItem>
                    <SelectItem value="v2.2.0">v2.2.0</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Start Time</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !formData.startTime && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startTime ? format(formData.startTime, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.startTime || undefined}
                      onSelect={(date) => setFormData({ ...formData, startTime: date || null })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label>End Time</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !formData.endTime && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endTime ? format(formData.endTime, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.endTime || undefined}
                      onSelect={(date) => setFormData({ ...formData, endTime: date || null })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="totalHours">Total Hours</Label>
                <Input
                  id="totalHours"
                  type="number"
                  step="0.1"
                  value={formData.totalHours}
                  onChange={(e) => setFormData({ ...formData, totalHours: Number.parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="beforeBattery">Before Battery (%)</Label>
                <Input
                  id="beforeBattery"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.beforeBattery}
                  onChange={(e) => setFormData({ ...formData, beforeBattery: Number.parseInt(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="afterBattery">After Battery (%)</Label>
                <Input
                  id="afterBattery"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.afterBattery}
                  onChange={(e) => setFormData({ ...formData, afterBattery: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Input
                id="remarks"
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update Device</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
