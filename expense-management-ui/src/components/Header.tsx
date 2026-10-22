
import {
  House,
  Monitor,
  ClipboardList,
  UsersRound,
  BriefcaseBusiness,
  Settings,
  Ticket,
  MessageCircle,
  Bell,
  CircleUserRound,
} from 'lucide-react'

const navigationItems = [
  { label: 'Home', Icon: House },
  { label: 'Portal', Icon: Monitor },
  { label: 'Tasks', Icon: ClipboardList },
  { label: 'Employees', Icon: UsersRound },
  { label: 'Projects', Icon: BriefcaseBusiness },
  { label: 'Settings', Icon: Settings },
  { label: 'Tickets', Icon: Ticket },
  { label: 'Messages', Icon: MessageCircle },
]

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 shadow-sm backdrop-blur sm:px-6">
      <div className="flex min-h-24 items-center justify-between gap-4">
        {/* Navigation icons with labels underneath */}
        <nav
          aria-label="Main navigation"
          className="flex min-w-0 flex-1 items-center justify-start gap-1 overflow-x-auto py-3 sm:gap-3 lg:gap-5"
        >
          {navigationItems.map(({ label, Icon }) => (
            <a
              key={label}
              href="#"
              className="group flex min-w-[58px] shrink-0 flex-col items-center gap-2 rounded-xl px-2 py-2 text-slate-500 transition-colors hover:bg-sky-50 hover:text-sky-700 sm:min-w-[66px]"
            >
              <Icon
                size={21}
                strokeWidth={1.8}
                className="transition-transform group-hover:-translate-y-0.5"
              />

              <span className="text-[10px] font-semibold sm:text-xs">
                {label}
              </span>
            </a>
          ))}
        </nav>

        {/* Admin actions */}
        <div className="flex shrink-0 items-center gap-3 border-l border-slate-200 pl-3 sm:gap-4 sm:pl-5">
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-sky-700"
          >
            <Bell size={21} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
          </button>

          <div className="flex items-center gap-2">
            <CircleUserRound
              size={34}
              className="shrink-0 text-sky-600"
            />

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">
                Admin User
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
