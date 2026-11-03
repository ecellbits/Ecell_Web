import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/programs/ProgramsPage";

export const Route = createFileRoute("/program/")({
  component: Comp,
});
