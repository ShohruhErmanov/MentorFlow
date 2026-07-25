import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const AttachedResourceBadge = () => {
  return (
    <div className="bg-emerald-50 border border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/30" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '12px' }}>
      <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" />
      <span className="text-emerald-800 dark:text-emerald-400" style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
        Biriktirilgan
      </span>
    </div>
  );
};

export default AttachedResourceBadge;
