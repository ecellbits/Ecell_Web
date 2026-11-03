import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/startup-connect/StartupConnectForm";

export const Route = createFileRoute("/startup-connect")({
  component: Comp,
});
