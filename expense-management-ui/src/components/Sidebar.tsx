
import {
  LayoutDashboard,
  Receipt,
  Tags,
  Settings,
  SlidersHorizontal,
  CircleUserRound,
  Building2,
} from 'lucide-react'

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col overflow-y-auto bg-slate-950 p-5 text-white">
      {/* Company logo and name */}
      
<div className="flex h-20 items-center justify-center px-4">
  <img
    src="/company-logo.png"
    alt="Company Logo"
    className="h-14 w-auto max-w-full object-contain"
  />
</div>


      {/* Sidebar navigation */}
      <nav className="flex flex-col gap-2">
        

        <a
          href="#"
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <Receipt size={20} />
          <span>Expenses</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 rounded-xl bg-sky-500 px-3 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-950/30"
          aria-current="page"
        >
          <Tags size={20} />
          <span>Expense Types</span>
        </a>

        <div className="mb-1 mt-7 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Site Configurations
        </div>

        <a
          href="#"
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <SlidersHorizontal size={20} />
          <span>Configurations</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <Settings size={20} />
          <span>Settings</span>
        </a>
      </nav>

      {/* Admin profile at the bottom */}
      <div className="mt-auto border-t border-slate-800 pt-5">
        <div className="flex items-center gap-3 rounded-xl bg-slate-900 p-3">
          <CircleUserRound
            size={38}
            className="shrink-0 text-sky-400"
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              Admin User
            </p>
            <p className="truncate text-xs text-slate-400">
              admin@example.com
            </p>
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-slate-500">
          Logged in as Admin
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
