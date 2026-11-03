import { createFileRoute } from "@tanstack/react-router";
import MentorConnectPage from "@/components/mentorship/MentorConnectPage";

export const Route = createFileRoute("/mentor-connect")({
  component: MentorConnectPage,
});
