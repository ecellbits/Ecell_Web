import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/programs/CommunityMeet";

export const Route = createFileRoute("/community-meet")({
  component: Comp,
});
