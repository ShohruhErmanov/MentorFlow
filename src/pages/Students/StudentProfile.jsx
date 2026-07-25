import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import useStudents from '../../hooks/students/useStudents';
import EmptyState from '../../components/ui/EmptyState';
import StudentProfileCard from '../../components/students/profile/StudentProfileCard';
import StudentStats from '../../components/students/profile/StudentStats';
import StudentTabs from '../../components/students/profile/StudentTabs';
import AssignmentList from '../../components/students/profile/AssignmentList';
import PerformanceChart from '../../components/students/profile/PerformanceChart';
import Achievements from '../../components/students/profile/Achievements';
import MessageModal from '../../components/students/profile/MessageModal';
import Toast from '../../components/ui/Toast';

export default function StudentProfile() {
  const { studentId } = useParams();
  const { students } = useStudents();
  
  const student = useMemo(() => {
    return students.find(s => s.id === studentId);
  }, [students, studentId]);

  const [activeTab, setActiveTab] = useState('assignments');
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', isVisible: false });

  const handleSendMessage = () => {
    setIsMessageModalOpen(true);
  };

  if (!student) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <EmptyState
          title="O'quvchi topilmadi"
          description="Siz izlayotgan o'quvchi tizimda mavjud emas."
          buttonText="Ortga qaytish"
          onAction={() => window.history.back()}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-[1600px] px-6 py-6 overflow-x-hidden"
    >
      <div className="mb-6">
        <Link 
          to="/mentor/students" 
          className="inline-flex items-center gap-2 text-sm font-medium text-[#737686] dark:text-slate-400 hover:text-[#2563eb] transition-colors"
        >
          <ArrowLeft size={16} />
          Ortga
        </Link>
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[#737686] dark:text-slate-400">
          <Link to="/mentor/students" className="hover:text-[#2563eb] transition-colors">
            O'quvchilar
          </Link>
          <span className="text-[#e1e2ed] dark:text-slate-700">&gt;</span>
          <span className="text-[#191b23] dark:text-white">{student.name}</span>
        </div>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-[340px_1fr] gap-6 items-start">
        {/* Left Column */}
        <div className="w-full shrink-0">
          <StudentProfileCard student={student} onMessageClick={handleSendMessage} />
        </div>

        {/* Right Column */}
        <div className="flex-1 min-w-0">
          <StudentStats student={student} />
          
          <div className="mt-8">
            <StudentTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            <div className="mt-6">
              <AnimatePresence mode="wait">
                {activeTab === 'assignments' && (
                  <motion.div
                    key="assignments"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AssignmentList />
                  </motion.div>
                )}
                {activeTab === 'performance' && (
                  <motion.div
                    key="performance"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PerformanceChart />
                  </motion.div>
                )}
                {activeTab === 'achievements' && (
                  <motion.div
                    key="achievements"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Achievements />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => {
          setIsMessageModalOpen(false);
          setToast({ message: "Xabar muvaffaqiyatli yuborildi!", isVisible: true });
        }}
        studentName={student.name}
      />

      <Toast 
        message={toast.message} 
        isVisible={toast.isVisible} 
        onClose={() => setToast({ ...toast, isVisible: false })} 
      />
    </motion.div>
  );
}
