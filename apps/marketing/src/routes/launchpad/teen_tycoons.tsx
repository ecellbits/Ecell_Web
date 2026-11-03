import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/events/TeenTycoons";

export const Route = createFileRoute("/launchpad/teen_tycoons")({
  component: Comp,
});
