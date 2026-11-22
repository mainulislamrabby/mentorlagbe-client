
"use client";

import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TuitionFiltersProps {
  search: string;
  subject: string;
  classLevel: string;
  mode: string;
  onSearchChange: (value: string) => void;
  onSubjectChange: (value: string | null) => void;
  onClassLevelChange: (value: string | null) => void;
  onModeChange: (value: string | null) => void;
  onReset: () => void;
}

export default function TuitionFilters({
  search,
  subject,
  classLevel,
  mode,
  onSearchChange,
  onSubjectChange,
  onClassLevelChange,
  onModeChange,
  onReset,
}: TuitionFiltersProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
      {/* Brand Accent */}
      <div className="h-1.5 bg-linear-to-r from-[#2563EB] via-[#3B82F6] to-[#F59E0B]" />

      <div className="space-y-5 p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
            <SlidersHorizontal className="size-5" />
          </div>

          <div>
            <h3 className="font-semibold text-[#0F172A]">
              Find Your Tuition
            </h3>
            <p className="text-xs text-[#64748B]">
              Search and filter available opportunities
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#2563EB]" />

            <Input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onSearchChange(search.trim());
                }
              }}
              placeholder="Search tuitions by title, tutor, or subject..."
              className="h-11 w-full border-blue-100 bg-blue-50/40 pl-9 text-[#0F172A] placeholder:text-[#94A3B8] focus-visible:border-[#2563EB] focus-visible:ring-[#2563EB]/20"
            />
          </div>

          <Button
            type="button"
            onClick={() => onSearchChange(search.trim())}
            className="h-11 bg-[#2563EB] px-6 text-white hover:bg-[#1D4ED8]"
          >
            <Search className="mr-2 size-4" />
            Search
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-4 border-t border-blue-100 pt-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Subject */}
          <div className="min-w-0 space-y-2">
            <label className="text-xs font-semibold text-[#475569]">
              Subject
            </label>

            <Select value={subject} onValueChange={onSubjectChange}>
              <SelectTrigger className="h-11 w-full min-w-0 border-blue-100 bg-blue-50/40 text-[#334155] focus:ring-[#2563EB]/20">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
                <SelectItem value="ICT">ICT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Class Level */}
          <div className="min-w-0 space-y-2">
            <label className="text-xs font-semibold text-[#475569]">
              Class Level
            </label>

            <Select value={classLevel} onValueChange={onClassLevelChange}>
              <SelectTrigger className="h-11 w-full min-w-0 border-blue-100 bg-blue-50/40 text-[#334155] focus:ring-[#2563EB]/20">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>

                {Array.from({ length: 12 }, (_, index) => (
                  <SelectItem key={index + 1} value={`Class ${index + 1}`}>
                    Class {index + 1}
                  </SelectItem>
                ))}

                <SelectItem value="HSC">HSC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mode */}
          <div className="min-w-0 space-y-2">
            <label className="text-xs font-semibold text-[#475569]">
              Mode
            </label>

            <Select value={mode} onValueChange={onModeChange}>
              <SelectTrigger className="h-11 w-full min-w-0 border-blue-100 bg-blue-50/40 text-[#334155] focus:ring-[#2563EB]/20">
                <SelectValue placeholder="All Modes" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Modes</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="Offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reset */}
          <div className="flex min-w-0 flex-col justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onReset}
              className="h-11 w-full border-blue-200 bg-blue-50/40 text-[#2563EB] hover:bg-blue-100 hover:text-[#1D4ED8]"
            >
              <RotateCcw className="mr-2 size-4" />
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
