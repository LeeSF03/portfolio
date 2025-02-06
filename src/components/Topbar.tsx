import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import { RefObject } from 'react'

export type MenuItemWithRef = {
  title: string
  ref: RefObject<HTMLDivElement | null>
}

type TopbarProps = {
  menuItemsWithRef: MenuItemWithRef[]
}

export const Topbar = ({ menuItemsWithRef }: TopbarProps) => {
  return (
    <div className="top-0 flex justify-center bg-none py-2">
      <div className="w-full rounded-xl border-4 border-gray-800 bg-blue-400 p-2 shadow-[7px_7px]">
        <Menubar className="w-full justify-center rounded-lg border-4 border-gray-800 bg-orange-200 py-5">
          <MenubarMenu>
            {menuItemsWithRef.map(({ title, ref }, index) => (
              <MenubarTrigger
                key={index}
                className={
                  'h-8 bg-none text-lg font-bold hover:bg-transparent hover:-motion-translate-y-out-[3px]'
                }
                onClick={() =>
                  ref.current?.scrollIntoView({
                    behavior: 'smooth',
                  })
                }
              >
                {title}
              </MenubarTrigger>
            ))}
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  )
}
