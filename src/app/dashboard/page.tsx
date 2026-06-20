import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardPage } from "@/components/dashboard/DashboardPage";

export const metadata: Metadata = {
  title: "Campus Ambassador Dashboard | Antaragni",
  description: "Access your verified Campus Ambassador profile and dashboard.",
};

export default function DashboardWrapperPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden pb-16">
      <Navbar />
      <DashboardPage />
    </main>
  );
}
