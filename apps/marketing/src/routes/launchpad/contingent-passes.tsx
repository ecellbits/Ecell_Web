import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/passes/ContingentPasses";

export const Route = createFileRoute("/launchpad/contingent-passes")({
  component: Comp,
});
