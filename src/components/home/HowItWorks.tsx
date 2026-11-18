import { Search, Send, BookOpen, GraduationCap } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Explore Tuitions",
    description:
      "Browse tuition listings by subject, class, location, and learning mode.",
  },
  {
    number: "02",
    icon: Send,
    title: "Apply for Tuition",
    description:
      "Find your preferred tuition and submit an application to connect with the tutor.",
  },
  {
    number: "03",
    icon: BookOpen,
    title: "Start Learning",
    description:
      "Connect with your tutor, follow your learning schedule, and work toward your goals.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Simple Process
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How MentorLagbe Works
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Getting started with your learning journey is simple. Follow three
            easy steps to find the right tutor.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-2xl border bg-white p-6 transition-shadow hover:shadow-lg sm:p-8"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="rounded-xl bg-blue-50 p-4 text-blue-600">
                    <Icon className="h-7 w-7" />
                  </div>

                  <span className="text-4xl font-extrabold text-slate-100">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tutor CTA */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl bg-blue-50 p-6 sm:flex-row sm:p-8">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-white p-3 text-blue-600">
              <GraduationCap className="h-7 w-7" />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">Are you a tutor?</h3>

              <p className="mt-1 text-sm text-slate-600">
                Share your expertise and connect with students.
              </p>
            </div>
          </div>

          <a
            href="/sign-up"
            className="inline-flex shrink-0 items-center rounded-md bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Join as a Tutor
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
