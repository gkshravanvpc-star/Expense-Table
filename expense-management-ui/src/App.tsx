
import { useState } from 'react'
import {
  Plus,
  X,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ExpenseTypesTable from './components/ExpenseTypesTable'

type ExpenseType = {
  id: number
  name: string
  status: 'Active' | 'Inactive'
}

type RateType = {
  id: number
  name: string
  status: 'Active' | 'Inactive'
}

const initialExpenseTypes: ExpenseType[] = [
  { id: 1, name: 'Travel', status: 'Active' },
  { id: 2, name: 'Food', status: 'Active' },
  { id: 3, name: 'Office Supplies', status: 'Inactive' },
  { id: 4, name: 'Accommodation', status: 'Active' },
  { id: 5, name: 'Transportation', status: 'Active' },
  { id: 6, name: 'Client Meeting', status: 'Inactive' },
  { id: 7, name: 'Internet', status: 'Active' },
  { id: 8, name: 'Mobile Recharge', status: 'Active' },
  { id: 9, name: 'Software', status: 'Inactive' },
  { id: 10, name: 'Equipment', status: 'Active' },
  { id: 11, name: 'Training', status: 'Active' },
  { id: 12, name: 'Printing', status: 'Inactive' },
  { id: 13, name: 'Stationery', status: 'Active' },
  { id: 14, name: 'Parking', status: 'Active' },
  { id: 15, name: 'Fuel', status: 'Inactive' },
  { id: 16, name: 'Meals', status: 'Active' },
  { id: 17, name: 'Airfare', status: 'Active' },
  { id: 18, name: 'Maintenance', status: 'Inactive' },
  { id: 19, name: 'Subscriptions', status: 'Active' },
  { id: 20, name: 'Miscellaneous', status: 'Active' },
]

const initialRateTypes: RateType[] = [
  { id: 1, name: 'Hourly', status: 'Active' },
  { id: 2, name: 'Daily', status: 'Active' },
  { id: 3, name: 'Fixed', status: 'Inactive' },
  { id: 4, name: 'Weekly', status: 'Active' },
  { id: 5, name: 'Monthly', status: 'Active' },
  { id: 6, name: 'Annual', status: 'Inactive' },
  { id: 7, name: 'Per Project', status: 'Active' },
  { id: 8, name: 'Per Mile', status: 'Active' },
  { id: 9, name: 'Per Kilometre', status: 'Inactive' },
  { id: 10, name: 'Overtime', status: 'Active' },
  { id: 11, name: 'Weekend', status: 'Active' },
  { id: 12, name: 'Holiday', status: 'Inactive' },
  { id: 13, name: 'Standard', status: 'Active' },
  { id: 14, name: 'Premium', status: 'Active' },
  { id: 15, name: 'Consultant', status: 'Inactive' },
  { id: 16, name: 'Contractor', status: 'Active' },
  { id: 17, name: 'Night Shift', status: 'Active' },
  { id: 18, name: 'Emergency', status: 'Inactive' },
  { id: 19, name: 'Custom', status: 'Active' },
  { id: 20, name: 'Special Rate', status: 'Active' },
]

const ROWS_PER_PAGE = 5

function App() {
  // Expense Types state
  const [searchTerm, setSearchTerm] = useState('')
  const [expenseTypes, setExpenseTypes] =
    useState<ExpenseType[]>(initialExpenseTypes)

  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [newExpenseName, setNewExpenseName] = useState('')
  const [formError, setFormError] = useState('')

  // Rate Types state
  const [rateTypes, setRateTypes] =
    useState<RateType[]>(initialRateTypes)

  const [isRatePopupOpen, setIsRatePopupOpen] = useState(false)
  const [newRateName, setNewRateName] = useState('')
  const [rateFormError, setRateFormError] = useState('')
  const [rateCurrentPage, setRateCurrentPage] = useState(1)

  const [rateSortColumn, setRateSortColumn] =
    useState<'name' | 'status'>('name')

  const [rateSortDirection, setRateSortDirection] =
    useState<'asc' | 'desc'>('asc')

  // Sort Rate Types
  const sortedRateTypes = [...rateTypes].sort((a, b) => {
    const first = a[rateSortColumn].toLowerCase()
    const second = b[rateSortColumn].toLowerCase()
    const result = first.localeCompare(second)

    return rateSortDirection === 'asc' ? result : -result
  })

  // Rate Types pagination
  const rateTotalPages = Math.max(
    1,
    Math.ceil(sortedRateTypes.length / ROWS_PER_PAGE)
  )

  const safeRatePage = Math.min(rateCurrentPage, rateTotalPages)
  const rateStartIndex = (safeRatePage - 1) * ROWS_PER_PAGE

  const currentRateTypes = sortedRateTypes.slice(
    rateStartIndex,
    rateStartIndex + ROWS_PER_PAGE
  )

  // Handle Rate Types sorting
  function handleRateSort(column: 'name' | 'status') {
    if (rateSortColumn === column) {
      setRateSortDirection((direction) =>
        direction === 'asc' ? 'desc' : 'asc'
      )
    } else {
      setRateSortColumn(column)
      setRateSortDirection('asc')
    }

    setRateCurrentPage(1)
  }

  // Display the appropriate sorting icon
  function rateSortIcon(column: 'name' | 'status') {
    if (rateSortColumn !== column) {
      return <ArrowUpDown size={14} />
    }

    return rateSortDirection === 'asc'
      ? <ChevronUp size={14} />
      : <ChevronDown size={14} />
  }

  // Add a new Expense Type
  function handleAddExpenseType() {
    const trimmedName = newExpenseName.trim()

    if (!trimmedName) {
      setFormError('Please enter an expense type name.')
      return
    }

    const alreadyExists = expenseTypes.some(
      (expense) =>
        expense.name.toLowerCase() === trimmedName.toLowerCase()
    )

    if (alreadyExists) {
      setFormError('This expense type already exists.')
      return
    }

    const newExpense: ExpenseType = {
      id:
        Math.max(0, ...expenseTypes.map((expense) => expense.id)) + 1,
      name: trimmedName,
      status: 'Active',
    }

    setExpenseTypes((currentTypes) => [
      ...currentTypes,
      newExpense,
    ])

    setNewExpenseName('')
    setFormError('')
    setIsPopupOpen(false)
    setSearchTerm('')
  }

  // Add a new Rate Type
  function handleAddRateType() {
    const trimmedName = newRateName.trim()

    if (!trimmedName) {
      setRateFormError('Please enter a rate type name.')
      return
    }

    const alreadyExists = rateTypes.some(
      (rate) => rate.name.toLowerCase() === trimmedName.toLowerCase()
    )

    if (alreadyExists) {
      setRateFormError('This rate type already exists.')
      return
    }

    const newRate: RateType = {
      id: Math.max(0, ...rateTypes.map((rate) => rate.id)) + 1,
      name: trimmedName,
      status: 'Active',
    }

    const newLength = rateTypes.length + 1

    setRateTypes((currentTypes) => [...currentTypes, newRate])

    setNewRateName('')
    setRateFormError('')
    setIsRatePopupOpen(false)
    setRateCurrentPage(Math.ceil(newLength / ROWS_PER_PAGE))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Fixed left sidebar */}
      <Sidebar />

      {/* Main content starts to the right of the sidebar */}
      <main className="ml-64 min-w-0">
        {/* Top navigation header */}
        <Header />

        <section className="p-4 sm:p-6 lg:p-8">
          {/* Portal title below the header */}
          <div className="mb-7">
           

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Expense Management Portal
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Manage expense categories and rate types in one place.
              Keep your team's expense configuration organized and up to date.
            </p>
          </div>

          {/* Expense Types and Rate Types */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[3fr_2fr]">
            {/* Expense Types */}
            <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                <div>
                  <h3 className="text-base font-bold text-slate-800">
                    Expense Types
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Manage your expense categories
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Add expense type"
                  title="Add expense type"
                  onClick={() => {
                    setIsPopupOpen(true)
                    setFormError('')
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="p-4">
                <div className="mb-5">
                  <input
                    type="text"
                    placeholder="Search expense types..."
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <ExpenseTypesTable
                  searchTerm={searchTerm}
                  expenseTypes={expenseTypes}
                />
              </div>
            </div>

            {/* Rate Types */}
            <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                <div>
                  <h3 className="text-base font-bold text-slate-800">
                    Rate Types
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Manage your rate categories
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Add rate type"
                  title="Add rate type"
                  onClick={() => {
                    setIsRatePopupOpen(true)
                    setRateFormError('')
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[350px] text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="px-4 py-3 font-semibold">
                        <button
                          type="button"
                          onClick={() => handleRateSort('name')}
                          className="flex items-center gap-2 hover:text-blue-600"
                        >
                          Rate Type {rateSortIcon('name')}
                        </button>
                      </th>

                      <th className="px-4 py-3 font-semibold">
                        <button
                          type="button"
                          onClick={() => handleRateSort('status')}
                          className="flex items-center gap-2 hover:text-blue-600"
                        >
                          Status {rateSortIcon('status')}
                        </button>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {currentRateTypes.map((rate) => (
                      <tr
                        key={rate.id}
                        className="transition-colors hover:bg-blue-50/60"
                      >
                        <td className="px-4 py-4 font-medium text-slate-800">
                          {rate.name}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={
                              rate.status === 'Active'
                                ? 'inline-flex rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700'
                                : 'inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600'
                            }
                          >
                            {rate.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Rate Types pagination */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-4 py-3">
                <p className="text-xs text-slate-500">
                  Showing{' '}
                  {sortedRateTypes.length === 0 ? 0 : rateStartIndex + 1}-
                  {Math.min(
                    rateStartIndex + ROWS_PER_PAGE,
                    sortedRateTypes.length
                  )}{' '}
                  of {sortedRateTypes.length}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={safeRatePage === 1}
                    onClick={() =>
                      setRateCurrentPage((page) => page - 1)
                    }
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <span className="whitespace-nowrap text-sm text-slate-600">
                    Page {safeRatePage} of {rateTotalPages}
                  </span>

                  <button
                    type="button"
                    disabled={safeRatePage === rateTotalPages}
                    onClick={() =>
                      setRateCurrentPage((page) => page + 1)
                    }
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Add Expense Type popup */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="expense-popup-title"
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2
                id="expense-popup-title"
                className="text-lg font-bold text-slate-800"
              >
                Add Expense Type
              </h2>

              <button
                type="button"
                aria-label="Close popup"
                onClick={() => setIsPopupOpen(false)}
                className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault()
                handleAddExpenseType()
              }}
            >
              <label
                htmlFor="expense-name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Expense Type Name
              </label>

              <input
                id="expense-name"
                type="text"
                autoFocus
                value={newExpenseName}
                onChange={(event) => {
                  setNewExpenseName(event.target.value)
                  setFormError('')
                }}
                placeholder="e.g. Transportation"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />

              {formError && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {formError}
                </p>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsPopupOpen(false)
                    setNewExpenseName('')
                    setFormError('')
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Save Expense Type
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Rate Type popup */}
      {isRatePopupOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setIsRatePopupOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rate-popup-title"
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2
                id="rate-popup-title"
                className="text-lg font-bold text-slate-800"
              >
                Add Rate Type
              </h2>

              <button
                type="button"
                aria-label="Close popup"
                onClick={() => setIsRatePopupOpen(false)}
                className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault()
                handleAddRateType()
              }}
            >
              <label
                htmlFor="rate-name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Rate Type Name
              </label>

              <input
                id="rate-name"
                type="text"
                autoFocus
                value={newRateName}
                onChange={(event) => {
                  setNewRateName(event.target.value)
                  setRateFormError('')
                }}
                placeholder="e.g. Weekly"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />

              {rateFormError && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {rateFormError}
                </p>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsRatePopupOpen(false)
                    setNewRateName('')
                    setRateFormError('')
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Save Rate Type
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
