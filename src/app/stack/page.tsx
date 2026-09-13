"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TechCard from "@/components/ui/TechCards";
import { ArrowLeftIcon } from "@/components/Icons";
import { Container, SectionHeader } from "@/components/Layout";

const StackPage = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Initial sync
    setIsDark(document.documentElement.classList.contains("dark"));

    // Dynamic sync using MutationObserver
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const data = [
    {
      title: "PostgreSQL",
      id: 0,
      main: "/icons/PostgresSQL.svg",
      desc: "PostgreSQL is a powerful, open-source relational database management system (RDBMS) known for its reliability, extensibility, and strong adherence to SQL standards. It handles complex queries, large datasets, and concurrent transactions efficiently. It supports advanced features like JSON/JSONB, full-text search, and geospatial data types, making it suitable for web applications, data analytics, and enterprise-level systems. PostgreSQL is ACID-compliant and offers robust security features, replication, and high availability options.",
      tag: "platform",
      bg: "bg-blue-50/20 dark:bg-blue-950/40",
      text: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "GitHub",
      id: 1,
      main: "/icons/github-original.svg",
      desc: "A developer's go-to platform for collaborating and showcasing their code.",
      tag: "platform",
      bg: "bg-zinc-100 dark:bg-zinc-800",
      text: "text-zinc-800 dark:text-zinc-100",
    },
    {
      title: "JavaScript",
      id: 2,
      main: "/icons/javascript-original.svg",
      desc: "A lightweight, interpreted, or just-in-time compiled programming language with first-class functions.",
      tag: "code",
      bg: "bg-yellow-50/20 dark:bg-yellow-950/20",
      text: "text-yellow-600 dark:text-yellow-400",
    },
    {
      title: "TypeScript",
      id: 3,
      main: "/icons/typescript-plain.svg",
      desc: "SuperScript of Javascript, made by microsoft with robust type safety.",
      tag: "code",
      bg: "bg-blue-50/20 dark:bg-blue-950/30",
      text: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Java",
      id: 4,
      main: "/icons/java-original.svg",
      desc: "A versatile, object-oriented language used for building web, mobile, and enterprise apps., secure, and platform-independent, making it ideal for scalable, cross-platform development.",
      tag: "code",
      bg: "bg-indigo-50/20 dark:bg-indigo-950/30",
      text: "text-indigo-600 dark:text-indigo-400",
    },
    {
      title: "C Language",
      id: 5,
      main: "/icons/c-original.svg",
      desc: "A general-purpose programming language that is extremely popular, simple, and flexible.",
      tag: "code",
      bg: "bg-pink-50 dark:bg-pink-950/30",
      text: "text-pink-600 dark:text-pink-400",
    },
    {
      title: "React JS",
      id: 6,
      main: "/icons/react-original.svg",
      desc: "A free and open-source front-end JavaScript library for building user interfaces based on components",
      tag: "develop",
      bg: "bg-cyan-50/20 dark:bg-cyan-950/30",
      text: "text-cyan-600 dark:text-cyan-400",
    },
    {
      title: "Next JS",
      id: 7,
      main: "/icons/next.js-logo.svg",
      desc: "An open-source web development framework providing React-based web applications.",
      tag: "develop",
      bg: "bg-zinc-150 dark:bg-zinc-800/60",
      text: "text-zinc-800 dark:text-zinc-100",
    },
    {
      title: "Tailwind CSS",
      id: 8,
      main: "/icons/tailwindcss-plain.svg",
      desc: "A utility-first CSS framework for rapidly building modern websites without ever leaving your HTML.",
      tag: "design",
      bg: "bg-teal-50/20 dark:bg-teal-950/30",
      text: "text-teal-600 dark:text-teal-400",
    },
    {
      title: "NodeJS",
      id: 9,
      main: "/icons/node-original.svg",
      desc: "A JavaScript runtime built on Chrome's V8 JavaScript engine.",
      tag: "develop",
      bg: "bg-green-50/20 dark:bg-green-950/20",
      text: "text-green-600 dark:text-green-400",
    },
    {
      title: "ExpressJS",
      id: 10,
      main: "/icons/express-original.svg",
      desc: "A minimal and flexible NodeJS web application framework that provides a robust set of features for building web and mobile applications.",
      tag: "develop",
      bg: "bg-orange-50/20 dark:bg-orange-950/20",
      text: "text-orange-600 dark:text-orange-400",
    },
    {
      title: "MongoDB",
      id: 11,
      main: "/icons/mongodb-original.svg",
      desc: "A document database with the scalability and flexibility that you want with the querying and indexing that you need.",
      tag: "platform",
      bg: "bg-emerald-50/20 dark:bg-emerald-950/20",
      text: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Python",
      id: 12,
      main: "/icons/Python.svg",
      desc: "A versatile, object-oriented language used for building web, mobile, and enterprise apps., secure, and platform-independent, making it ideal for scalable, cross-platform development.",
      tag: "code",
      bg: "bg-yellow-50/20 dark:bg-yellow-950/20",
      text: "text-yellow-600 dark:text-yellow-400",
    },
    {
      title: "VS Code",
      id: 13,
      main: "/icons/vscode-original.svg",
      desc: "A code editor that is used by developers to write code, it is lightweight, flexible, and has a lot of extensions that can be used to enhance the development experience.",
      tag: "platform",
      bg: "bg-blue-50/20 dark:bg-blue-950/30",
      text: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Postman",
      id: 14,
      main: "/icons/Postman.svg",
      desc: "A collaborative API platform for building, testing, and designing APIs.",
      tag: "platform",
      bg: "bg-orange-50/20 dark:bg-orange-950/20",
      text: "text-orange-600 dark:text-orange-400",
    },
  ];

  const [idNumber, setIdNumber] = useState(0);
  const [fadeState, setFadeState] = useState("opacity-100 translate-x-0");

  const triggerTransition = (nextId: number) => {
    // Step 1: Fade out & Slide left slightly
    setFadeState("opacity-0 -translate-x-3");

    setTimeout(() => {
      // Step 2: Switch details & Place card details off-screen right
      setIdNumber(nextId);
      setFadeState("opacity-0 translate-x-3");

      // Step 3: Fade in & Slide back to center smoothly
      requestAnimationFrame(() => {
        setTimeout(() => {
          setFadeState("opacity-100 translate-x-0");
        }, 20);
      });
    }, 150); // match tailwind duration-150 transition speed
  };

  const changeId = (id: number) => {
    if (id === idNumber) return;
    triggerTransition(id);
  };

  return (
    <Container className="min-h-screen pt-32 md:pt-48 pb-20 select-none relative z-10">
      <main className="w-full max-w-7xl mx-auto">
        <SectionHeader
          title="Stack"
          subtitle="Just like any other dev, I also spend more time searching and experimenting tools than actually coding some sensible things."
        />

        <div className="flex mx-auto justify-between mt-8 space-x-4 md:space-x-6 lg:space-x-8 items-center w-full max-w-2xl">
          <div className="bg-gradient-to-tr dark:from-[#dbfefe25] dark:via-[#f9f2ff10] dark:to-[#fff2ec20] from-[#dbfefe] via-[#f9f2ff] to-[#fff2ec] border border-border/40 flex p-3 py-3 sm:p-4 md:p-6 rounded-xl sm:rounded-[0.8rem] md:rounded-[1.2rem] lg:rounded-[1.6rem] items-center justify-center space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8 h-28 sm:h-32 md:h-36 shadow-xs w-full overflow-hidden shrink-0">
            <div className={`flex items-center space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8 w-full transition-all duration-150 ease-in-out transform ${fadeState}`}>
              <div className="basis-[30%] lg:basis-[25%] h-16 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 rounded-2xl shrink-0">
                <div className="flex mx-auto rounded-2xl relative w-full h-full bg-white shadow-xs p-1 md:p-2">
                  <Image
                    src={data[idNumber].main}
                    alt="tech"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="select-none p-1 sm:p-2 md:p-3 lg:p-4 h-full w-full flex mx-auto object-contain rounded-2xl"
                  />
                </div>
              </div>
              <div className="basis-[70%] lg:basis-[75%] text-left">
                <div className="flex mb-1.5 justify-between items-center gap-4">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-wide text-text-primary">
                    {data[idNumber].title}
                  </h3>
                  <div
                    className={`${data[idNumber].bg} ${data[idNumber].text} text-[0.6rem] sm:text-xs px-2 py-0.5 rounded-full h-max font-bold capitalize shadow-2xs`}
                  >
                    {data[idNumber].tag}
                  </div>
                </div>
                <p className="text-[0.65rem] sm:text-xs md:text-sm lg:text-base font-normal leading-relaxed text-text-secondary md:w-[95%] line-clamp-3">
                  {data[idNumber].desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pb-6 grid grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full items-center justify-items-center justify-center place-content-center">
          {data.map((obj) => (
            <TechCard
              id={obj.id}
              alt={obj.title}
              main={obj.main}
              key={obj.id}
              changeId={changeId}
            />
          ))}
        </div>

        <div className="mt-8 pb-10 flex justify-center">
          <Link href="/" className="group inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-all duration-300">
            <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>home</span>
          </Link>
        </div>
      </main>
    </Container>
  );
};

export default StackPage;