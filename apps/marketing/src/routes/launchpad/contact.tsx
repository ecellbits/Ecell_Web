import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/contact/LaunchpadContactPage";

export const Route = createFileRoute("/launchpad/contact")({
  component: Comp,
});
