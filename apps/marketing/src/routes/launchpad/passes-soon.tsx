import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/passes/PassesSoon";

export const Route = createFileRoute("/launchpad/passes-soon")({
  component: Comp,
});
