import Image from "next/image";
import {
  CalendarDays,
  MapPin,
  Wifi,
  Monitor,
  ArrowUpRight,
} from "lucide-react";

import type { Tuition } from "@/types/dataTypes";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

interface TuitionCardProps {
  tuition: Tuition;
}

export default function TuitionCard({ tuition }: TuitionCardProps) {
  const router = useRouter();
  return (
    <Card className="group flex h-full flex-col overflow-hidden border-blue-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/40 hover:shadow-xl hover:shadow-blue-100/60">
      {/* Banner Image */}
      <div className="relative aspect-video overflow-hidden bg-blue-50">
        {tuition.bannerImage ? (
          <Image
            src={tuition.bannerImage}
            alt={tuition.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-linear-to-br from-blue-100 via-blue-50 to-amber-50">
            <span className="text-5xl font-extrabold text-[#2563EB]/30">
              ML
            </span>
          </div>
        )}

        <Badge className="absolute left-3 top-3 border-0 bg-[#2563EB] text-white shadow-sm hover:bg-[#1D4ED8]">
          {tuition.mode}
        </Badge>

        <Badge className="absolute right-3 top-3 border-0 bg-[#F59E0B] text-white shadow-sm hover:bg-[#D97706]">
          {tuition.subject}
        </Badge>
      </div>

      {/* Tuition Information */}
      <CardHeader className="space-y-2 pb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
          {tuition.classLevel}
        </p>

        <CardTitle className="line-clamp-2 text-lg leading-snug text-[#0F172A] transition-colors group-hover:text-[#2563EB]">
          {tuition.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="space-y-3 text-sm text-[#64748B]">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0 text-[#2563EB]" />
            <span className="line-clamp-1">
              {tuition.location || "Not specified"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0 text-[#2563EB]" />
            <span>{tuition.daysPerWeek} days per week</span>
          </div>

          <div className="flex items-center gap-2">
            {tuition.mode === "Online" ? (
              <Wifi className="size-4 shrink-0 text-[#2563EB]" />
            ) : (
              <Monitor className="size-4 shrink-0 text-[#2563EB]" />
            )}
            <span>{tuition.mode} Tuition</span>
          </div>
        </div>

        <Separator className="bg-blue-100" />

        {/* Fee and Tutor */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-[#64748B]">Monthly Fee</p>
            <p className="text-xl font-bold text-[#2563EB]">
              ৳{tuition.monthlyFee.toLocaleString("en-BD")}
            </p>
          </div>

          <div className="min-w-0 text-right">
            <p className="text-xs text-[#64748B]">Posted by</p>
            <p className="truncate text-sm font-semibold text-[#0F172A]">
              {tuition.tutorName || "Tutor"}
            </p>
          </div>
        </div>
      </CardContent>

      {/* Details Button */}
      <CardFooter className="pt-0">
        <Button
          className="w-full bg-[#2563EB] text-white shadow-sm transition-colors hover:bg-[#1D4ED8]"
          onClick={() => router.push(`/tuitions/${tuition._id}`)}
        >
          View Details
          <ArrowUpRight className="ml-2 size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
