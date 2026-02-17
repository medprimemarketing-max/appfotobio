import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useAuth } from '@/components/auth/AuthContext';
import { useLanguage } from '@/components/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Zap, AlertCircle, Loader2, CheckCircle, Mail, ArrowRight } from 'lucide-react';

export default function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t('register.passwordMismatch') || 'Las contrasenas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError(t('register.passwordTooShort') || 'La contrasena debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      await register(email, password);
      setSuccess(true);
    } catch (err) {
      console.error('Register error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError(t('register.emailInUse') || 'Este email ya esta registrado');
      } else if (err.code === 'auth/weak-password') {
        setError(t('register.weakPassword') || 'La contrasena es muy debil');
      } else if (err.code === 'auth/invalid-email') {
        setError(t('register.invalidEmail') || 'Email invalido');
      } else {
        setError(t('register.genericError') || 'Error al crear la cuenta');
      }
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t('register.successTitle')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('register.successMessage')}
            </p>

            <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4 mb-6 text-left space-y-3">
              <p className="text-sm font-semibold text-violet-800 dark:text-violet-300">
                {t('register.stepsTitle')}
              </p>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">{t('register.step1')}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">{t('register.step2')}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">{t('register.step3')}</p>
              </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              {t('register.checkSpam')}
            </p>

            <Button
              onClick={() => navigate(createPageUrl('Acceso'))}
              className="w-full bg-violet-600 hover:bg-violet-700"
            >
              {t('register.goToLogin')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('register.title') || 'Crear cuenta'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {t('register.subtitle') || 'Registrate para acceder a los protocolos'}
            </p>
          </div>

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

            <div>
              <Label htmlFor="password">{t('login.password') || 'Contrasena'}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
                required
                disabled={isLoading}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">{t('register.confirmPassword') || 'Confirmar contrasena'}</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="******"
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
                  {t('register.creating') || 'Creando cuenta...'}
                </>
              ) : (
                t('register.createButton') || 'Crear cuenta'
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('register.hasAccount') || 'Ya tienes cuenta?'}{' '}
              <Link to={createPageUrl('Acceso')} className="text-violet-600 hover:text-violet-700 dark:text-violet-400 font-medium">
                {t('register.loginLink') || 'Iniciar sesion'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
