import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';

const MentorDashboard = lazy(() => import('./pages/mentor/Dashboard'));
const LoginPage = lazy(() => import('./pages/Login.jsx'));
const RegisterPage = lazy(() => import('./pages/Register.jsx'));

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
          </Route>
          <Route path="*" element={<Navigate to="/mentor/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
