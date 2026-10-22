
import { useState } from 'react'
import { ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react'

type ExpenseType = {
  id: number
  name: string
  status: 'Active' | 'Inactive'
}

type ExpenseTypesTableProps = {
  searchTerm: string
  expenseTypes: ExpenseType[]
}

const ROWS_PER_PAGE = 5

function ExpenseTypesTable({
  searchTerm,
  expenseTypes,
}: ExpenseTypesTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState<'name' | 'status'>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const filteredExpenseTypes = expenseTypes.filter((expense) =>
    expense.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedExpenseTypes = [...filteredExpenseTypes].sort((a, b) => {
    const first = a[sortColumn].toLowerCase()
    const second = b[sortColumn].toLowerCase()

    const result = first.localeCompare(second)
    return sortDirection === 'asc' ? result : -result
  })

  const totalPages = Math.max(
    1,
    Math.ceil(sortedExpenseTypes.length / ROWS_PER_PAGE)
  )

  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (safeCurrentPage - 1) * ROWS_PER_PAGE

  const currentExpenseTypes = sortedExpenseTypes.slice(
    startIndex,
    startIndex + ROWS_PER_PAGE
  )

  function handleSort(column: 'name' | 'status') {
    if (sortColumn === column) {
      setSortDirection((direction) =>
        direction === 'asc' ? 'desc' : 'asc'
      )
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }

    setCurrentPage(1)
  }

  function sortIcon(column: 'name' | 'status') {
    if (sortColumn !== column) {
      return <ArrowUpDown size={14} />
    }

    return sortDirection === 'asc'
      ? <ChevronUp size={14} />
      : <ChevronDown size={14} />
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-5 py-4 font-semibold">
                <button
                  type="button"
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 hover:text-blue-600"
                >
                  Expense Type {sortIcon('name')}
                </button>
              </th>

              <th className="px-5 py-4 font-semibold">
                <button
                  type="button"
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-2 hover:text-blue-600"
                >
                  Status {sortIcon('status')}
                </button>
              </th>

              <th className="px-5 py-4 text-right font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {currentExpenseTypes.map((expense) => (
              <tr
                key={expense.id}
                className="transition-colors hover:bg-blue-50/60"
              >
                <td className="px-5 py-4 font-medium text-slate-800">
                  {expense.name}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={
                      expense.status === 'Active'
                        ? 'inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700'
                        : 'inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600'
                    }
                  >
                    {expense.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    className="rounded-lg px-3 py-1.5 font-medium text-blue-600 transition hover:bg-blue-100 hover:text-blue-800"
                    aria-label={`Edit ${expense.name}`}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}

            {sortedExpenseTypes.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-5 py-10 text-center text-slate-500"
                >
                  No expense types found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-4 py-3">
        <p className="text-xs text-slate-500">
          {sortedExpenseTypes.length === 0
            ? 'Showing 0 records'
            : `Showing ${startIndex + 1}-${Math.min(
                startIndex + ROWS_PER_PAGE,
                sortedExpenseTypes.length
              )} of ${sortedExpenseTypes.length}`}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={safeCurrentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm disabled:opacity-40"
          >
            Previous
          </button>

          <span className="whitespace-nowrap text-sm text-slate-600">
            Page {safeCurrentPage} of {totalPages}
          </span>

          <button
            type="button"
            disabled={safeCurrentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExpenseTypesTable
