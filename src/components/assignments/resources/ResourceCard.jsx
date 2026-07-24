import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import AttachedResourceBadge from './AttachedResourceBadge';

const ResourceCard = ({ icon: Icon, title, description, isConnected, onAdd, onEdit, onRemove, connectedTitle, connectedSubtitle, iconColor, iconBg }) => {
  return (
    <motion.div
      whileHover={!isConnected ? { y: -4, borderColor: '#60a5fa' } : { y: -2 }}
      onClick={!isConnected ? onAdd : undefined}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        background: '#ffffff',
        borderRadius: '20px',
        border: `1.5px solid ${isConnected ? '#3b82f6' : '#f3f4f6'}`,
        boxShadow: isConnected ? '0 4px 14px rgba(59,130,246,0.15)' : '0 4px 14px rgba(0,0,0,0.03)',
        cursor: isConnected ? 'default' : 'pointer',
        transition: 'all 0.2s ease',
        minHeight: '140px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          background: isConnected ? iconBg : '#f9fafb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon size={22} color={isConnected ? iconColor : '#9ca3af'} />
        </div>
        {isConnected && <AttachedResourceBadge />}
      </div>

      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 600, color: '#111827' }}>
          {isConnected ? connectedTitle : title}
        </h4>
        <p style={{ margin: 0, fontSize: '13px', color: '#6b7280', lineHeight: 1.4 }}>
          {isConnected ? connectedSubtitle : description}
        </p>
      </div>

      {isConnected && (
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '6px', background: '#f9fafb', border: 'none', borderRadius: '8px', cursor: 'pointer',
              fontSize: '12px', fontWeight: 500, color: '#4b5563', transition: 'background 0.15s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#f3f4f6')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#f9fafb')}
          >
            <Edit2 size={12} /> Tahrir
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '6px', background: '#fef2f2', border: 'none', borderRadius: '8px', cursor: 'pointer',
              fontSize: '12px', fontWeight: 500, color: '#dc2626', transition: 'background 0.15s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#fee2e2')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#fef2f2')}
          >
            <Trash2 size={12} /> O'chirish
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ResourceCard;
