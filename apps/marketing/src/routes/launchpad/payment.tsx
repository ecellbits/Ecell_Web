import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/payments/PaymentPage";

export const Route = createFileRoute("/launchpad/payment")({
  component: Comp,
});
