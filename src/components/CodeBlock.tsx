'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import { LucideChevronsDown, LucideChevronsUp } from 'lucide-react'

type CodeBlockProps = {
  code: string
}
export default function CodeBlock({}: CodeBlockProps) {
  //=====States=====
  const [open, setOpen] = useState(false)

  //=====Callbacks=====
  const onToggle = () => {
    setOpen(!open)
  }

  return (
    <div className="relative mt-3 rounded-xl border-2 border-pink-300 bg-pink-400">
      <div className={cn('h-32 overflow-hidden px-7', { 'h-auto': open })}>
        <code>
          <pre className="text-wrap text-left">{`
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . ./
RUN yarn build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
EXPOSE 3000
CMD ["yarn", "start"]

`}</pre>
        </code>
      </div>
      <div
        onClick={onToggle}
        className="group absolute bottom-0 flex h-8 w-full items-center justify-center rounded-b-xl bg-gradient-to-t from-pink-300 to-transparent hover:cursor-pointer"
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
