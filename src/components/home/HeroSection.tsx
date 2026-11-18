import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="overflow-hidden bg-slate-50">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
        {/* Content */}
        <div className="space-y-7">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Your learning journey starts here
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Find Your Ideal
            <span className="block text-blue-600">Tutor & Mentor</span>
            <span className="block">Today</span>
          </h1>

          <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Connect with qualified tutors, explore personalized learning
            opportunities, and find the guidance you need to reach your goals.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/tuitions"
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Browse Tuitions
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/sign-up"
              className="inline-flex items-center rounded-md border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Become a Tutor
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 pt-3 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              Personalized Learning
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Expert Tutors
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-amber-200/60 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-blue-200/60 blur-3xl" />

          <div className="relative rounded-3xl bg-blue-600 p-5 sm:p-8">
            <div className="rounded-2xl bg-white p-5 shadow-xl sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Learning made simple</p>
                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    Your path to success
                  </h3>
                </div>

                <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
                  <GraduationCap className="h-7 w-7" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                  <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
                    <BookOpen className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      Find the right tutor
                    </p>
                    <p className="text-sm text-slate-500">
                      Explore subjects & tuition
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                  <div className="rounded-lg bg-amber-100 p-3 text-amber-600">
                    <Users className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      Connect & apply
                    </p>
                    <p className="text-sm text-slate-500">
                      Meet your learning mentor
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-sm font-medium text-blue-700">
                    Start learning. Keep growing.
                  </p>
                  <div className="mt-3 h-2 rounded-full bg-blue-100">
                    <div className="h-2 w-2/3 rounded-full bg-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 top-8 rounded-xl bg-white px-4 py-3 shadow-lg sm:-left-6">
              <p className="text-xs text-slate-500">Learning</p>
              <p className="font-bold text-blue-600">Made for you ✨</p>
            </div>

            <div className="absolute -bottom-4 -right-3 rounded-xl bg-amber-400 px-4 py-3 shadow-lg sm:-right-5">
              <p className="text-sm font-bold text-slate-900">Learn smarter!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
