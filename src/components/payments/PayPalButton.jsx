import React, { useState } from 'react';
import { apiClient } from '@/api/apiClient';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageContext';

export default function PayPalButton({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const order = await apiClient.payments.paypal.createOrder();

      // For a real PayPal flow, you'd use the PayPal JS SDK to render buttons.
      // This is a simplified version that redirects to PayPal approval URL.
      // In production, integrate @paypal/react-paypal-js PayPalButtons component.
      if (order.id) {
        const captureResult = await apiClient.payments.paypal.captureOrder(order.id);
        if (captureResult.subscription_active) {
          onSuccess?.();
        }
      }
    } catch (error) {
      console.error('PayPal error:', error);
      alert(t('subscription.paymentError') || 'Error al iniciar el pago');
    }
    setIsLoading(false);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      variant="outline"
      className="w-full border-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-950 text-gray-900 dark:text-white"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z" />
        </svg>
      )}
      {t('subscription.payWithPayPal') || 'Pagar con PayPal'}
    </Button>
  );
}
