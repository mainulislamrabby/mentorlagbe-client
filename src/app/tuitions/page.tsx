"use client";

import { useEffect, useState } from "react";
import { Search, GraduationCap, BookOpen } from "lucide-react";
import { toast } from "sonner";

import { getBrowseTuitions } from "@/lib/actions/tutor";
import TuitionCard from "@/components/tuitions/TuitionCard";
import TuitionFilters from "@/components/tuitions/TuitionFilters";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import type { Tuition } from "@/types/dataTypes";

export default function BrowseTuitionsPage() {
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("all");
  const [classLevel, setClassLevel] = useState("all");
  const [mode, setMode] = useState("all");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTuitions, setTotalTuitions] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchTuitions = async () => {
      try {
        const data = await getBrowseTuitions({
          search,
          subject: subject === "all" ? undefined : subject,
          classLevel: classLevel === "all" ? undefined : classLevel,
          mode: mode === "all" ? undefined : mode,
          page,
          limit: 6,
        });

        if (!cancelled) {
          setTuitions(data.tuitions);
          setTotalPages(data.totalPages);
          setTotalTuitions(data.total);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(
            error instanceof Error ? error.message : "Failed to load tuitions.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchTuitions();

    return () => {
      cancelled = true;
    };
  }, [search, subject, classLevel, mode, page]);

  const resetFilters = () => {
    setLoading(true);
    setSearch("");
    setSubject("all");
    setClassLevel("all");
    setMode("all");
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-blue-100 bg-linear-to-br from-blue-50 via-white to-amber-50">
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 size-72 rounded-full bg-amber-100/50 blur-3xl" />

        <div className="container relative mx-auto px-4 py-16 text-center sm:py-20">
          <Badge className="mb-5 border border-blue-200 bg-blue-100 px-4 py-1.5 text-[#2563EB] hover:bg-blue-100">
            <GraduationCap className="mr-2 size-4" />
            Find Your Perfect Tuition
          </Badge>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
            Explore{" "}
            <span className="text-[#2563EB]">Tuition Opportunities</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#64748B] sm:text-base">
            Discover quality tuition opportunities and connect with experienced
            tutors who match your learning needs.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm text-[#334155] shadow-sm">
              <BookOpen className="size-4 text-[#2563EB]" />
              Quality Learning
            </div>

            <div className="flex items-center gap-2 rounded-full border border-amber-100 bg-white/80 px-4 py-2 text-sm text-[#334155] shadow-sm">
              <GraduationCap className="size-4 text-[#F59E0B]" />
              Experienced Tutors
            </div>
          </div>
        </div>
      </section>

      {/* Tuition Listings */}
      <section className="container mx-auto space-y-8 px-4 py-10 sm:py-14">
        <TuitionFilters
          search={search}
          subject={subject}
          classLevel={classLevel}
          mode={mode}
          onSearchChange={(value) => {
            setLoading(true);
            setPage(1);
            setSearch(value);
          }}
          onSubjectChange={(value) => {
            setLoading(true);
            setPage(1);
            setSubject(value || "all");
          }}
          onClassLevelChange={(value) => {
            setLoading(true);
            setPage(1);
            setClassLevel(value || "all");
          }}
          onModeChange={(value) => {
            setLoading(true);
            setPage(1);
            setMode(value || "all");
          }}
          onReset={resetFilters}
        />

        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-1 rounded-full bg-[#2563EB]" />
              <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">
                Available Tuitions
              </h2>
            </div>

            <p className="mt-2 text-sm text-[#64748B]">
              Browse the latest approved tuition listings.
            </p>
          </div>

          <Badge className="border border-blue-100 bg-blue-50 px-3 py-1.5 text-[#2563EB] hover:bg-blue-50">
            {totalTuitions} Tuitions
          </Badge>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden border-blue-100">
                <div className="aspect-video animate-pulse bg-blue-50" />
                <CardContent className="space-y-3 p-5">
                  <div className="h-4 w-1/3 animate-pulse rounded bg-blue-100" />
                  <div className="h-6 w-3/4 animate-pulse rounded bg-slate-100" />
                  <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : tuitions.length === 0 ? (
          <Card className="border-blue-100 bg-white shadow-sm">
            <CardContent className="py-16 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-blue-50">
                <Search className="size-7 text-[#2563EB]" />
              </div>

              <h3 className="text-lg font-semibold text-[#0F172A]">
                No Tuitions Found
              </h3>

              <p className="mt-2 text-sm text-[#64748B]">
                Try changing your search or filter options.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1D4ED8]"
              >
                Clear Filters
              </button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tuitions.map((tuition) => (
              <TuitionCard key={tuition._id} tuition={tuition} />
            ))}
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              disabled={page === 1}
              onClick={() => {
                setLoading(true);
                setPage((prev) => prev - 1);
              }}
              className="rounded-lg border border-blue-100 px-4 py-2 text-sm font-medium text-[#2563EB] transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => {
                    setLoading(true);
                    setPage(pageNumber);
                  }}
                  className={`size-10 rounded-lg text-sm font-semibold transition-colors ${
                    page === pageNumber
                      ? "bg-[#2563EB] text-white"
                      : "border border-blue-100 text-[#2563EB] hover:bg-blue-50"
                  }`}
                >
                  {pageNumber}
                </button>
              ),
            )}

            <button
              disabled={page === totalPages}
              onClick={() => {
                setLoading(true);
                setPage((prev) => prev + 1);
              }}
              className="rounded-lg border border-blue-100 px-4 py-2 text-sm font-medium text-[#2563EB] transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
