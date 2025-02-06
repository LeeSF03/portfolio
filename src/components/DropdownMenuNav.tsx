import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

type Page = {
  name: string
  path: string
}
type DropdownMenuNavProps = {
  pages: Page[]
}

export const DropdownMenuNav = ({ pages }: DropdownMenuNavProps) => {
  return (
    <DropdownMenu>
      <div className="group">
        <div className="rounded-xl border-4 border-gray-800 bg-blue-400 p-1 shadow-[5px_5px] hover:cursor-pointer group-hover:-motion-translate-x-out-[5px] group-hover:-motion-translate-y-out-[5px] group-active:-motion-translate-x-out-[5px] group-active:-motion-translate-y-out-[5px]">
          <DropdownMenuTrigger className="rounded-md border-4 border-gray-800 bg-purple-300 px-2 py-0.5 font-bold">
            Open
          </DropdownMenuTrigger>
          <DropdownMenuContent className="m-2 rounded-md border-4 border-gray-800 bg-green-300 p-2 shadow-[5px_5px]">
            {pages.map(({ name, path }) => (
              <DropdownMenuItem
                key={name}
                className="font-bold hover:cursor-pointer hover:-motion-translate-x-out-[3px] hover:-motion-translate-y-out-[3px]"
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
