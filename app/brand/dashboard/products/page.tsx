import SessionChecker from "../sessionchecker";
import '../dashboard.css';
import BrandProductsForDashboard from './BrandProductsForDashboard';
import Sidebar from "../Sidebar";

export default function DashboardPage() {
  return (
    <main>
     <SessionChecker>
        <Sidebar />
      <div className="InitialDashboardContainer">
        <BrandProductsForDashboard />
        </div>
     </SessionChecker>
    </main>
  );
}
