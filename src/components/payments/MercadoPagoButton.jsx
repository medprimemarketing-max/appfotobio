import React, { useState } from 'react';
import { apiClient } from '@/api/apiClient';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageContext';

export default function MercadoPagoButton({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient.payments.mercadopago.createPreference();
      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } catch (error) {
      console.error('MercadoPago error:', error);
      alert(t('subscription.paymentError') || 'Error al iniciar el pago');
    }
    setIsLoading(false);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
      )}
      {t('subscription.payWithMercadoPago') || 'Pagar con MercadoPago'}
    </Button>
  );
}
