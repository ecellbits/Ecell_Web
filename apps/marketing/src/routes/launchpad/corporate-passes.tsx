import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/passes/CorporatePasses";

export const Route = createFileRoute("/launchpad/corporate-passes")({
  component: Comp,
});
