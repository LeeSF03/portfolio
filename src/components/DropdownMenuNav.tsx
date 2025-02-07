import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Page = {
  name: string
  path: string
}
type DropdownMenuNavProps = {
  pages: Page[]
  currentPageIndex: number
}

export const DropdownMenuNav = ({
  pages,
  currentPageIndex,
}: DropdownMenuNavProps) => {
  return (
    <DropdownMenu>
      <div className="group">
        <div className="rounded-xl border-4 border-gray-800 bg-blue-400 p-1 shadow-[5px_5px] hover:cursor-pointer group-hover:-motion-translate-x-out-[5px] group-hover:-motion-translate-y-out-[5px] group-active:-motion-translate-x-out-[5px] group-active:-motion-translate-y-out-[5px]">
          <DropdownMenuTrigger className="rounded-md border-4 border-gray-800 bg-purple-300 px-2 py-0.5 font-bold">
            {pages[currentPageIndex].name}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="m-2 space-y-1 rounded-md border-4 border-gray-800 bg-green-300 p-2 shadow-[5px_5px]">
            {pages.map(({ name, path }, index) => (
              <DropdownMenuItem
                key={name}
                className={cn(
                  'font-bold hover:cursor-pointer hover:-motion-translate-x-out-[3px] hover:-motion-translate-y-out-[3px]',
                  {
                    'border-2 border-gray-800 bg-red-300':
                      currentPageIndex === index,
                  }
                )}
              >
                <Link href={path}>{name}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </div>
      </div>
    </DropdownMenu>
  )
}
