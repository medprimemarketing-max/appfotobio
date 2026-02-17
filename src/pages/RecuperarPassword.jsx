import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useAuth } from '@/components/auth/AuthContext';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Zap, AlertCircle, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';

export default function RecuperarPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      console.error('Reset password error:', err);
      if (err.code === 'auth/user-not-found') {
        setError(t('recover.userNotFound') || 'No existe una cuenta con este email');
      } else if (err.code === 'auth/invalid-email') {
        setError(t('recover.invalidEmail') || 'Email invalido');
      } else {
        setError(t('recover.genericError') || 'Error al enviar el email de recuperacion');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('recover.title') || 'Recuperar contrasena'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {t('recover.subtitle') || 'Te enviaremos un enlace para restablecer tu contrasena'}
            </p>
          </div>

          {success ? (
            <div className="text-center space-y-4">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
              <p className="text-gray-600 dark:text-gray-400">
                {t('recover.successMessage') || 'Hemos enviado un email con instrucciones para restablecer tu contrasena. Revisa tu bandeja de entrada.'}
              </p>
              <Link to={createPageUrl('Acceso')}>
                <Button className="bg-violet-600 hover:bg-violet-700 mt-2">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('recover.backToLogin') || 'Volver al login'}
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    required
                    disabled={isLoading}
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t('recover.sending') || 'Enviando...'}
                    </>
                  ) : (
                    t('recover.sendButton') || 'Enviar enlace de recuperacion'
                  )}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <Link to={createPageUrl('Acceso')} className="text-sm text-violet-600 hover:text-violet-700 dark:text-violet-400 inline-flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  {t('recover.backToLogin') || 'Volver al login'}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
