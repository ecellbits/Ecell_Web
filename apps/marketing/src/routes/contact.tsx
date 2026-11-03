import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/contact/ContactPage";

export const Route = createFileRoute("/contact")({
  component: Comp,
});
