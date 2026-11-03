import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/LaunchpadLinks";

export const Route = createFileRoute("/launchpad/links")({
  component: Comp,
});
