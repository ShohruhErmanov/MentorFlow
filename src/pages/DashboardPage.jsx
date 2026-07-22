import SideNav from '../components/dashboard/SideNav';
import TopBar from '../components/dashboard/TopBar';
import DashboardContent from '../components/dashboard/DashboardContent';

export default function DashboardPage() {
  return (
    <div className="bg-background flex min-h-screen">
      {/* Fixed Sidebar */}
      <SideNav />

      {/* Main content pushed right on md+ */}
      <div className="flex-1 md:ml-[280px] flex flex-col min-h-screen">
        <TopBar />
        <DashboardContent />
      </div>
    </div>
  );
}
