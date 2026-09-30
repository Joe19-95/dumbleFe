import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";


function Premium() {
  const [isPremium, setIsPremium] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleVerifyPayment = async () => {
    const res = await axios.get(BASE_URL + '/payment/verify', { withCredentials: true });
    return Boolean(res.data?.isPremium ?? res.data?.premium ?? false);
  };

  useEffect(() => {
    let isActive = true;
    const checkPremiumStatus = async () => {
      try {
        const premium = await handleVerifyPayment();
        if (isActive) {
          setIsPremium(premium);
          if (premium) setPaymentStatus('Premium activated successfully.');
        }
      } catch (error) {
        console.error('Failed to check premium status:', error);
      }
    };
    checkPremiumStatus();
    return () => {
      isActive = false;
    };
  }, []);
  const plans = [
    {
      name: 'Silver',
      price: '₹10',
      period: 'per month',
      accent: 'bg-slate-200 text-slate-900',
      badge: 'Best for basic access',
      features: ['Enables chat', 'Basic member access', 'Fast onboarding'],
      button: 'Buy Silver',
    },
    {
      name: 'Gold',
      price: '₹20',
      period: 'per month',
      accent: 'bg-amber-400 text-amber-950',
      badge: 'Most popular',
      features: ['Enables chat', 'Blue tick verification', 'Priority profile visibility'],
      button: 'Buy Gold',
    },
  ]

  const handleClick = async (plan) => {
    try {
      const res = await axios.post(BASE_URL + '/payment/create', { plan }, { withCredentials: true });
      const options = {
        key: res.data.key_id,
        amount: res.data.amount,
        currency: res.data.currency,
        name: 'Dumble Premium',
        description: 'Enjoy premium features with Dumble Premium',
        order_id: res.data.orderId,
        prefill: {
          name: '<name>',
          email: '<email>',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
        handler: async () => {
          try {
            const premium = await handleVerifyPayment();
            setIsPremium(premium || true);
            setPaymentStatus(premium ? 'Payment successful! Your premium membership is active.' : 'Your payment was successful. We are verifying your premium access...');
          } catch (error) {
            console.error('Failed to refresh premium status:', error);
            setPaymentStatus('Payment successful. We are checking your premium access...');
            setIsPremium(true);
          }
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Failed to create payment order:', error);
      setPaymentStatus('Payment could not be started. Please try again.');
    }
  }
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {paymentStatus && !isPremium && (
        <div className="mb-6 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-success-content">
          {paymentStatus}
        </div>
      )}

      {isPremium ? (
        <div className="mx-auto max-w-xl py-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-3xl text-success">
            ✓
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-success">Premium membership</p>
          <h1 className="mt-3 text-3xl font-bold text-base-content">Congratulations, you’re already a premium user!</h1>
          <p className="mt-3 text-base-content/70">{paymentStatus || 'Your premium benefits are active. Enjoy your membership.'}</p>
        </div>
      ) : (
        <>
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Membership</p>
            <h1 className="mt-3 text-4xl font-bold text-base-content">Choose your plan</h1>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="rounded-3xl border border-base-300 bg-base-100 p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${plan.accent}`}>
                  {plan.badge}
                </div>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl font-bold text-base-content">{plan.price}</span>
                  <span className="pb-1 text-sm text-base-content/60">{plan.period}</span>
                </div>

                <h2 className="mt-6 text-2xl font-bold text-base-content">{plan.name}</h2>

                <ul className="mt-5 space-y-3 text-sm text-base-content/75">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button onClick={() => handleClick(plan)} type="button" className="btn btn-primary mt-8 w-full">
                  {plan.button}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Premium
