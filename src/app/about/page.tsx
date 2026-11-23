import Link from "next/link";
import {
  GraduationCap,
  Users,
  Target,
  BookOpen,
  ArrowRight,
  Heart,
} from "lucide-react";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
            <GraduationCap size={16} />
            About MentorLagbe
          </span>

          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Connecting Students with the Right Tutors
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            MentorLagbe is a smart tuition and mentorship platform designed to
            make finding the right tutor and discovering teaching opportunities
            easier for everyone.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Our Mission
            </span>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Making Quality Education More Accessible
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              We believe every student deserves access to the right educational
              guidance, and every tutor deserves an opportunity to share their
              knowledge.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Our goal is to simplify the tuition-finding process through
              technology, helping students and tutors connect in one convenient
              place.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-blue-600 p-6 text-white">
              <GraduationCap size={36} />
              <h3 className="mt-5 text-xl font-bold">For Students</h3>
              <p className="mt-2 text-sm leading-6 text-blue-100">
                Discover suitable tutors and find learning opportunities.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900 p-6 text-white">
              <Users size={36} />
              <h3 className="mt-5 text-xl font-bold">For Tutors</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Share your expertise and discover teaching opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              What We Stand For
            </span>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Our Core Values
            </h2>

            <p className="mt-4 text-slate-600">
              The principles that guide our platform and community.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Right Connections",
                description:
                  "Helping students and tutors find opportunities that match their needs.",
              },
              {
                icon: Heart,
                title: "Student Focus",
                description:
                  "Keeping students' learning needs at the center of everything we do.",
              },
              {
                icon: BookOpen,
                title: "Better Learning",
                description:
                  "Encouraging meaningful educational connections and knowledge sharing.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-7 transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl bg-blue-600 px-6 py-14 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold">
            Be Part of the MentorLagbe Community
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Whether you are looking for a tutor or searching for teaching
            opportunities, your journey starts here.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Explore MentorLagbe
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
