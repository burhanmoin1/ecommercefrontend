import SessionChecker from "./sessionchecker";
import Sidebar from "./Sidebar";
import './dashboard.css';
import Headerandmain from "./Headerandmain";

export default function DashboardPage() {
  return (
    <main>
     <SessionChecker>
      <div className="InitialDashboardContainer">
        <Sidebar />
          <Headerandmain />
        </div>
      
     </SessionChecker>
    </main>
  );
}
