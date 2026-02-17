import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function IniciarSesion() {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(createPageUrl('Acceso'), { replace: true });
  }, [navigate]);

  return null;
}
