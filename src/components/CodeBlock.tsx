'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import { LucideChevronsDown, LucideChevronsUp } from 'lucide-react'

type CodeBlockProps = {
  code: string
}
export default function CodeBlock({ code }: CodeBlockProps) {
  //=====States=====
  const [open, setOpen] = useState(false)

  //=====Callbacks=====
  const onToggle = () => {
    setOpen(!open)
  }

  return (
    <div className="relative mt-3 rounded-xl border-2 border-pink-300 bg-pink-400">
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
          { 'bg-gradient-to-t from-pink-300 to-transparent': !open }
        )}
      >
        {open ? (
          <LucideChevronsUp className="-motion-translate-y-in-[5px] group-hover:-motion-translate-y-out-[5px]" />
        ) : (
          <LucideChevronsDown className="motion-translate-y-in-[5px] group-hover:motion-translate-y-out-[5px]" />
        )}
      </div>
    </div>
  )
}
