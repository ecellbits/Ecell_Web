import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/Accommodation";

export const Route = createFileRoute("/launchpad/accommodation")({
  component: Comp,
});
