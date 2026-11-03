import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/payments/PaymentCancelled";

export const Route = createFileRoute("/launchpad/payment-cancel")({
  component: Comp,
});
