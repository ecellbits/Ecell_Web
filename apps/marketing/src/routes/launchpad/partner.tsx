import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/sponsors/PartnerPage";

export const Route = createFileRoute("/launchpad/partner")({
  component: Comp,
});
