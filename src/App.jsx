import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import RoleRedirect from './routes/RoleRedirect';

const LoginPage = lazy(() => import('./pages/Login.jsx'));
const RegisterPage = lazy(() => import('./pages/Register.jsx'));

const AdminLayout = lazy(() => import('./layouts/AdminLayout.jsx'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'));

const MentorLayout = lazy(() => import('./layouts/MentorLayout.jsx'));
const MentorDashboard = lazy(() => import('./pages/mentor/MentorDashboard.jsx'));
const GroupsPage = lazy(() => import('./pages/mentor/Groups/GroupsPage.jsx'));
const GroupDetails = lazy(() => import('./pages/mentor/Groups/GroupDetails.jsx'));
const StudentsPage = lazy(() => import('./pages/mentor/Students/StudentsPage.jsx'));
const StudentProfile = lazy(() => import('./pages/mentor/Students/StudentProfile.jsx'));
const AssignmentsPage = lazy(() => import('./pages/mentor/AssignmentsPage.jsx'));
const SubmittedAssignmentsPage = lazy(() => import('./pages/mentor/SubmittedAssignmentsPage.jsx'));
const AssignmentReviewPage = lazy(() => import('./pages/mentor/AssignmentReviewPage.jsx'));
const AttendancePage = lazy(() => import('./pages/mentor/AttendancePage.jsx'));
const RankingPage = lazy(() => import('./pages/mentor/RankingPage.jsx'));
const MentorProfilePage = lazy(() => import('./pages/mentor/ProfilePage.jsx'));

const StudentLayout = lazy(() => import('./layouts/StudentLayout.jsx'));
const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard.jsx'));

const ParentLayout = lazy(() => import('./layouts/ParentLayout.jsx'));
const ParentDashboard = lazy(() => import('./pages/parent/ParentDashboard.jsx'));

function LoadingFallback() {
  return (
    <div className="grid min-h-dvh place-items-center bg-[#faf8ff] text-sm font-semibold text-[#434655] dark:bg-slate-900 dark:text-slate-300">
      Yuklanmoqda...
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<RoleRedirect />} />

            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['mentor']} />}>
              <Route element={<MentorLayout />}>
                <Route path="/mentor/dashboard" element={<MentorDashboard />} />
                <Route path="/mentor/groups" element={<GroupsPage />} />
                <Route path="/mentor/groups/:groupId" element={<GroupDetails />} />
                <Route path="/mentor/students" element={<StudentsPage />} />
                <Route path="/mentor/students/:studentId" element={<StudentProfile />} />
                <Route path="/mentor/assignments" element={<AssignmentsPage />} />
                <Route path="/mentor/submitted-assignments" element={<SubmittedAssignmentsPage />} />
                <Route path="/mentor/submitted-assignments/:id/review" element={<AssignmentReviewPage />} />
                <Route path="/mentor/attendance" element={<AttendancePage />} />
                <Route path="/mentor/rating" element={<RankingPage />} />
                <Route path="/mentor/profile" element={<MentorProfilePage />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route element={<StudentLayout />}>
                <Route path="/student/dashboard" element={<StudentDashboard />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['parent']} />}>
              <Route element={<ParentLayout />}>
                <Route path="/parent/dashboard" element={<ParentDashboard />} />
              </Route>
            </Route>

            <Route path="*" element={<RoleRedirect />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
