import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import AttachedResourceBadge from './AttachedResourceBadge';

const ResourceCard = ({ icon: Icon, title, description, isConnected, onAdd, onEdit, onRemove, connectedTitle, connectedSubtitle, iconColorClass, iconBgClass }) => {
  return (
    <motion.div
      whileHover={!isConnected ? { y: -4 } : { y: -2 }}
      onClick={!isConnected ? onAdd : undefined}
      className={`bg-white dark:bg-slate-800 ${
        isConnected
          ? 'border-[1.5px] border-blue-500 shadow-[0_4px_14px_rgba(59,130,246,0.15)]'
          : 'border-[1.5px] border-gray-100 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500/60 shadow-[0_4px_14px_rgba(0,0,0,0.03)] dark:shadow-none'
      }`}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        borderRadius: '20px',
        cursor: isConnected ? 'default' : 'pointer',
        transition: 'all 0.2s ease',
        minHeight: '140px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div
          className={isConnected ? iconBgClass : 'bg-gray-50 dark:bg-slate-700/60'}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icon size={22} className={isConnected ? iconColorClass : 'text-gray-400 dark:text-slate-500'} />
        </div>
        {isConnected && <AttachedResourceBadge />}
      </div>

      <div style={{ flex: 1 }}>
        <h4 className="text-gray-900 dark:text-white" style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 600 }}>
          {isConnected ? connectedTitle : title}
        </h4>
        <p className="text-gray-500 dark:text-slate-400" style={{ margin: 0, fontSize: '13px', lineHeight: 1.4 }}>
          {isConnected ? connectedSubtitle : description}
        </p>
      </div>

      {isConnected && (
        <div className="border-t border-gray-100 dark:border-slate-700" style={{ display: 'flex', gap: '8px', marginTop: '16px', paddingTop: '12px' }}>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="bg-gray-50 hover:bg-gray-100 text-gray-600 dark:bg-slate-700/60 dark:hover:bg-slate-700 dark:text-slate-300"
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '6px', border: 'none', borderRadius: '8px', cursor: 'pointer',
              fontSize: '12px', fontWeight: 500, transition: 'background 0.15s'
            }}
          >
            <Edit2 size={12} /> Tahrir
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className="bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-500/10 dark:hover:bg-red-500/20 dark:text-red-400"
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '6px', border: 'none', borderRadius: '8px', cursor: 'pointer',
              fontSize: '12px', fontWeight: 500, transition: 'background 0.15s'
            }}
          >
            <Trash2 size={12} /> O'chirish
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ResourceCard;
