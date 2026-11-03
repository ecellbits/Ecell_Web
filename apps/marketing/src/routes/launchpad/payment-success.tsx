import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/payments/PaymentSuccess";

export const Route = createFileRoute("/launchpad/payment-success")({
  component: Comp,
});
