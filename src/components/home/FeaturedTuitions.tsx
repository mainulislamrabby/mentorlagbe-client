"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";

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
    <section
      id="featured-tuitions"
      className="container mx-auto space-y-8 px-4 py-16"
    >
      <div className="text-center">
        <p className="font-semibold text-primary">Find Your Opportunity</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">
          Featured Tuitions
        </h2>
        <p className="mt-3 text-muted-foreground">
          Explore the latest available tuition opportunities.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : tuitions.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          No featured tuitions available right now.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tuitions.map((tuition) => (
            <Card
              key={tuition._id}
              className="flex h-full flex-col border-blue-100 shadow-sm transition-shadow hover:shadow-md"
            >
              <CardHeader className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge>{tuition.mode}</Badge>
                  <Badge variant="secondary">{tuition.subject}</Badge>
                </div>

                <h3 className="line-clamp-2 text-lg font-bold">
                  {tuition.title}
                </h3>
              </CardHeader>

              <CardContent className="flex-1 space-y-3">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">Class Level</span>
                  <span className="font-medium text-right">
                    {tuition.classLevel}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">Tutor</span>
                  <span className="font-medium text-right">
                    {tuition.tutorName}
                  </span>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm text-muted-foreground">Monthly Fee</p>
                  <p className="text-2xl font-bold text-primary">
                    ৳{tuition.monthlyFee.toLocaleString("en-BD")}
                  </p>
                </div>
              </CardContent>

              <CardFooter>
                <Link
                  href={`/tuitions/${tuition._id}`}
                  className="block w-full"
                >
                  <Button className="w-full">
                    View Details
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedTuitions;
