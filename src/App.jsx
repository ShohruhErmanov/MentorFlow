import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';

const MentorDashboard = lazy(() => import('./pages/mentor/Dashboard'));
const LoginPage = lazy(() => import('./pages/Login.jsx'));
const RegisterPage = lazy(() => import('./pages/Register.jsx'));
const GroupsPage = lazy(() => import('./pages/Groups/GroupsPage.jsx'));
const GroupDetails = lazy(() => import('./pages/Groups/GroupDetails.jsx'));
const StudentsPage = lazy(() => import('./pages/Students/StudentsPage.jsx'));
const StudentProfile = lazy(() => import('./pages/Students/StudentProfile.jsx'));
const AssignmentsPage = lazy(() => import('./pages/AssignmentsPage.jsx'));
const SubmittedAssignmentsPage = lazy(() => import('./pages/SubmittedAssignmentsPage.jsx'));
const AssignmentReviewPage = lazy(() => import('./pages/AssignmentReviewPage.jsx'));
const AttendancePage = lazy(() => import('./pages/AttendancePage.jsx'));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="grid min-h-dvh place-items-center bg-[#faf8ff] text-sm font-semibold text-[#434655]">
            Yuklanmoqda...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Navigate to="/mentor/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<DashboardLayout />}>
            <Route path="/mentor/dashboard" element={<MentorDashboard />} />
            <Route path="/mentor/groups" element={<GroupsPage />} />
            <Route path="/mentor/groups/:groupId" element={<GroupDetails />} />
            <Route path="/mentor/students" element={<StudentsPage />} />
            <Route path="/mentor/students/:studentId" element={<StudentProfile />} />
            <Route path="/mentor/assignments" element={<AssignmentsPage />} />
            <Route path="/mentor/submitted-assignments" element={<SubmittedAssignmentsPage />} />
            <Route path="/mentor/submitted-assignments/:id/review" element={<AssignmentReviewPage />} />
            <Route path="/mentor/attendance" element={<AttendancePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/mentor/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
