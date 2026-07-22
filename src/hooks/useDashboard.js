import { useMemo, useState } from 'react';
import { getMentorDashboardData } from '../services/dashboardService';

export function useDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const data = useMemo(() => getMentorDashboardData(), []);

  return {
    ...data,
    sidebarOpen,
    openSidebar: () => setSidebarOpen(true),
    closeSidebar: () => setSidebarOpen(false),
    toggleSidebar: () => setSidebarOpen((value) => !value),
  };
}
