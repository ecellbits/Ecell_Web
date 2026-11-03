import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/gallery/LaunchpadGalleryPage";

export const Route = createFileRoute("/launchpad/gallery")({
  component: Comp,
});
