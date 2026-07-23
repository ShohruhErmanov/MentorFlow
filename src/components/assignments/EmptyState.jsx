import React from 'react';

const EmptyState = ({ onAdd }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-48 h-48 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
         <img src="https://illustrations.popsy.co/blue/surreal-hourglass.svg" alt="Empty" className="w-32 h-32 opacity-75" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Vazifalar topilmadi</h3>
      <p className="text-gray-500 max-w-sm mb-6">Hozircha hech qanday vazifa qo'shilmagan. Yangi vazifa yaratish uchun quyidagi tugmani bosing.</p>
      
      <button 
        onClick={onAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
      >
        Yangi vazifa
      </button>
    </div>
  );
};

export default EmptyState;
