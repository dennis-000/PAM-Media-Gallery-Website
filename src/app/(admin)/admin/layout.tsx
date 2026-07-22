import { AdminSidebar } from '@/components/layout/admin-sidebar';

export const metadata = {
  title: 'PAM Media Admin Panel | Operations Dashboard',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-obsidian text-parchment font-sans">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
