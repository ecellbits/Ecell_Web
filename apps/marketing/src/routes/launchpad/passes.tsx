import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/passes/Passes";

export const Route = createFileRoute("/launchpad/passes")({
  component: Comp,
});
