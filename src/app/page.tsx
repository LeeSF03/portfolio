'use client'
import { useRef } from 'react'
import { ContactCard } from '@/components/ContactCard'
import { SkillCard } from '@/components/SkillCard'
import { MenuItemWithRef, Topbar } from '@/components/Topbar'
import Image from 'next/image'
import { pages, publicRoot } from '@/constants/global'
import { DropdownMenuNav } from '@/components/DropdownMenuNav'

export default function HomePage() {
  //-----Variables-----
  const aboutMeRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const contactsRef = useRef<HTMLDivElement>(null)
  const menuItems: MenuItemWithRef[] = [
    { title: 'About Me', ref: aboutMeRef },
    { title: 'Skills', ref: skillsRef },
    { title: 'Contacts', ref: contactsRef },
  ]

  return (
    <>
      <div className="flex flex-row-reverse">
        <DropdownMenuNav pages={pages} />
      </div>
      <Topbar menuItemsWithRef={menuItems} />
      <div className="flex flex-1 justify-center">
        <div className="w-full space-y-8 pt-5">
          <div
            ref={(node) => {
              if (node) {
                aboutMeRef.current = node
              }
            }}
            className="rounded-2xl border-4 border-gray-800 bg-pink-100 p-10 shadow-[7px_7px]"
          >
            <div className="flex flex-col items-center rounded-3xl border-4 border-gray-800 p-3 shadow-[9px_9px_lightblue] sm:flex-row sm:rounded-full">
              <Image
                src={'/img/catpuccin.png'}
                alt={'Catppuccin profile picture'}
                width={200}
                height={200}
                className="rounded-full sm:mr-8"
              />
              <h2 className="text-6xl font-bold">About Me</h2>
            </div>
            <div className="flex w-full justify-center py-4">
              <div className="w-full max-w-xl">
                <div className="flex items-center py-1">
                  <Image
                    src={'/img/star.png'}
                    width={26}
                    height={20}
                    alt={'star point'}
                    className="mr-2"
                  />
                  <span className="text-xl font-bold">Name: Lee Shuen Fei</span>
                </div>
                <div className="flex items-center py-1">
                  <Image
                    src={'/img/star.png'}
                    width={26}
                    height={20}
                    alt={'star point'}
                    className="mr-2"
                  />
                  <span className="text-xl font-bold">
                    Majoring: Bachelor in Computer Engineering
                  </span>
                </div>
                <div className="flex items-center py-1">
                  <Image
                    src={'/img/star.png'}
                    width={26}
                    height={20}
                    alt={'star point'}
                    className="mr-2"
                  />
                  <span className="text-xl font-bold">
                    University: Mila University (formerly known as MIU)
                  </span>
                </div>
                <div className="flex items-center py-1">
                  <Image
                    src={'/img/star.png'}
                    width={26}
                    height={20}
                    alt={'star point'}
                    className="mr-2"
                  />
                  <span className="text-xl font-bold">
                    Hobbies: Reading (Math, Programming, Manga), Programming,
                    Tinkering my Neovim config
                  </span>
                </div>
              </div>
            </div>

            <h3 className="mt-8 text-3xl font-bold">
              Oh, and I like Catppuccin!
            </h3>
          </div>
          <div
            ref={(node) => {
              if (node) {
                skillsRef.current = node
              }
            }}
            className="rounded-2xl border-4 border-gray-800 bg-pink-100 shadow-[7px_7px]"
          >
            <div className="w-full rounded-2xl bg-pink-100 p-10">
              <h1 className="text-6xl font-bold">Skills</h1>
              <div className="mt-4 flex flex-wrap">
                <SkillCard
                  title={'TypeScript'}
                  img={`${publicRoot}/img/typescript.svg`}
                  alt={'TypeScript logo'}
                />
                <SkillCard
                  title={'React'}
                  img={`${publicRoot}/img/react.svg`}
                  alt={'React logo'}
                />
                <SkillCard
                  title={'Next.JS'}
                  img={`${publicRoot}/img/nextjs.svg`}
                  alt={'Next.JS logo'}
                />
                <SkillCard
                  title={'ExpoJS'}
                  img={`${publicRoot}/img/expojs.svg`}
                  alt={'ExpoJS logo'}
                />
                <SkillCard
                  title={'Laravel'}
                  img={`${publicRoot}/img/laravel.svg`}
                  alt={'Laravel logo'}
                />
                <SkillCard
                  title={'Python'}
                  img={`${publicRoot}/img/python.svg`}
                  alt={'Python logo'}
                />
                <SkillCard
                  title={'Django'}
                  img={`${publicRoot}/img/django.svg`}
                  alt={'Django logo'}
                />
                <SkillCard
                  title={'Ansible'}
                  img={`${publicRoot}/img/ansible.svg`}
                  alt={'Ansible logo'}
                />
                <SkillCard
                  title={'Nginx'}
                  img={`${publicRoot}/img/nginx.svg`}
                  alt={'Nginx logo'}
                />
                <SkillCard
                  title={'Docker'}
                  img={`${publicRoot}/img/docker.svg`}
                  alt={'Docker logo'}
                />
                <SkillCard
                  title={'PostgreSQL'}
                  img={`${publicRoot}/img/postgresql.svg`}
                  alt={'PostgreSQL logo'}
                />
                <SkillCard
                  title={'Azure'}
                  img={`${publicRoot}/img/azure.svg`}
                  alt={'Azure logo'}
                />
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
                contactsRef.current = node
              }
            }}
            className="rounded-2xl border-4 border-gray-800 bg-pink-100 shadow-[7px_7px]"
          >
            <div className="w-full rounded-2xl bg-pink-100 p-10">
              <h1 className="text-6xl font-bold">Contacts</h1>
              <div className="mt-4 flex flex-wrap">
                <ContactCard
                  title={'GitHub'}
                  img={`${publicRoot}/img/github.svg`}
                  link="https://github.com/LeeSF03"
                />
                <ContactCard
                  title={'LinkedIn'}
                  img={`${publicRoot}/img/linkedin.svg`}
                  link={'https://www.linkedin.com/in/lee-shuen-fei-32479b203/'}
                />
                {/* <ContactCard */}
                {/*   title={'Resume'} */}
                {/*   img={`${publicRoot}/img/resume.png`} */}
                {/*   link={`${publicRoot}/file/leesf_resume.pdf`} */}
                {/* /> */}
                <ContactCard
                  title={'Email'}
                  img={`${publicRoot}/img/outlook.svg`}
                  link={'mailto:1106222002@scholar.mila.edu.my'}
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
  )
}
