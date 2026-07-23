import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AssignmentRow from './AssignmentRow';
import EmptyState from './EmptyState';
import LoadingSkeleton from './LoadingSkeleton';

const AssignmentTable = ({ assignments, isLoading, onView, onEdit, onDuplicate, onDelete, onAdd }) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!assignments || assignments.length === 0) {
    return <EmptyState onAdd={onAdd} />;
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px]">
        {/* Table Header */}
        <div className="grid grid-cols-[minmax(250px,1fr)_120px_150px_150px_100px_80px] gap-4 items-center p-4 bg-[#F8F9FA] border-b border-gray-100 rounded-t-2xl">
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Vazifa nomi</div>
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Guruh</div>
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Muddat</div>
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Holat</div>
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Maks. ball</div>
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right pr-4">Amallar</div>
        </div>

        {/* Table Body */}
        <div className="bg-white">
          <AnimatePresence>
            {assignments.map((assignment) => (
              <AssignmentRow
                key={assignment.id}
                assignment={assignment}
                onView={onView}
                onEdit={onEdit}
                onDuplicate={onDuplicate}
                onDelete={onDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AssignmentTable;
