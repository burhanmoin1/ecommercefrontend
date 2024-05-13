import SessionChecker from "./sessionchecker";
import Dashboard from "./dashboard";
import Content from "./content";
import BrandFormList from "./BrandFormList";
import AddPrimaryCategory from "./AddPrimaryCategory";
import AddSecondaryCategory from "./AddSecondaryCategory";

export default function DashboardPage() {
  return (
    <main>
     <SessionChecker>
      <Dashboard />
      <BrandFormList />
      <Content/>
      <AddPrimaryCategory />
      <AddSecondaryCategory />
     </SessionChecker>
    </main>
  );
}
