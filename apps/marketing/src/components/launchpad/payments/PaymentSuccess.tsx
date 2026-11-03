import { CheckCircle } from "lucide-react";
import { useNavigate } from "@/shims/react-router";

function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-page text-ink">
      <div
        className="max-w-[400px] bg-page p-6 rounded-2xl shadow-lg text-center border border-ecell-blue"
        
      >
        <div className="flex justify-center mb-4">
          <CheckCircle size={64} color="limegreen" />
        </div>
        <h2 className="mb-2 text-[2rem] leading-[1.2] text-success font-bold">Payment Successful</h2>
        <br />
        <p className="mb-4 text-ink">
          Your payment has been successfully processed. Thank you for your
          purchase!
        </p>
        <br />

        <button
          className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-base leading-normal transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecell-blue cursor-pointer border border-ecell-blue bg-ecell-blue text-white hover:border-ecell-blue hover:bg-ecell-blue w-full"
          onClick={() => navigate("/launchpad/passes")}
        >
          View Passes
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
export { PaymentSuccess as Comp };
