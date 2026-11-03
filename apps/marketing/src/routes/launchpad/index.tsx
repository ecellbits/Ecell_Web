import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/home/LaunchpadHomePage";

export const Route = createFileRoute("/launchpad/")({
  component: Comp,
});
