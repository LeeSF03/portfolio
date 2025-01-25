import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Topbar, MenuItemWithRef } from "@/components/Topbar";
import { createRef } from "react";

test("Test Home page", async () => {
  const mockRef = createRef<HTMLDivElement | null>();
  const menuItems: MenuItemWithRef[] = [
    { title: "About Me", ref: mockRef },
    { title: "Skills", ref: mockRef },
    { title: "Contacts", ref: mockRef },
  ];

  const { getByText } = render(<Topbar menuItemsWithRef={menuItems} />);
  expect(getByText("About Me")).toBeDefined();
});
