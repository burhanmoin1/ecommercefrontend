import SessionChecker from "./sessionchecker";
import Dashboard from "./dashboard";
import Content from "./content";
import BrandFormList from "./BrandFormList";

export default function DashboardPage() {
  return (
    <main>
     <SessionChecker>
      <Dashboard />
      <BrandFormList />
      <Content/>
     </SessionChecker>
    </main>
  );
}
