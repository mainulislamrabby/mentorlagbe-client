
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Tuition } from "@/components/dashboard/tutor/TuitionCard";

export type TuitionFormData = {
  title: string;
  subject: string;
  classLevel: string;
  mode: "Online" | "Offline";
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  bannerImage: string;
  description: string;
};

interface EditTuitionDialogProps {
  tuition: Tuition;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: TuitionFormData) => Promise<void>;
}

const EditTuitionDialog = ({
  tuition,
  open,
  onOpenChange,
  onSave,
}: EditTuitionDialogProps) => {
  const [formData, setFormData] = useState<TuitionFormData>({
    title: tuition.title,
    subject: tuition.subject,
    classLevel: tuition.classLevel,
    mode: tuition.mode,
    location: tuition.location,
    monthlyFee: tuition.monthlyFee,
    daysPerWeek: tuition.daysPerWeek,
    bannerImage: tuition.bannerImage ?? "",
    description: tuition.description || "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    field: keyof TuitionFormData,
    value: string | number,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      setSaving(true);
      await onSave(formData);
      onOpenChange(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update tuition.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Tuition</DialogTitle>
          <DialogDescription>
            Update the information for your tuition listing.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Tuition Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="classLevel">Class Level</Label>
              <Input
                id="classLevel"
                value={formData.classLevel}
                onChange={(e) => handleChange("classLevel", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Tuition Mode</Label>
              <Select
                value={formData.mode}
                onValueChange={(value) => {
                  if (value === "Online" || value === "Offline") {
                    handleChange("mode", value);
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyFee">Monthly Fee (৳)</Label>
              <Input
                id="monthlyFee"
                type="number"
                min="1"
                value={formData.monthlyFee}
                onChange={(e) =>
                  handleChange("monthlyFee", Number(e.target.value))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="daysPerWeek">Days Per Week</Label>
              <Input
                id="daysPerWeek"
                type="number"
                min="1"
                max="7"
                value={formData.daysPerWeek}
                onChange={(e) =>
                  handleChange("daysPerWeek", Number(e.target.value))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bannerImage">Banner Image URL</Label>
              <Input
                id="bannerImage"
                type="url"
                value={formData.bannerImage}
                onChange={(e) => handleChange("bannerImage", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={5}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTuitionDialog;
