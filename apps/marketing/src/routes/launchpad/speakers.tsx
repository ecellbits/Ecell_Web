import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/speakers/SpeakersPage";

export const Route = createFileRoute("/launchpad/speakers")({
  component: Comp,
});
