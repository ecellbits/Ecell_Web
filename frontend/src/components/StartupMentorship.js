
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const sessions = [
  {
    number: "01",
    date: "18 OCT",
    title: "Problem, Customer & ICP",
    description:
      "Understand your customers, sharpen your problem statement, identify your ideal customer profile, and discover why now is the right time.",
  },
  {
    number: "02",
    date: "01 NOV*",
    title: "MVP & Product Validation",
    description:
      "Learn what to build first, what to skip, and how to validate your product with real users.",
  },
  {
    number: "03",
    date: "15 NOV*",
    title: "Business Model & Unit Economics",
    description:
      "Explore customer acquisition costs, lifetime value, burn rate, and early monetisation.",
  },
  {
    number: "04",
    date: "22 NOV*",
    title: "Market, Competition & GTM",
    description:
      "Map your market, understand competitors, position your startup, and plan for your first 100 customers.",
  },
  {
    number: "05",
    date: "DEC — WEEK 3*",
    title: "Fundraising Strategy",
    description:
      "Understand how investors evaluate startups, what makes a pitch deck fundable, and common fundraising mistakes.",
  },
];

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6 },
};

const StartupMentorship = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080b12] text-white font-manrope">
      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-center justify-center px-6 py-28 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-[#d4ff00]/10 blur-[140px]" />

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto max-w-5xl"
        >

          <h1 className="font-syne text-5xl font-extrabold leading-tight tracking-tight md:text-7xl lg:text-8xl">
            Build Beyond
            <br />
            <span className="text-[#d4ff00]">The Idea.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-gray-300 md:text-xl">
            Five sessions. Real startup experience. Practical feedback.
            From finding the right problem to preparing for fundraising,
            take your startup to its next stage.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              to="/mentor-connect"
              className="rounded-full bg-[#d4ff00] px-9 py-4 font-bold text-black no-underline transition hover:scale-105 hover:bg-white"
            >
              Apply for Mentorship →
            </Link>

            <a
              href="#roadmap"
              className="rounded-full border border-white/30 px-9 py-4 font-semibold text-white no-underline transition hover:border-[#d4ff00] hover:text-[#d4ff00]"
            >
              Explore the Program ↓
            </a>
          </div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section className="relative px-6 py-24">
        <motion.div
          {...reveal}
          className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2"
        >
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#d4ff00]">
              About the program
            </p>

            <h2 className="font-syne text-4xl font-bold leading-tight md:text-5xl">
              Your startup deserves
              <span className="text-[#d4ff00]"> more than advice.</span>
            </h2>
          </div>

          <div className="text-lg leading-8 text-gray-300">
            <p>
              The Startup Mentorship Program is a five-session learning
              experience for early-stage founders, designed to turn
              entrepreneurial questions into practical next steps.
            </p>
            <p className="mt-5">
              Explore problem discovery, product validation, business
              fundamentals, go-to-market strategies, and fundraising
              with guidance shaped by real startup experience.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ROADMAP */}
      
{/* ROADMAP — BORDERLESS GLOWING TIMELINE */}
  <section
   id="roadmap" className="relative scroll-mt-32 px-6 py-16 md:py-24"
  >
  <div className="mx-auto max-w-5xl">
    <motion.div {...reveal} className="mb-16 text-center">
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#d4ff00]">
        THE JOURNEY
      </p>

      <h2 className="font-syne text-4xl font-bold md:text-6xl">
        Five Sessions.{" "}
        <span className="text-[#d4ff00]">One Journey.</span>
      </h2>

      <p className="mt-5 text-gray-400">
        From understanding your customers to fundraising readiness.
      </p>
    </motion.div>

    <div className="relative">
      {sessions.map((session, index) => {
        // Update these statuses when confirmed by organizers.
        // Options: "upcoming", "live", "completed"
        const statuses = [
          "upcoming",
          "upcoming",
          "upcoming",
          "upcoming",
          "upcoming",
        ];

        const status = statuses[index];
        const isLive = status === "live";
        const isCompleted = status === "completed";

        return (
          <motion.div
            key={session.number}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
            }}
            className="relative flex gap-5 md:gap-12"
          >
            {/* Session number and connecting line */}
            <div className="flex w-16 shrink-0 flex-col items-center md:w-24">
              <motion.span
                animate={
                  isLive
                    ? {
                        opacity: [1, 0.6, 1],
                        textShadow: [
                          "0 0 6px #d4ff00",
                          "0 0 28px #d4ff00",
                          "0 0 6px #d4ff00",
                        ],
                      }
                    : {}
                }
                transition={
                  isLive
                    ? {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : {}
                }
                className={`relative z-10 font-syne text-4xl font-extrabold md:text-6xl ${
                  isLive
                    ? "text-[#d4ff00]"
                    : isCompleted
                    ? "text-green-400"
                    : "text-gray-500"
                }`}
              >
                {session.number}
              </motion.span>

              {index !== sessions.length - 1 && (
                <div
                  className={`my-4 w-px flex-1 ${
                    isCompleted
                      ? "bg-green-400/60"
                      : "bg-white/20"
                  }`}
                />
              )}
            </div>

            {/* Event details —*/}
            <div className="min-w-0 flex-1 pb-16 md:pb-20">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#d4ff00]">
                  {session.date}
                </span>

                {isLive && (
                  <span className="flex items-center gap-2 text-xs font-bold uppercase text-[#d4ff00]">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#d4ff00]" />
                    In Progress
                  </span>
                )}

                {isCompleted && (
                  <span className="text-xs font-bold uppercase text-green-400">
                    ✓ Completed
                  </span>
                )}

                {status === "upcoming" && (
                  <span className="text-xs uppercase text-gray-500">
                    Upcoming
                  </span>
                )}
              </div>

              <h3 className="font-syne text-2xl font-bold text-white md:text-3xl">
                {session.title}
              </h3>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-400">
                {session.description}
              </p>
            </div>
          </motion.div>
        );
      })}
     </div>

    <p className="text-center text-sm text-gray-500">
      * Dates are tentative and subject to confirmation.
     </p>
   </div>
   </section>
   </div>
  );
};

export default StartupMentorship;
