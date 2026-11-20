"use client";

import { ImagePlus, UploadCloud } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BannerImageUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFileName?: string;
}

const BannerImageUpload = ({
  onFileSelect,
  selectedFileName,
}: BannerImageUploadProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    onFileSelect(file);
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="bannerImage">Tuition Banner Image</Label>

      <label
        htmlFor="bannerImage"
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition-colors hover:border-blue-400 hover:bg-blue-50/50"
      >
        <div className="mb-3 rounded-full bg-blue-100 p-3 text-blue-600">
          {selectedFileName ? (
            <ImagePlus size={25} />
          ) : (
            <UploadCloud size={25} />
          )}
        </div>

        <p className="text-sm font-semibold text-slate-700">
          {selectedFileName || "Click to upload a banner image"}
        </p>

        <p className="mt-1 text-xs text-slate-500">PNG, JPG or JPEG</p>
      </label>

      <Input
        id="bannerImage"
        name="bannerImage"
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default BannerImageUpload;
