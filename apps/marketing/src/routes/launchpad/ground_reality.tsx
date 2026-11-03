import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/events/GroundReality";

export const Route = createFileRoute("/launchpad/ground_reality")({
  component: Comp,
});
