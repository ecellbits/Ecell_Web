import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/events/EventsPage";

export const Route = createFileRoute("/launchpad/events")({
  component: Comp,
});
