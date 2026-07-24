import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const AttachedResourceBadge = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#ecfdf5', padding: '4px 8px', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
      <CheckCircle2 size={12} color="#059669" />
      <span style={{ fontSize: '11px', fontWeight: 600, color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
        Biriktirilgan
      </span>
    </div>
  );
};

export default AttachedResourceBadge;
