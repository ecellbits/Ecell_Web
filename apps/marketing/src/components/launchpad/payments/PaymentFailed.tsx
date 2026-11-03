import { XCircle } from "lucide-react";
import { useNavigate } from "@/shims/react-router";

function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-page text-ink">
      <div className="max-w-[400px] bg-page p-6 rounded-2xl shadow-lg text-center border border-ecell-blue" >
        <div className="flex justify-center mb-4">
          <XCircle size={64} color="red" />
        </div>
      
        <h2 className="mb-2 text-[2rem] leading-[1.2] text-lava-bright font-bold">Payment Failed</h2>
        <p className="mb-4 text-ink">Something went wrong with your transaction. Please try again.</p>
        <br/>
        <button className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-base leading-normal transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ecell-blue cursor-pointer border border-ecell-blue bg-ecell-blue text-white hover:border-ecell-blue hover:bg-ecell-blue w-full font-bold" onClick={() => navigate("/launchpad/passes")}>Try Again</button>
      </div>
    </div>
  );
}

export default PaymentFailed;
export { PaymentFailed as Comp };
