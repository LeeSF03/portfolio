'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import { LucideChevronsDown, LucideChevronsUp } from 'lucide-react'

type CodeBlockProps = {
  code: string
  label: string
}
export default function CodeBlock({ code, label }: CodeBlockProps) {
  //=====States=====
  const [open, setOpen] = useState(false)

  //=====Callbacks=====
  const onToggle = () => {
    setOpen(!open)
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="w-fit rounded-xl border-2 border-gray-800 bg-red-400 p-2 font-jetbrains text-lg font-semibold shadow-[5px_5px_lightblue]">
        {label}
      </div>
      <div className="relative rounded-xl border-2 border-pink-400 bg-pink-300 shadow-[5px_5px_lightblue]">
        <div
          className={cn('h-32 overflow-hidden px-7', {
            'h-auto': open,
          })}
        >
          <code>
            <pre className="text-wrap text-left">{code}</pre>
          </code>
        </div>
        <div
          onClick={onToggle}
          className={cn(
            'group absolute bottom-0 flex h-8 w-full items-center justify-center rounded-b-xl hover:cursor-pointer',
            { 'bg-gradient-to-t from-pink-400 to-transparent': !open }
          )}
        >
          {open ? (
            <LucideChevronsUp className="-motion-translate-y-in-[5px] group-hover:-motion-translate-y-out-[5px]" />
          ) : (
            <LucideChevronsDown className="motion-translate-y-in-[5px] group-hover:motion-translate-y-out-[5px]" />
          )}
        </div>
      </div>
    </div>
  )
}
