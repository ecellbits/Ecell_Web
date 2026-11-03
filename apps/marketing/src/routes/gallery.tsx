import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/gallery/GalleryPage";

export const Route = createFileRoute("/gallery")({
  component: Comp,
});
