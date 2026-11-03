import { createFileRoute } from "@tanstack/react-router";
import MentorshipPage from "@/components/mentorship/MentorshipPage";

export const Route = createFileRoute("/startup-mentorship")({
  component: MentorshipPage,
});
