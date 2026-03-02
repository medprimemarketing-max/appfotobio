import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useAuth } from '@/components/auth/AuthContext';
import { apiClient } from '@/api/apiClient';
import { ArrowLeft, Users, UserPlus, Shield, Crown, Loader2, RefreshCw, Calendar, Clock, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

const ADMIN_EMAILS = ['ckbruiz@gmail.com', 'joevalencis@hotmail.com'];

const SUBSCRIPTION_PERIODS = [
  { value: '30', label: '1 Mes', days: 30 },
  { value: '90', label: '3 Meses', days: 90 },
  { value: '180', label: '6 Meses', days: 180 },
  { value: '365', label: '1 Año', days: 365 },
  { value: 'custom', label: 'Personalizado', days: null },
];

export default function Admin() {
  const { isLoading, user } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Create user form
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('user');
  const [newWithPremium, setNewWithPremium] = useState(false);
  const [creating, setCreating] = useState(false);

  // Dialogs
  const [roleDialog, setRoleDialog] = useState(null);
  const [subDialog, setSubDialog] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Subscription period selection
  const [selectedPeriod, setSelectedPeriod] = useState('365');
  const [customDays, setCustomDays] = useState('');
  const [startDate, setStartDate] = useState('');

  // Deactivate subscription dialog
  const [deactivateDialog, setDeactivateDialog] = useState(null);

  // Check if current user email is in the allowed admin list
  const isAllowedAdmin = user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      setError('');
      const data = await apiClient.admin.listUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Error al cargar usuarios');
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (isAllowedAdmin) {
      fetchUsers();
    }
  }, [isAllowedAdmin]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setCreating(true);

    try {
      const user = await apiClient.admin.createUser({
        email: newEmail,
        password: newPassword,
        role: newRole,
      });

      if (newWithPremium && user.id) {
        await apiClient.admin.updateSubscription(user.id, {
          subscription_type: 'premium_annual',
          active: true,
          duration_days: 365,
        });
      }

      setSuccess(`Usuario ${newEmail} creado exitosamente`);
      setNewEmail('');
      setNewPassword('');
      setNewRole('user');
      setNewWithPremium(false);
      fetchUsers();
    } catch (err) {
      setError(err.message || 'Error al crear usuario');
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateRole = async () => {
    if (!roleDialog) return;
    setActionLoading(true);
    setError('');

    try {
      await apiClient.admin.updateRole(roleDialog.id, { role: roleDialog.newRole });
      setSuccess(`Rol de ${roleDialog.email} actualizado a ${roleDialog.newRole}`);
      setRoleDialog(null);
      fetchUsers();
    } catch (err) {
      setError(err.message || 'Error al actualizar rol');
    } finally {
      setActionLoading(false);
    }
  };

  const getDurationDays = () => {
    if (selectedPeriod === 'custom') {
      const parsed = parseInt(customDays, 10);
      return isNaN(parsed) || parsed < 1 ? null : parsed;
    }
    return parseInt(selectedPeriod, 10);
  };

  const handleUpdateSubscription = async () => {
    if (!subDialog) return;

    const days = getDurationDays();
    if (!days) {
      setError('Ingresa una cantidad valida de dias');
      return;
    }

    setActionLoading(true);
    setError('');

    try {
      const payload = {
        subscription_type: 'premium_annual',
        active: true,
        duration_days: days,
      };
      if (startDate) {
        payload.start_date = startDate;
      }

      await apiClient.admin.updateSubscription(subDialog.id, payload);

      const periodLabel = SUBSCRIPTION_PERIODS.find(p => p.value === selectedPeriod)?.label || `${days} dias`;
      setSuccess(`Suscripcion premium (${periodLabel}) activada para ${subDialog.email}`);
      setSubDialog(null);
      setSelectedPeriod('365');
      setCustomDays('');
      setStartDate('');
      fetchUsers();
    } catch (err) {
      setError(err.message || 'Error al actualizar suscripcion');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeactivateSubscription = async () => {
    if (!deactivateDialog) return;
    setActionLoading(true);
    setError('');

    try {
      await apiClient.admin.updateSubscription(deactivateDialog.id, {
        subscription_type: 'free',
        active: true,
      });
      setSuccess(`Suscripcion desactivada para ${deactivateDialog.email}`);
      setDeactivateDialog(null);
      fetchUsers();
    } catch (err) {
      setError(err.message || 'Error al desactivar suscripcion');
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('es-AR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    });
  };

  const isExpired = (dateStr) => {
    if (!dateStr) return false;
    return new Date(dateStr) < new Date();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAllowedAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 text-red-500 mx-auto mb-2" />
            <CardTitle className="text-red-600">Acceso Denegado</CardTitle>
            <CardDescription>
              No tienes permisos para acceder al panel de administracion.
              Solo los administradores autorizados pueden ver esta pagina.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => navigate(createPageUrl('Dashboard'))}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate(createPageUrl('Dashboard'))}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Shield className="w-8 h-8 text-violet-600" />
            Panel de Administracion
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Gestionar usuarios, roles y suscripciones
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Sesion: {user?.email}
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mb-4 border-green-500 bg-green-50 dark:bg-green-950">
            <AlertDescription className="text-green-700 dark:text-green-300">{success}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Usuarios
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Crear Usuario
            </TabsTrigger>
          </TabsList>

          {/* Users tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Usuarios registrados</CardTitle>
                  <CardDescription>{users.length} usuarios en total</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={fetchUsers} disabled={loadingUsers}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${loadingUsers ? 'animate-spin' : ''}`} />
                  Actualizar
                </Button>
              </CardHeader>
              <CardContent>
                {loadingUsers ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-violet-600" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Email</TableHead>
                          <TableHead>Rol</TableHead>
                          <TableHead>Suscripcion</TableHead>
                          <TableHead>Expira</TableHead>
                          <TableHead>Creado</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((u) => (
                          <TableRow key={u.id}>
                            <TableCell className="font-medium">{u.email}</TableCell>
                            <TableCell>
                              <Badge variant={u.role === 'admin' ? 'default' : 'secondary'}>
                                {u.role === 'admin' ? 'Admin' : 'Usuario'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={u.subscription_type === 'premium_annual' ? 'default' : 'outline'}
                                className={
                                  u.subscription_type === 'premium_annual'
                                    ? isExpired(u.subscription_expires_at)
                                      ? 'bg-red-500 hover:bg-red-600'
                                      : 'bg-amber-500 hover:bg-amber-600'
                                    : ''
                                }
                              >
                                {u.subscription_type === 'premium_annual'
                                  ? isExpired(u.subscription_expires_at) ? 'Premium (Expirado)' : 'Premium'
                                  : 'Free'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className={isExpired(u.subscription_expires_at) ? 'text-red-500 font-medium' : ''}>
                                {formatDate(u.subscription_expires_at)}
                              </span>
                            </TableCell>
                            <TableCell>{formatDate(u.created_at)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSubDialog({ id: u.id, email: u.email })}
                                >
                                  <Crown className="w-3 h-3 mr-1" />
                                  Premium
                                </Button>
                                {u.subscription_type === 'premium_annual' && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => setDeactivateDialog({ id: u.id, email: u.email })}
                                  >
                                    <Ban className="w-3 h-3 mr-1" />
                                    Desactivar
                                  </Button>
                                )}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setRoleDialog({
                                    id: u.id,
                                    email: u.email,
                                    currentRole: u.role,
                                    newRole: u.role === 'admin' ? 'user' : 'admin',
                                  })}
                                >
                                  <Shield className="w-3 h-3 mr-1" />
                                  Rol
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create user tab */}
          <TabsContent value="create">
            <Card className="max-w-lg">
              <CardHeader>
                <CardTitle>Crear nuevo usuario</CardTitle>
                <CardDescription>
                  Crear un usuario manualmente con email y contraseña
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      required
                      placeholder="usuario@ejemplo.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      placeholder="Min 10 chars, mayuscula, minuscula, numero"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Rol</Label>
                    <Select value={newRole} onValueChange={setNewRole}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Usuario</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <Switch
                      id="premium"
                      checked={newWithPremium}
                      onCheckedChange={setNewWithPremium}
                    />
                    <Label htmlFor="premium">Activar suscripcion premium anual</Label>
                  </div>
                  <Button type="submit" className="w-full" disabled={creating}>
                    {creating ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creando...</>
                    ) : (
                      <><UserPlus className="w-4 h-4 mr-2" />Crear Usuario</>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Role change dialog */}
        <Dialog open={!!roleDialog} onOpenChange={(open) => !open && setRoleDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cambiar rol de usuario</DialogTitle>
              <DialogDescription>
                Cambiar el rol de <strong>{roleDialog?.email}</strong> de{' '}
                <Badge variant="secondary">{roleDialog?.currentRole}</Badge> a{' '}
                <Badge>{roleDialog?.newRole}</Badge>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRoleDialog(null)}>Cancelar</Button>
              <Button onClick={handleUpdateRole} disabled={actionLoading}>
                {actionLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Subscription dialog with period selection */}
        <Dialog open={!!subDialog} onOpenChange={(open) => {
          if (!open) {
            setSubDialog(null);
            setSelectedPeriod('365');
            setCustomDays('');
            setStartDate('');
          }
        }}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-500" />
                Activar suscripcion premium
              </DialogTitle>
              <DialogDescription>
                Configurar suscripcion manual para <strong>{subDialog?.email}</strong>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Periodo de suscripcion
                </Label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar periodo" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBSCRIPTION_PERIODS.map((p) => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedPeriod === 'custom' && (
                <div className="space-y-2">
                  <Label htmlFor="customDays">Cantidad de dias</Label>
                  <Input
                    id="customDays"
                    type="number"
                    min="1"
                    max="730"
                    value={customDays}
                    onChange={(e) => setCustomDays(e.target.value)}
                    placeholder="Ej: 45"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="startDate" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Fecha de inicio (opcional)
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <p className="text-xs text-slate-500">
                  Si no se selecciona, la suscripcion inicia hoy.
                </p>
              </div>

              <div className="rounded-md bg-slate-100 dark:bg-slate-800 p-3 text-sm">
                <p className="font-medium text-slate-700 dark:text-slate-300">Resumen:</p>
                <p className="text-slate-600 dark:text-slate-400">
                  Duracion: {selectedPeriod === 'custom'
                    ? (customDays ? `${customDays} dias` : 'Sin definir')
                    : SUBSCRIPTION_PERIODS.find(p => p.value === selectedPeriod)?.label}
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  Inicio: {startDate ? new Date(startDate + 'T12:00:00').toLocaleDateString('es-AR') : 'Hoy'}
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setSubDialog(null);
                setSelectedPeriod('365');
                setCustomDays('');
                setStartDate('');
              }}>
                Cancelar
              </Button>
              <Button
                onClick={handleUpdateSubscription}
                disabled={actionLoading || (selectedPeriod === 'custom' && !customDays)}
                className="bg-amber-500 hover:bg-amber-600"
              >
                {actionLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Crown className="w-4 h-4 mr-2" />}
                Activar Premium
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Deactivate subscription dialog */}
        <Dialog open={!!deactivateDialog} onOpenChange={(open) => !open && setDeactivateDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-red-600">Desactivar suscripcion</DialogTitle>
              <DialogDescription>
                Se desactivara la suscripcion premium de <strong>{deactivateDialog?.email}</strong>.
                El usuario pasara a plan Free.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeactivateDialog(null)}>Cancelar</Button>
              <Button variant="destructive" onClick={handleDeactivateSubscription} disabled={actionLoading}>
                {actionLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Ban className="w-4 h-4 mr-2" />}
                Desactivar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
