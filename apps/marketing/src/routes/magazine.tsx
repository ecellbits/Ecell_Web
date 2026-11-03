import { createFileRoute } from "@tanstack/react-router";
import MagazinePage from "@/components/magazine/MagazinePage";

export const Route = createFileRoute("/magazine")({
  component: MagazinePage,
  head: () => ({
    meta: [{ title: "The Magazine | E-Cell BITS Hyderabad" }],
  }),
});
