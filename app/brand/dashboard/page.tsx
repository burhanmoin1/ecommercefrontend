import SessionChecker from "./sessionchecker";
import Sidebar from "./Sidebar";
import './dashboard.css';
import Header from "./Header";
import MainContent from "./MainContent";

export default function DashboardPage() {
  return (
    <main>
     <SessionChecker>
      <div className="InitialDashboardContainer">
        <Sidebar />
          <Header />
          <MainContent />
          </div>
      
     </SessionChecker>
    </main>
  );
}
