import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/events/SeedSummit";

export const Route = createFileRoute("/launchpad/seed")({
  component: Comp,
});
