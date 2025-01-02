"use client";
import { useRef } from "react";
import { ContactCard } from "@/components/ContactCard";
import { SkillCard } from "@/components/SkillCard";
import { MenuItemWithRef, Topbar } from "@/components/Topbar";
import Image from "next/image";

export default function Home() {
  //-----Variables-----
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactsRef = useRef<HTMLDivElement>(null);
  const menuItems: MenuItemWithRef[] = [
    { title: "About Me", ref: aboutMeRef },
    { title: "Skills", ref: skillsRef },
    { title: "Contacts", ref: contactsRef },
  ];

  return (
    <>
      <Topbar menuItemsWithRef={menuItems} />
      <div className="flex justify-center">
        <div className="max-w-4xl w-full p-5 xl:px-0 space-y-8">
          <div className="flex space-x-1">
            <div
              ref={(node) => {
                if (node) {
                  aboutMeRef.current = node;
                }
              }}
              className="bg-pink-100 p-10 rounded-2xl"
            >
              <div className="sm:flex sm:items-center">
                <Image
                  src={"/img/catpuccin.png"}
                  alt={"Catppuccin profile picture"}
                  width={200}
                  height={200}
                  className="mr-8"
                />
                <h2 className="text-7xl font-bold mt-8">About Me</h2>
              </div>
              <p className="text-lg mt-4 text-justify">
                Sup! I&apos;m LeeSF, and I&apos;m a software engineer.
                Graduating (In 2026) from Mila University (formerly known as
                MIU) with a Bachelor in Computer Engineering degree. I have a
                solid software development foundation, proficient in multiple
                languages, frameworks, and methodologies. Experienced in
                collaborative team efforts, eager to contribute to impactful
                projects. Currently learning more about Go, Azure, Kubernetes,
                Docker, PostgreSQL, GitHub Actions. Proficient in JavaScript,
                TypeScript, React, Next.JS, Python, Django, Laravel and Docker.
              </p>
              <h3 className="text-3xl font-bold mt-8">
                Oh, and I like Catppuccin!
              </h3>
            </div>
          </div>
          <div
            ref={(node) => {
              if (node) {
                skillsRef.current = node;
              }
            }}
            className="flex space-x-1"
          >
            <div className="bg-pink-100 p-10 rounded-2xl w-full">
              <h1 className="text-7xl font-bold">Skills</h1>
              <div className="flex mt-4 flex-wrap">
                <SkillCard title={"TypeScript"} img={"/img/typescript.svg"} />
                <SkillCard title={"React"} img={"/img/react.svg"} />
                <SkillCard title={"Next.JS"} img={"/img/nextjs.svg"} />
                <SkillCard title={"ExpoJS"} img={"/img/expojs.svg"} />
                <SkillCard title={"Laravel"} img={"/img/laravel.svg"} />
                <SkillCard title={"Python"} img={"/img/python.svg"} />
                <SkillCard title={"Django"} img={"/img/django.svg"} />
                <SkillCard title={"Docker"} img={"/img/docker.svg"} />
                <SkillCard title={"PostgreSQL"} img={"/img/postgresql.svg"} />
                <SkillCard title={"Azure"} img={"/img/azure.svg"} />
                {/* <SkillCard */}
                {/*   title={"TypeScript"} */}
                {/*   img={"https://cdn.worldvectorlogo.com/logos/typescript.svg"} */}
                {/* /> */}
                {/* <SkillCard */}
                {/*   title={"React"} */}
                {/*   img={"https://cdn.worldvectorlogo.com/logos/react-2.svg"} */}
                {/* /> */}
                {/* <SkillCard */}
                {/*   title={"Next.JS"} */}
                {/*   img={"https://cdn.worldvectorlogo.com/logos/next-js.svg"} */}
                {/* /> */}
                {/* <SkillCard */}
                {/*   title={"ExpoJS"} */}
                {/*   img={"https://cdn.worldvectorlogo.com/logos/expo-1.svg"} */}
                {/* /> */}
                {/* <SkillCard */}
                {/*   title={"Laravel"} */}
                {/*   img={"https://worldvectorlogo.com/logo/laravel-2"} */}
                {/* /> */}
                {/* <SkillCard */}
                {/*   title={"Python"} */}
                {/*   img={"https://cdn.worldvectorlogo.com/logos/python-5.svg"} */}
                {/* /> */}
                {/* <SkillCard */}
                {/*   title={"Django"} */}
                {/*   img={"https://cdn.worldvectorlogo.com/logos/django.svg"} */}
                {/* /> */}
                {/* <SkillCard */}
                {/*   title={"Docker"} */}
                {/*   img={"https://cdn.worldvectorlogo.com/logos/docker-4.svg"} */}
                {/* /> */}
                {/* <SkillCard */}
                {/*   title={"PostgreSQL"} */}
                {/*   img={"https://cdn.worldvectorlogo.com/logos/postgresql.svg"} */}
                {/* /> */}
                {/* <SkillCard */}
                {/*   title={"Azure"} */}
                {/*   img={"https://cdn.worldvectorlogo.com/logos/azure-2.svg"} */}
                {/* /> */}
              </div>
            </div>
          </div>
          <div
            ref={(node) => {
              if (node) {
                contactsRef.current = node;
              }
            }}
            className="flex space-x-1"
          >
            <div className="bg-pink-100 p-10 rounded-2xl w-full">
              <h1 className="text-7xl font-bold">Contacts</h1>
              <div className="flex mt-4 flex-wrap">
                <ContactCard
                  title={"GitHub"}
                  img={"/img/github.svg"}
                  link="https://github.com/LeeSF03"
                />
                <ContactCard
                  title={"LinkedIn"}
                  img={"/img/linkedin.svg"}
                  link={"https://www.linkedin.com/in/lee-shuen-fei-32479b203/"}
                />
                <ContactCard
                  title={"Email"}
                  img={"/img/outlook.svg"}
                  link={"mailto:1106222002@scholar.mila.edu.my"}
                />
                {/* <ContactCard */}
                {/*   title={"GitHub"} */}
                {/*   img={ */}
                {/*     "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg" */}
                {/*   } */}
                {/*   link="https://github.com/LeeSF03" */}
                {/* /> */}
                {/* <ContactCard */}
                {/*   title={"LinkedIn"} */}
                {/*   img={ */}
                {/*     "https://cdn.worldvectorlogo.com/logos/linkedin-icon-3.svg" */}
                {/*   } */}
                {/*   link={"https://www.linkedin.com/in/lee-shuen-fei-32479b203/"} */}
                {/* /> */}
                {/* <ContactCard */}
                {/*   title={"Email"} */}
                {/*   img={ */}
                {/*     "https://cdn.worldvectorlogo.com/logos/microsoft-outlook-2013-logo.svg" */}
                {/*   } */}
                {/*   link={"mailto:1106222002@scholar.mila.edu.my"} */}
                {/* /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
