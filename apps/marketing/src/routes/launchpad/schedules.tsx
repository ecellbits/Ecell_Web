import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/EventSchedule";

export const Route = createFileRoute("/launchpad/schedules")({
  component: Comp,
});
