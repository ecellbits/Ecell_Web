import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/team/TeamPage";

export const Route = createFileRoute("/team")({
  component: Comp,
});
