import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Mail, HeartHandshake, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { clearToken } from '@/lib/adminApi';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/contacts', label: 'Contact Messages', icon: Mail },
  { to: '/admin/volunteers', label: 'Volunteer Applications', icon: HeartHandshake },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    clearToken();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-white border-r border-neutral-200 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-200">
          <span className="font-semibold text-lg text-neutral-900">DREFO Admin</span>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 flex flex-col gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-4"
          >
            <LogOut size={18} />
            Log out
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center px-4 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
          <span className="ml-4 font-semibold text-neutral-900">DREFO Admin</span>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
