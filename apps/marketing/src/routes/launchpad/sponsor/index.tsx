import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/sponsors/SponsorsPage";

export const Route = createFileRoute("/launchpad/sponsor/")({
  component: Comp,
});
