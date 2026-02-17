import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useAuth } from '@/components/auth/AuthContext';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Zap, AlertCircle, Loader2, Mail } from 'lucide-react';
import { auth } from '@/config/firebase';
import { signInWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';

export default function Acceso() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const { language, changeLanguage, t } = useLanguage();

  useEffect(() => {
    if (user) {
      navigate(createPageUrl('Dashboard'));
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setNeedsVerification(false);
    setIsLoading(true);

    try {
      await login(email, password);
      navigate(createPageUrl('Dashboard'));
    } catch (err) {
      console.error('Login error:', err);
      if (err.code === 'auth/email-not-verified') {
        setNeedsVerification(true);
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError(t('login.errorInvalid'));
      } else if (err.code === 'auth/too-many-requests') {
        setError(t('login.errorTooMany'));
      } else {
        setError(t('login.errorInvalid'));
      }
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setResendingEmail(true);
    setResendSuccess(false);
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(credential.user);
      await auth.signOut();
      setResendSuccess(true);
    } catch (err) {
      console.error('Resend verification error:', err);
      setError(t('login.resendError'));
    }
    setResendingEmail(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('login.title')}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{t('login.subtitle')}</p>
          </div>

          {/* Selector de idioma */}
          <div className="flex justify-center gap-2 mb-6">
            <Button
              variant={language === 'es' ? 'default' : 'outline'}
              size="sm"
              onClick={() => changeLanguage('es')}
              className={language === 'es' ? 'bg-violet-600 hover:bg-violet-700' : ''}
            >
              ES
            </Button>
            <Button
              variant={language === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => changeLanguage('en')}
              className={language === 'en' ? 'bg-violet-600 hover:bg-violet-700' : ''}
            >
              EN
            </Button>
            <Button
              variant={language === 'pt' ? 'default' : 'outline'}
              size="sm"
              onClick={() => changeLanguage('pt')}
              className={language === 'pt' ? 'bg-violet-600 hover:bg-violet-700' : ''}
            >
              PT
            </Button>
          </div>

          {/* Email no verificado */}
          {needsVerification && (
            <div className="mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-center space-y-3">
              <Mail className="w-10 h-10 text-amber-600 dark:text-amber-400 mx-auto" />
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                {t('login.verificationRequired')}
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-400">
                {t('login.verificationMessage')}
              </p>
              {resendSuccess ? (
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                  {t('login.resendSuccess')}
                </p>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleResendVerification}
                  disabled={resendingEmail}
                  className="border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300"
                >
                  {resendingEmail ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                      {t('login.resending')}
                    </>
                  ) : (
                    t('login.resendVerification')
                  )}
                </Button>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">{t('login.email') || 'Email'}</Label>
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

            <div>
              <Label htmlFor="password">{t('login.password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('login.password')}
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
                  {t('login.loggingIn')}
                </>
              ) : (
                t('login.loginButton')
              )}
            </Button>
          </form>

          {/* Links */}
          <div className="mt-4 text-center space-y-2">
            <Link to={createPageUrl('RecuperarPassword')} className="text-sm text-violet-600 hover:text-violet-700 dark:text-violet-400">
              {t('login.forgotPassword') || 'Olvidaste tu contrasena?'}
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('login.noAccount') || 'No tienes cuenta?'}{' '}
              <Link to={createPageUrl('Registro')} className="text-violet-600 hover:text-violet-700 dark:text-violet-400 font-medium">
                {t('login.createAccount') || 'Crear cuenta'}
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
            <p>Flga. Carolina Henriquez - Flgo. Joel Valenzuela</p>
          </div>
        </div>
      </div>
    </div>
  );
}
