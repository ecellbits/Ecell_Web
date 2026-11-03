import { JSDOM } from "jsdom";

const dom = new JSDOM('<!DOCTYPE html><html><head></head><body id="body"></body></html>', {
  url: "http://localhost/",
  pretendToBeVisual: true,
});
const win = dom.window;

const g = globalThis as unknown as Record<string, unknown>;
for (const key of [
  "window",
  "document",
  "location",
  "navigator",
  "HTMLElement",
  "HTMLIFrameElement",
  "SVGElement",
  "Element",
  "Node",
  "CSSStyleDeclaration",
  "localStorage",
  "sessionStorage",
]) {
  const val = (win as unknown as Record<string, unknown>)[key];
  try {
    Object.defineProperty(g, key, { value: val, writable: true, configurable: true });
  } catch {
    g[key] = val;
  }
}

class MissingGlobalStub {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

win.matchMedia =
  win.matchMedia ??
  ((query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener(): void {},
      removeListener(): void {},
      addEventListener(): void {},
      removeEventListener(): void {},
      dispatchEvent: () => false,
    }) as MediaQueryList);

win.IntersectionObserver = (win.IntersectionObserver ?? MissingGlobalStub) as typeof IntersectionObserver;
win.ResizeObserver = (win.ResizeObserver ?? MissingGlobalStub) as typeof ResizeObserver;

if (typeof dom.window.scrollTo === "undefined") {
  (win as unknown as Record<string, unknown>).scrollTo = () => {};
}

export function initSsrGlobals(): void {}
