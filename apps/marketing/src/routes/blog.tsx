import { createFileRoute } from "@tanstack/react-router";
import BlogPage from "@/components/blog/BlogPage";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
});
