if (__TSS_NODE_SSR__ && typeof window === "undefined") {
  const { initSsrGlobals } = await import("./ssr-jsdom");
  initSsrGlobals();
}
