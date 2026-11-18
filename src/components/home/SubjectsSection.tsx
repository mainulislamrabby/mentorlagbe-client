import Link from "next/link";
import {
  Calculator,
  Atom,
  Code2,
  Languages,
  ShieldCheck,
  Monitor,
  Users,
} from "lucide-react";

const subjects = [
  {
    name: "Mathematics",
    description: "Build problem-solving skills",
    icon: Calculator,
    color: "bg-blue-50 text-blue-600",
  },
  {
    name: "Physics",
    description: "Understand the world around you",
    icon: Atom,
    color: "bg-purple-50 text-purple-600",
  },
  {
    name: "Programming",
    description: "Develop your coding skills",
    icon: Code2,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    name: "IELTS",
    description: "Prepare for international opportunities",
    icon: Languages,
    color: "bg-amber-50 text-amber-600",
  },
];

const highlights = [
  {
    icon: ShieldCheck,
    title: "Admin-Approved Listings",
    description:
      "Tuition listings are reviewed before appearing on the platform.",
  },
  {
    icon: Monitor,
    title: "Flexible Learning Modes",
    description:
      "Find learning opportunities for both online and offline sessions.",
  },
  {
    icon: Users,
    title: "Student & Tutor Community",
    description:
      "A platform designed to bring students and tutors together.",
  },
];

const SubjectsSection = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Subjects */}
        <div className="mb-14">
          <div className="mb-8 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Explore Subjects
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Learn What Matters to You
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Explore popular subjects and find tutors who can help you
              reach your learning goals.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {subjects.map((subject) => {
              const Icon = subject.icon;

              return (
                <Link
                  key={subject.name}
                  href="/tuitions"
                  className="group rounded-2xl border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`mb-5 inline-flex rounded-xl p-4 ${subject.color}`}>
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                    {subject.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {subject.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Platform Highlights */}
        <div className="rounded-3xl bg-slate-950 px-6 py-10 sm:px-10 sm:py-14">
          <div className="mb-10 max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Why MentorLagbe
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A Better Way to Connect & Learn
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Discover learning opportunities through a platform designed
              to make finding tutors and managing tuition easier.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((highlight) => {
              const Icon = highlight.icon;

              return (
                <div key={highlight.title} className="space-y-4">
                  <div className="inline-flex rounded-xl bg-blue-600/15 p-3 text-blue-400">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-semibold text-white">
                    {highlight.title}
                  </h3>

                  <p className="text-sm leading-6 text-slate-400">
                    {highlight.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubjectsSection;