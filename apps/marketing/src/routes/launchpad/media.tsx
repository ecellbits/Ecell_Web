import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/sponsors/MediaPage";

export const Route = createFileRoute("/launchpad/media")({
  component: Comp,
});
