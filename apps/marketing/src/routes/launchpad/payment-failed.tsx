import { createFileRoute } from "@tanstack/react-router";
import { Comp } from "@/components/launchpad/payments/PaymentFailed";

export const Route = createFileRoute("/launchpad/payment-failed")({
  component: Comp,
});
