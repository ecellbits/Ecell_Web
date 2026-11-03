import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/team/LaunchpadTeamPage";

export const Route = createFileRoute("/launchpad/team")({
  component: Comp,
});
