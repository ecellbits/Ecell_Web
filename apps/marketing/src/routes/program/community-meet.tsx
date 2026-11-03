import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/programs/CommunityMeet";

export const Route = createFileRoute("/program/community-meet")({
  component: Comp,
});
