"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, ArrowRight} from "lucide-react";

import { getBrowseTuitions } from "@/lib/actions/tutor";
import type { Tuition } from "@/types/dataTypes";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const FeaturedTuitions = () => {
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const data = await getBrowseTuitions({
          page: 1,
          limit: 6,
        });

        setTuitions(data.tuitions);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load featured tuitions.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTuitions();
  }, []);

  return (
    <section id="featured-tuitions" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl space-y-10 px-4">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Find Your Opportunity
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Featured Tuitions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Explore the latest available tuition opportunities and connect with
            the right learning opportunities.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="size-8 animate-spin text-blue-600" />
          </div>
        ) : tuitions.length === 0 ? (
          <p className="py-12 text-center text-slate-500">
            No featured tuitions available right now.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tuitions.map((tuition) => (
              <Card
                key={tuition._id}
                className="flex h-full flex-col rounded-2xl border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <CardHeader className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="border-0 bg-blue-100 text-blue-700 hover:bg-blue-100">
                      {tuition.mode}
                    </Badge>

                    <Badge className="border-0 bg-amber-100 text-amber-700 hover:bg-amber-100">
                      {tuition.subject}
                    </Badge>
                  </div>

                  <h3 className="line-clamp-2 text-lg font-bold text-slate-900">
                    {tuition.title}
                  </h3>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500">Class Level</span>
                    <span className="text-right font-semibold text-slate-800">
                      {tuition.classLevel}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500">Tutor</span>
                    <span className="text-right font-semibold text-slate-800">
                      {tuition.tutorName}
                    </span>
                  </div>

                  <div className="rounded-xl bg-blue-50 p-4">
                    <p className="text-sm font-medium text-blue-700">
                      Monthly Fee
                    </p>
                    <p className="mt-1 text-2xl font-bold text-blue-600">
                      ৳{tuition.monthlyFee.toLocaleString("en-BD")}
                    </p>
                  </div>
                </CardContent>

                <CardFooter>
                  <Link
                    href={`/tuitions/${tuition._id}`}
                    className="block w-full"
                  >
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                      View Details
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedTuitions;
