import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/sponsors/SponsorshipSlabs";

export const Route = createFileRoute("/launchpad/sponsor/slabs")({
  component: Comp,
});
