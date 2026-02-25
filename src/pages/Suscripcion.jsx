import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { apiClient } from '@/api/apiClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Crown, Loader2, AlertCircle, ExternalLink } from 'lucide-react';

const CHECKOUT_URL = 'https://sinaptya.com/aplicaciones/fotobio';

export default function Suscripcion() {
  const { user, checkAuth } = useAuth();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(searchParams.get('status'));

  useEffect(() => {
    loadSubscription();
  }, []);

  useEffect(() => {
    if (paymentStatus === 'success') {
      loadSubscription();
      checkAuth();
    }
  }, [paymentStatus]);

  const loadSubscription = async () => {
    try {
      const data = await apiClient.user.subscription();
      setSubscription(data);
    } catch (error) {
      console.error('Error loading subscription:', error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t('subscription.title') || 'Suscripción'}
      </h1>

      {paymentStatus === 'success' && (
        <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700 dark:text-green-300">
            {t('subscription.paymentSuccess') || 'Pago realizado con éxito. Tu suscripción ha sido activada.'}
          </AlertDescription>
        </Alert>
      )}

      {paymentStatus === 'failure' && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {t('subscription.paymentFailed') || 'El pago no pudo completarse. Por favor intenta nuevamente.'}
          </AlertDescription>
        </Alert>
      )}

      {/* Current plan */}
      <Card className="dark:bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-white">
            <Crown className="w-5 h-5 text-amber-500" />
            {t('subscription.currentPlan') || 'Plan actual'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                {subscription?.subscription_type || 'free'}
              </p>
              {subscription?.subscription_expires_at && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('subscription.expiresAt') || 'Expira:'}{' '}
                  {new Date(subscription.subscription_expires_at).toLocaleDateString()}
                </p>
              )}
            </div>
            {subscription?.is_active && subscription?.subscription_type !== 'free' && (
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                {t('subscription.active') || 'Activa'}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upgrade section */}
      {(!subscription || subscription.subscription_type === 'free') && (
        <Card className="dark:bg-slate-800 border-violet-200 dark:border-violet-800">
          <CardHeader>
            <CardTitle className="dark:text-white">
              {t('subscription.upgradeToPremium') || 'Actualizar a Premium'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              {t('subscription.premiumDescription') || 'Accede a todos los protocolos, notas clínicas ilimitadas y más.'}
            </p>

            <Button
              className="w-full bg-violet-600 hover:bg-violet-700 text-white"
              onClick={() => window.open(CHECKOUT_URL, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {t('subscription.goToCheckout') || 'Ir al checkout'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
