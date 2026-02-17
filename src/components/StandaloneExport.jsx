import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, PackageOpen, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { apiClient } from '@/api/apiClient';

export default function StandaloneExport() {
  const { user } = useAuth();
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState(null);

  const handleExport = async () => {
    if (!user) {
      setError('Debes iniciar sesion como administrador para exportar');
      return;
    }

    setIsExporting(true);
    setError(null);

    try {
      const data = await apiClient.admin.export();

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'fbm-export.json';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (err) {
      setError(err.data?.error || err.message || 'Error al exportar');
    } finally {
      setIsExporting(false);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Solo administradores pueden exportar la aplicacion standalone.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900 rounded-lg flex items-center justify-center">
            <PackageOpen className="w-6 h-6 text-violet-600 dark:text-violet-300" />
          </div>
          <div>
            <CardTitle>Exportar App Standalone</CardTitle>
            <CardDescription>
              Descarga un JSON con todos los datos de la aplicacion
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            La exportacion incluye:
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 ml-7">
            <li>- Todos los usuarios registrados</li>
            <li>- Notas clinicas de todas las patologias</li>
            <li>- Registros de pagos</li>
            <li>- Metadatos de la exportacion</li>
          </ul>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
          size="lg"
        >
          {isExporting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Exportando...
            </>
          ) : (
            <>
              <Download className="w-5 h-5 mr-2" />
              Descargar Exportacion
            </>
          )}
        </Button>

        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Solo disponible para administradores
        </div>
      </CardContent>
    </Card>
  );
}
