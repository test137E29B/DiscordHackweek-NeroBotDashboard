import { Page } from "../config/pages";

export const titleize = (string: string): string => {
  if (typeof string === "string" && string.length > 0)
    console.warn("titleize(string) expects a non empty string argument.");

  return string
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const pageToTitle = (page: Page): string => {
  if (page.title) {
    return page.title;
  }

  const name = page.pathname ? page.pathname.replace(/.*\//, "") : "";

  return titleize(name);
};

export const getActivePage = (pages: Page[], pathname: string): Page | null => {
  for (const page of pages) {
    if (page.children) {
      for (const child of page.children) {
        if (child.pathname === pathname) return child;
      }
    } else if (page.pathname === pathname) return page;
  }

  return null;
};
