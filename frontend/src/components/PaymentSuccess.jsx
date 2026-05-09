import { CheckCheck, CheckCircleIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const PaymentSuccess = () => {
  const navigate = useNavigate()
  return (
  <div className="flex items-center justify-center min-h-screen bg-[#E1E5F8] px-6">
    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-[#BBC4EB] p-10 text-center">

      <div className="w-24 h-24 mx-auto rounded-full bg-[#737CCF]/20 flex items-center justify-center mb-8">
        <CheckCircleIcon size={56} className="text-[#2218A7]" />
      </div>

      <h1 className="text-4xl font-bold text-[#2218A7] mb-4">
        Payment Successful!
      </h1>

      <p className="text-[#737CCF] mb-10 text-lg">
        Your order has been placed successfully.
      </p>

      <div className="space-y-4">
        <Button
          onClick={() => navigate("/products")}
          className="w-full h-14 rounded-xl bg-[#2218A7] hover:bg-[#737CCF]"
        >
          Continue Shopping
        </Button>

        <Button
          onClick={() => navigate("/my-orders")}
          variant="outline"
          className="w-full h-14 rounded-xl border-[#737CCF] text-[#2218A7]"
        >
          View My Orders
        </Button>
      </div>
    </div>
  </div>
);
}

export default PaymentSuccess
