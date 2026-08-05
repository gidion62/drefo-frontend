import { useEffect, useState } from 'react';
import { getStats } from '@/lib/adminApi';
import type { DashboardStats } from '@/lib/adminApi';
import { Mail, HeartHandshake, FolderKanban, Newspaper } from 'lucide-react';

const cardMeta: Record<string, { label: string; icon: typeof Mail }> = {
  unreadMessages: { label: 'Unread Messages', icon: Mail },
  volunteers: { label: 'Volunteer Applications', icon: HeartHandshake },
  projects: { label: 'Projects', icon: FolderKanban },
  updates: { label: 'News Updates', icon: Newspaper },
  gallery: { label: 'Gallery Images', icon: FolderKanban },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getStats()
      .then((res) => setStats(res.data))
      .catch((err) => setError(err.message || 'Failed to load stats'));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-neutral-900 mb-6">Dashboard</h1>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats &&
          Object.entries(stats).map(([key, value]) => {
            const meta = cardMeta[key] ?? { label: key, icon: FolderKanban };
            const Icon = meta.icon;
            return (
              <div
                key={key}
                className="bg-white border border-neutral-200 rounded-xl p-5 flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-neutral-700" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-neutral-900 leading-none">{value}</p>
                  <p className="text-sm text-neutral-500 mt-1">{meta.label}</p>
                </div>
              </div>
            );
          })}
      </div>

      {!stats && !error && <p className="text-sm text-neutral-500">Loading...</p>}
    </div>
  );
}
