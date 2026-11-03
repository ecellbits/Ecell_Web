import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/sponsors/BecomeSponsorPage";

export const Route = createFileRoute("/launchpad/sponsor/wanna-sponsor")({
  component: Comp,
});
