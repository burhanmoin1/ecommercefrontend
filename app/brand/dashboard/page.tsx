import SessionChecker from "./sessionchecker";
import Dashboard from "./dashboard";

export default function DashboardPage() {
  return (
    <main>
     <SessionChecker>
      <Dashboard />
     </SessionChecker>
    </main>
  );
}
