import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getGroupById, getStudentsByGroupId } from '../../services/groups/groupsService';
import GroupHeader from '../../components/groups/GroupHeader';
import GroupStatsGrid from '../../components/groups/GroupStatsGrid';
import GroupTabs from '../../components/groups/GroupTabs';
import StudentTable from '../../components/groups/StudentTable';
import AssignmentTable from '../../components/groups/AssignmentTable';
import EmptyState from '../../components/ui/EmptyState';
import Skeleton from '../../components/ui/Skeleton';
import EditGroupModal from '../../components/groups/EditGroupModal';
import AddAssignmentModal from '../../components/groups/AddAssignmentModal';
import EditAssignmentModal from '../../components/groups/EditAssignmentModal';
import DeleteAssignmentDialog from '../../components/groups/DeleteAssignmentDialog';
import Toast from '../../components/ui/Toast';

const initialMockAssignments = [
  {
    id: 'a1',
    title: 'React Hooks amaliyoti',
    description: 'useState va useEffect qanday ishlashini o\'rganish',
    course: 'Frontend',
    deadline: '2024-09-15',
    maxScore: 100,
    priority: 'High',
    difficulty: 'Medium',
  },
  {
    id: 'a2',
    title: 'Component tuzilmasi',
    description: 'Props va State bilan ishlash asoslari',
    course: 'Frontend',
    deadline: '2024-09-20',
    maxScore: 100,
    priority: 'Medium',
    difficulty: 'Easy',
  }
];

export default function GroupDetails() {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState(initialMockAssignments);
  const [activeTab, setActiveTab] = useState('students');
  const [isLoading, setIsLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddAssignmentModalOpen, setIsAddAssignmentModalOpen] = useState(false);
  const [isEditAssignmentModalOpen, setIsEditAssignmentModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [deletingAssignment, setDeletingAssignment] = useState(null);

  const [toast, setToast] = useState({ message: '', isVisible: false });

  const showToast = (message) => {
    setToast({ message, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleUpdateGroup = (data) => {
    setGroup(prev => ({ ...prev, ...data }));
    setIsEditModalOpen(false);
    showToast("Guruh ma'lumotlari tahrirlandi!");
  };

  const handleCreateAssignment = (data) => {
    const newAssignment = {
      id: Date.now().toString(),
      ...data,
    };
    setAssignments([newAssignment, ...assignments]);
    setIsAddAssignmentModalOpen(false);
    showToast("Yangi vazifa qo'shildi!");
  };

  const handleUpdateAssignment = (data) => {
    setAssignments(assignments.map(a => a.id === editingAssignment.id ? { ...a, ...data } : a));
    setIsEditAssignmentModalOpen(false);
    setEditingAssignment(null);
    showToast("Vazifa tahrirlandi!");
  };

  const handleDeleteAssignment = () => {
    setAssignments(assignments.filter(a => a.id !== deletingAssignment.id));
    setDeletingAssignment(null);
    showToast("Vazifa o'chirildi!");
  };

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    const timer = setTimeout(() => {
      const groupData = getGroupById(groupId);
      if (groupData) {
        setGroup(groupData);
        setStudents(getStudentsByGroupId(groupId));
      }
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [groupId]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-4">
          <Skeleton className="h-4 w-32" />
          <div className="flex justify-between">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28 w-full rounded-2xl" />)}
        </div>
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </div>
    );
  }

  if (!group) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <EmptyState title="Guruh topilmadi" description="Siz qidirayotgan guruh mavjud emas yoki o'chirilgan." />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <GroupHeader 
        group={group} 
        onEditClick={() => setIsEditModalOpen(true)}
        onAddAssignmentClick={() => setIsAddAssignmentModalOpen(true)}
      />
      
      <GroupStatsGrid group={group} activeAssignmentsCount={assignments.length} />
      
      <div className="mt-8">
        <GroupTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'students' && (
              <StudentTable students={students} />
            )}
            {activeTab === 'tasks' && (
              <AssignmentTable 
                assignments={assignments} 
                onEdit={(a) => {
                  setEditingAssignment(a);
                  setIsEditAssignmentModalOpen(true);
                }} 
                onDelete={setDeletingAssignment} 
              />
            )}
            {activeTab !== 'students' && activeTab !== 'tasks' && (
              <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-[#e1e2ed] bg-white dark:border-slate-700 dark:bg-slate-800">
                <EmptyState
                  title="Hozircha bo'sh"
                  description="Bu bo'lim hali ishlab chiqilmoqda yoki ma'lumotlar yo'q."
                  buttonText={null}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <EditGroupModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateGroup}
        group={group}
      />

      <AddAssignmentModal
        isOpen={isAddAssignmentModalOpen}
        onClose={() => setIsAddAssignmentModalOpen(false)}
        onCreate={handleCreateAssignment}
      />

      <EditAssignmentModal
        isOpen={isEditAssignmentModalOpen}
        onClose={() => {
          setIsEditAssignmentModalOpen(false);
          setEditingAssignment(null);
        }}
        onUpdate={handleUpdateAssignment}
        assignment={editingAssignment}
      />

      <DeleteAssignmentDialog
        isOpen={!!deletingAssignment}
        onClose={() => setDeletingAssignment(null)}
        onConfirm={handleDeleteAssignment}
        assignmentTitle={deletingAssignment?.title}
      />

      <Toast 
        message={toast.message} 
        isVisible={toast.isVisible} 
        onClose={hideToast} 
      />
    </motion.div>
  );
}
