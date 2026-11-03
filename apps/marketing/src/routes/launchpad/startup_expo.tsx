import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/events/StartupExpo";

export const Route = createFileRoute("/launchpad/startup_expo")({
  component: Comp,
});
