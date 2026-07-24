import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Figma, Github, Youtube, AlertTriangle } from 'lucide-react';
import ResourceCard from './ResourceCard';
import ResourceLinkModal from './ResourceLinkModal';

const RemoveResourceDialog = ({ isOpen, onClose, onConfirm, resourceName }) => {
  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            style={{ width: 400, background: '#fff', padding: 24, borderRadius: 20, textAlign: 'center', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)' }}
          >
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <AlertTriangle size={24} color="#dc2626" />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: '#111827' }}>Biriktirmani o'chirish</h3>
            <p style={{ margin: '0 0 24px', fontSize: 14, color: '#6b7280' }}>
              Siz haqiqatan ham <strong>{resourceName}</strong> materialini o'chirmoqchimisiz?
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={onClose} style={{ flex: 1, padding: '10px', borderRadius: 10, background: '#f3f4f6', border: 'none', fontWeight: 500, cursor: 'pointer', color: '#374151' }}>Bekor qilish</button>
              <button onClick={onConfirm} style={{ flex: 1, padding: '10px', borderRadius: 10, background: '#dc2626', border: 'none', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>O'chirish</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  return createPortal(modal, document.body);
};


const LearningResources = ({ resources, setResources }) => {
  const [activeModal, setActiveModal] = useState(null); // 'figma', 'github', 'video'
  const [removePrompt, setRemovePrompt] = useState(null); // 'pdf', 'figma', 'github', 'video'
  const fileInputRef = useRef(null);

  // -- Handlers --
  const handlePdfUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock loading/upload
      setTimeout(() => {
        setResources(prev => ({
          ...prev,
          pdf: { name: file.name, size: (file.size / (1024 * 1024)).toFixed(2) + ' MB' }
        }));
      }, 500);
    }
  };

  const handleSaveLink = (type, url) => {
    if (type === 'figma') {
      setResources(prev => ({ ...prev, figma: { url, shortUrl: 'figma.com/file/...' } }));
    } else if (type === 'github') {
      const parts = url.split('/');
      const name = parts[parts.length - 1] || 'repository';
      setResources(prev => ({ ...prev, github: { url, name, branch: 'main' } }));
    } else if (type === 'video') {
      setResources(prev => ({ ...prev, video: { url, duration: '12:45' } }));
    }
    setActiveModal(null);
  };

  const handleRemove = () => {
    if (removePrompt) {
      setResources(prev => ({ ...prev, [removePrompt]: null }));
      setRemovePrompt(null);
    }
  };

  // -- Validators --
  const figmaValidator = (url) => url.startsWith('https://figma.com') || url.startsWith('https://www.figma.com');
  const githubValidator = (url) => url.startsWith('https://github.com/');
  const videoValidator = (url) => url.startsWith('https://youtube.com/') || url.startsWith('https://youtu.be/') || url.startsWith('https://drive.google.com/');

  return (
    <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid #f3f4f6' }}>
      <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 600, color: '#111827' }}>
        Qo'shimcha materiallar biriktirish
      </h3>
      <p style={{ margin: '0 0 20px', fontSize: 13, color: '#6b7280' }}>
        Fayllar, havolalar yoki video darsliklarni qo'shing.
      </p>

      {/* Grid: 1 col on mobile, 2 on tablet, 4 on desktop. Using flex wrap for robust CSS-agnostic layout */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        
        {/* PDF Card */}
        <div style={{ flex: '1 1 180px', minWidth: 200 }}>
          <ResourceCard
            icon={FileText}
            title="PDF yuklash"
            description="Topshiriq uchun PDF fayl biriktirish."
            iconColor="#dc2626"
            iconBg="#fef2f2"
            isConnected={!!resources.pdf}
            onAdd={() => fileInputRef.current?.click()}
            onEdit={() => fileInputRef.current?.click()}
            onRemove={() => setRemovePrompt('pdf')}
            connectedTitle={resources.pdf?.name}
            connectedSubtitle={resources.pdf?.size}
          />
          <input 
            type="file" 
            accept=".pdf" 
            ref={fileInputRef} 
            onChange={handlePdfUpload} 
            style={{ display: 'none' }} 
          />
        </div>

        {/* Figma Card */}
        <div style={{ flex: '1 1 180px', minWidth: 200 }}>
          <ResourceCard
            icon={Figma}
            title="Figma havola"
            description="Dizayn maketlari uchun havola."
            iconColor="#db2777"
            iconBg="#fce7f3"
            isConnected={!!resources.figma}
            onAdd={() => setActiveModal('figma')}
            onEdit={() => setActiveModal('figma')}
            onRemove={() => setRemovePrompt('figma')}
            connectedTitle="Figma Dizayn"
            connectedSubtitle={resources.figma?.shortUrl}
          />
        </div>

        {/* GitHub Card */}
        <div style={{ flex: '1 1 180px', minWidth: 200 }}>
          <ResourceCard
            icon={Github}
            title="GitHub Repo"
            description="Boshlang'ich kod yoki namunalar."
            iconColor="#111827"
            iconBg="#f3f4f6"
            isConnected={!!resources.github}
            onAdd={() => setActiveModal('github')}
            onEdit={() => setActiveModal('github')}
            onRemove={() => setRemovePrompt('github')}
            connectedTitle={resources.github?.name}
            connectedSubtitle={`Branch: ${resources.github?.branch}`}
          />
        </div>

        {/* Video Card */}
        <div style={{ flex: '1 1 180px', minWidth: 200 }}>
          <ResourceCard
            icon={Youtube}
            title="Video dars"
            description="Tushuntirish yoki darslik videosi."
            iconColor="#ea580c"
            iconBg="#ffedd5"
            isConnected={!!resources.video}
            onAdd={() => setActiveModal('video')}
            onEdit={() => setActiveModal('video')}
            onRemove={() => setRemovePrompt('video')}
            connectedTitle="Video darslik"
            connectedSubtitle={`Davomiyligi: ${resources.video?.duration}`}
          />
        </div>

      </div>

      {/* Modals */}
      <ResourceLinkModal
        isOpen={activeModal === 'figma'}
        onClose={() => setActiveModal(null)}
        onSave={(url) => handleSaveLink('figma', url)}
        title="Figma havola qo'shish"
        icon={Figma}
        placeholder="https://figma.com/..."
        validator={figmaValidator}
        initialValue={resources.figma?.url}
      />
      
      <ResourceLinkModal
        isOpen={activeModal === 'github'}
        onClose={() => setActiveModal(null)}
        onSave={(url) => handleSaveLink('github', url)}
        title="GitHub Repo qo'shish"
        icon={Github}
        placeholder="https://github.com/..."
        validator={githubValidator}
        initialValue={resources.github?.url}
      />
      
      <ResourceLinkModal
        isOpen={activeModal === 'video'}
        onClose={() => setActiveModal(null)}
        onSave={(url) => handleSaveLink('video', url)}
        title="Video dars qo'shish"
        icon={Youtube}
        placeholder="https://youtube.com/..."
        validator={videoValidator}
        initialValue={resources.video?.url}
      />

      <RemoveResourceDialog
        isOpen={!!removePrompt}
        onClose={() => setRemovePrompt(null)}
        onConfirm={handleRemove}
        resourceName={
          removePrompt === 'pdf' ? 'PDF fayl' :
          removePrompt === 'figma' ? 'Figma havola' :
          removePrompt === 'github' ? 'GitHub Repo' :
          removePrompt === 'video' ? 'Video dars' : ''
        }
      />
    </div>
  );
};

export default LearningResources;
