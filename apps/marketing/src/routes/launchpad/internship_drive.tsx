import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/events/InternshipDrive";

export const Route = createFileRoute("/launchpad/internship_drive")({
  component: Comp,
});
