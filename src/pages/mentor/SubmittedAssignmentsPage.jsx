import { useState, useEffect, useMemo } from 'react';
import { submittedAssignmentsData } from '../../data/submittedAssignments';
import AssignmentsHeader from '../../components/submittedAssignments/AssignmentsHeader';
import SubmittedAssignmentCard from '../../components/submittedAssignments/SubmittedAssignmentCard';
import AssignmentsFilterModal from '../../components/submittedAssignments/AssignmentsFilterModal';
import AssignmentReviewModal from '../../components/submittedAssignments/AssignmentReviewModal';
import AssignmentPreviewModal from '../../components/submittedAssignments/AssignmentPreviewModal';
import DeleteAssignmentDialog from '../../components/submittedAssignments/DeleteAssignmentDialog';
import DownloadAssignmentDialog from '../../components/submittedAssignments/DownloadAssignmentDialog';
import LoadMoreButton from '../../components/submittedAssignments/LoadMoreButton';
import EmptyState from '../../components/submittedAssignments/EmptyState';
import SkeletonCard from '../../components/submittedAssignments/SkeletonCard';
import Toast from '../../components/ui/Toast';
import { Search } from 'lucide-react';

export default function SubmittedAssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('Barcha guruhlar');
  
  // Modals state
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState(null);
  
  const [reviewModalData, setReviewModalData] = useState(null);
  const [previewModalData, setPreviewModalData] = useState(null);
  const [deleteDialogData, setDeleteDialogData] = useState(null);
  const [downloadDialogData, setDownloadDialogData] = useState(null);
  
  // Toast state
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = (message) => {
    setToastMessage(message);
    setIsToastVisible(true);
  };

  // Pagination / Load More state
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setAssignments(submittedAssignmentsData);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleReviewSave = (id, data) => {
    setAssignments(prev => prev.map(a => 
      a.id === id ? { ...a, status: 'completed', score: data.score, comment: data.comment, reviewedAt: 'Hozir' } : a
    ));
    showToast("Vazifa baholandi");
  };

  const handleDeleteConfirm = () => {
    if (deleteDialogData) {
      setAssignments(prev => prev.filter(a => a.id !== deleteDialogData.id));
      showToast("Vazifa muvaffaqiyatli o'chirildi");
    }
  };

  const handleDownloadConfirm = () => {
    if (downloadDialogData) {
      showToast("Vazifa yuklab olindi");
    }
  };

  const handleCopy = (assignment) => {
    navigator.clipboard.writeText(`https://mentorflow.uz/assignments/${assignment.id}`)
      .then(() => showToast("Havola nusxalandi"))
      .catch(() => showToast("Xatolik yuz berdi"));
  };

  const handleLoadMore = () => {
    setIsLoadMoreLoading(true);
    setTimeout(() => {
      // Simulate adding more mock data
      const newMockData = assignments.slice(0, 3).map((item, index) => ({
        ...item,
        id: Date.now() + index,
      }));
      setAssignments(prev => [...prev, ...newMockData]);
      setVisibleCount(prev => prev + 3);
      setIsLoadMoreLoading(false);
    }, 800);
  };

  const filteredAssignments = useMemo(() => {
    let result = [...assignments];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a => 
        a.assignmentTitle.toLowerCase().includes(q) ||
        a.studentName.toLowerCase().includes(q) ||
        a.group.toLowerCase().includes(q)
      );
    }

    // Group dropdown filter
    if (selectedGroup !== 'Barcha guruhlar') {
      result = result.filter(a => a.group.includes(selectedGroup));
    }

    // Modal filters
    if (filterCriteria) {
      if (filterCriteria.status) {
        result = result.filter(a => a.status === filterCriteria.status);
      }
      if (filterCriteria.group) {
        result = result.filter(a => a.group.includes(filterCriteria.group));
      }
    }

    return result;
  }, [assignments, searchQuery, selectedGroup, filterCriteria]);

  const visibleAssignments = filteredAssignments.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAssignments.length || assignments.length < 20; // Allow infinite mock load for demo

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <AssignmentsHeader 
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        onOpenFilter={() => setIsFilterModalOpen(true)}
      />

      <div className="mb-8 relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400 dark:text-slate-500" />
        </div>
        <input
          type="text"
          placeholder="O'quvchi, guruh yoki vazifani qidiring..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-10 pr-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20 transition-shadow"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : filteredAssignments.length === 0 ? (
        <EmptyState 
          onReset={() => {
            setSearchQuery('');
            setSelectedGroup('Barcha guruhlar');
            setFilterCriteria(null);
          }} 
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {visibleAssignments.map(assignment => (
              <SubmittedAssignmentCard 
                key={assignment.id} 
                assignment={assignment}
                onReview={() => setReviewModalData(assignment)}
                onPreview={() => setPreviewModalData(assignment)}
                onDelete={() => setDeleteDialogData(assignment)}
                onDownload={() => setDownloadDialogData(assignment)}
                onCopy={() => handleCopy(assignment)}
              />
            ))}
          </div>

          {hasMore && (
            <LoadMoreButton 
              onClick={handleLoadMore} 
              isLoading={isLoadMoreLoading} 
            />
          )}
        </>
      )}

      {/* Modals */}
      <AssignmentsFilterModal 
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={setFilterCriteria}
      />
      
      <AssignmentReviewModal
        isOpen={!!reviewModalData}
        onClose={() => setReviewModalData(null)}
        assignment={reviewModalData}
        onSave={handleReviewSave}
      />

      <AssignmentPreviewModal
        isOpen={!!previewModalData}
        onClose={() => setPreviewModalData(null)}
        assignment={previewModalData}
      />

      <DeleteAssignmentDialog
        isOpen={!!deleteDialogData}
        onClose={() => setDeleteDialogData(null)}
        onConfirm={handleDeleteConfirm}
        assignmentTitle={deleteDialogData?.assignmentTitle}
      />

      <DownloadAssignmentDialog
        isOpen={!!downloadDialogData}
        onClose={() => setDownloadDialogData(null)}
        onConfirm={handleDownloadConfirm}
        assignmentTitle={downloadDialogData?.assignmentTitle}
      />

      <Toast 
        message={toastMessage} 
        isVisible={isToastVisible} 
        onClose={() => setIsToastVisible(false)} 
      />
    </div>
  );
}
