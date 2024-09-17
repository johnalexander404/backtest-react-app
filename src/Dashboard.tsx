import { useState } from 'react'
import { Tab } from '@headlessui/react'
import CreateBacktest from './CreateBacktest'
import BacktestHistory from './BacktestHistory'

interface DashboardProps {
  handleLogout: () => void
}

export default function Dashboard({handleLogout}: DashboardProps) {
  const [selectedTab, setSelectedTab] = useState(0)


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
             ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            Create Backtest
          </Tab>
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
             ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            Backtest History
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <CreateBacktest />
          </Tab.Panel>
          <Tab.Panel>
            <BacktestHistory />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
