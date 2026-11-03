import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/home/HomePage";

export const Route = createFileRoute("/")({
  component: Comp,
});
