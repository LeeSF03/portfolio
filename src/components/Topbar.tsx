import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { RefObject } from "react";

export type MenuItemWithRef = {
  title: string;
  ref: RefObject<HTMLDivElement | null>;
};

type TopbarProps = {
  menuItemsWithRef: MenuItemWithRef[];
};

export const Topbar = ({ menuItemsWithRef }: TopbarProps) => {
  return (
    <div className="flex justify-center w-full border border-slate-200 py-2 bg-white dark:border-slate-800 dark:bg-slate-950 sticky top-0">
      <Menubar className="border-none max-w-5xl">
        <MenubarMenu>
          {menuItemsWithRef.map(({ title, ref }, index) => (
            <MenubarTrigger
              key={index}
              className={"text-lg hover:bg-black hover:text-white"}
              onClick={() =>
                ref.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              {title}
            </MenubarTrigger>
          ))}
        </MenubarMenu>
      </Menubar>
    </div>
  );
};
