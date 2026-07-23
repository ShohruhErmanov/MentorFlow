import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getGroupById, getStudentsByGroupId } from '../../services/groups/groupsService';
import GroupHeader from '../../components/groups/GroupHeader';
import GroupStatsGrid from '../../components/groups/GroupStatsGrid';
import GroupTabs from '../../components/groups/GroupTabs';
import StudentTable from '../../components/groups/StudentTable';
import EmptyState from '../../components/ui/EmptyState';
import Skeleton from '../../components/ui/Skeleton';

export default function GroupDetails() {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState('students');
  const [isLoading, setIsLoading] = useState(true);

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
      <GroupHeader group={group} />
      
      <GroupStatsGrid group={group} />
      
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
            {activeTab !== 'students' && (
              <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-[#e1e2ed] bg-white">
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
    </motion.div>
  );
}
