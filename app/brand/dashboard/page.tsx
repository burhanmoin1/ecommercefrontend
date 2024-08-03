import SessionChecker from "./sessionchecker";
import Sidebar from "./Sidebar";
import './dashboard.css';
import Headerandmain from "./Headerandmain";
import BrandProductsForDashboard from "./BrandProductsForDashboard";

export default function DashboardPage() {
  return (
    <main>
     <SessionChecker>
      <div className="InitialDashboardContainer">
        <Sidebar />
          <Headerandmain />
          <BrandProductsForDashboard />
        </div>
      
     </SessionChecker>
    </main>
  );
}
