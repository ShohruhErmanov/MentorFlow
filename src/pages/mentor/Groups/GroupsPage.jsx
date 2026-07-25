import { motion, AnimatePresence } from 'framer-motion';
import { useGroups } from '../../../hooks/groups/useGroups';
import GroupActions from '../../../components/groups/GroupActions';
import GroupFilters from '../../../components/groups/GroupFilters';
import GroupCard from '../../../components/groups/GroupCard';
import SummaryCards from '../../../components/groups/SummaryCards';
import Pagination from '../../../components/ui/Pagination';
import EmptyState from '../../../components/ui/EmptyState';
import CreateGroupModal from '../../../components/groups/CreateGroupModal';
import EditGroupModal from '../../../components/groups/EditGroupModal';
import DeleteGroupDialog from '../../../components/groups/DeleteGroupDialog';
import ImportDialog from '../../../components/groups/ImportDialog';
import ExportDialog from '../../../components/groups/ExportDialog';
import Toast from '../../../components/ui/Toast';

export default function GroupsPage() {
  const {
    groups,
    allGroups,
    totalGroups,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    courseFilter,
    setCourseFilter,
    sortBy,
    setSortBy,
    currentPage,
    totalPages,
    handlePageChange,
    isCreateModalOpen,
    setIsCreateModalOpen,
    editingGroup,
    setEditingGroup,
    deletingGroup,
    setDeletingGroup,
    isImportModalOpen,
    setIsImportModalOpen,
    isExportModalOpen,
    setIsExportModalOpen,
    toast,
    hideToast,
    handleCreateGroup,
    handleUpdateGroup,
    handleDeleteGroup,
    handleImport,
    handleExport,
  } = useGroups();

  const totalStudents = allGroups.reduce((acc, g) => acc + g.students.count, 0);
  const averageAttendance = allGroups.length > 0
    ? (allGroups.reduce((acc, g) => acc + g.attendance, 0) / allGroups.length).toFixed(1)
    : 0;
  const averageProgress = allGroups.length > 0
    ? (allGroups.reduce((acc, g) => acc + g.progress, 0) / allGroups.length).toFixed(1)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 sm:p-6 lg:p-8"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#191b23] dark:text-white lg:text-3xl">Guruhlar</h1>
        <p className="mt-1 text-sm font-medium text-[#737686] dark:text-slate-400">Barcha faol o'quv guruhlari ro'yxati</p>
      </div>

      <div className="mb-6 space-y-4">
        <GroupActions
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCreateClick={() => setIsCreateModalOpen(true)}
          onImportClick={() => setIsImportModalOpen(true)}
          onExportClick={() => setIsExportModalOpen(true)}
        />
        <GroupFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          courseFilter={courseFilter}
          setCourseFilter={setCourseFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {groups.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {groups.map((group) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <GroupCard
                  group={group}
                  onEdit={setEditingGroup}
                  onDelete={setDeletingGroup}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <EmptyState onCreateClick={() => setIsCreateModalOpen(true)} />
      )}

      {groups.length > 0 && (
        <>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <SummaryCards
            totalGroups={totalGroups}
            totalStudents={totalStudents}
            averageAttendance={averageAttendance}
            averageProgress={averageProgress}
          />
        </>
      )}

      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateGroup}
      />

      <EditGroupModal
        isOpen={!!editingGroup}
        onClose={() => setEditingGroup(null)}
        onUpdate={handleUpdateGroup}
        group={editingGroup}
      />

      <DeleteGroupDialog
        isOpen={!!deletingGroup}
        onClose={() => setDeletingGroup(null)}
        onConfirm={() => handleDeleteGroup(deletingGroup.id)}
        groupName={deletingGroup?.name}
      />

      <ImportDialog
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImport}
      />

      <ExportDialog
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />

      <Toast 
        message={toast.message} 
        isVisible={toast.isVisible} 
        onClose={hideToast} 
      />
    </motion.div>
  );
}
