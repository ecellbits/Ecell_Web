import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/events/EventDemo";

export const Route = createFileRoute("/launchpad/workshop-demo")({
  component: Comp,
});
