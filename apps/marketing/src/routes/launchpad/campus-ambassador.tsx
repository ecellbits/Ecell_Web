import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/CampusAmbassador";

export const Route = createFileRoute("/launchpad/campus-ambassador")({
  component: Comp,
});
