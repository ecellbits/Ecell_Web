import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/events/PitchersPilot";

export const Route = createFileRoute("/launchpad/pitchers_pilot")({
  component: Comp,
});
