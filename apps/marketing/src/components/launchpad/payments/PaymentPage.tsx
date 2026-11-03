import React from 'react';
import { useSearchParams, useNavigate } from "@/shims/react-router";
import { X } from 'lucide-react';

const PaymentPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Get the payment URL from query parameters
    const paymentUrl = searchParams.get('url');
    const tierName = searchParams.get('tier') || 'Launchpad Pass';

    const handleClose = () => {
        const from = searchParams.get('from');
        navigate(from || '/launchpad/passes');
    };

    return (
        <div className="min-h-screen bg-ecell-bg flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-surface rounded-lg overflow-hidden shadow-2xl border border-white/10">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors"
                    aria-label="Close payment page"
                >
                    <X size={24} />
                </button>

                <div className="w-full h-[85vh] md:h-[600px] bg-white">
                    {paymentUrl ? (
                        <iframe
                            src={paymentUrl}
                            id="konfhub-widget"
                            title={`Register for ${tierName}`}
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-black">
                            <p>No payment URL provided</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
export { PaymentPage as Comp };
