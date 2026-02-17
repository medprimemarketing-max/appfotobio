import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function DebugPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();
  
  const params = new URLSearchParams(window.location.search);
  const debugEnabled = params.get('debug') === '1';
  
  if (!debugEnabled) return null;
  
  const buildID = `BUILD_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const pathname = window.location.pathname;
  const isAuthenticated = !!user;
  
  return (
    <div className="fixed bottom-4 right-4 bg-slate-800 text-white rounded-lg shadow-xl border border-slate-700 z-50 max-w-xs text-xs font-mono">
      {/* Header */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between px-3 py-2 hover:bg-slate-700 rounded-t-lg"
      >
        <span className="font-bold text-slate-300">🐛 DEBUG PANEL</span>
        {isCollapsed ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      
      {/* Content */}
      {!isCollapsed && (
        <div className="px-3 py-2 space-y-1 border-t border-slate-700">
          <div className="flex justify-between">
            <span className="text-slate-400">buildID:</span>
            <span className="text-green-400">{buildID}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">pathname:</span>
            <span className="text-blue-400">{pathname}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">authenticated:</span>
            <span className={isAuthenticated ? 'text-green-400' : 'text-red-400'}>
              {isAuthenticated ? 'true' : 'false'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}