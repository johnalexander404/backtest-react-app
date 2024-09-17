import { useState, useEffect } from 'react'

interface Backtest {
    id: number
    index: string
    algorithm: string
    startDate: string
    endDate: string
    stocksCount: number
    slackNumber: string
}

export default function BacktestHistory() {
  const [backtests, setBacktests] = useState<Backtest[]>([])

  useEffect(() => {
    fetch('/backtest')
      .then(res => res.json())
      .then(data => setBacktests(data))
      .catch(error => console.error('Error:', error))
  }, [])

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Index</th>
            <th className="py-3 px-6 text-left">Algorithm</th>
            <th className="py-3 px-6 text-left">Start Date</th>
            <th className="py-3 px-6 text-left">End Date</th>
            <th className="py-3 px-6 text-left">Stocks Count</th>
            <th className="py-3 px-6 text-left">Slack Number</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {backtests.map(backtest  => (
            <tr key={backtest.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{backtest.id}</td>
              <td className="py-3 px-6 text-left">{backtest.index}</td>
              <td className="py-3 px-6 text-left">{backtest.algorithm}</td>
              <td className="py-3 px-6 text-left">{backtest.startDate}</td>
              <td className="py-3 px-6 text-left">{backtest.endDate}</td>
              <td className="py-3 px-6 text-left">{backtest.stocksCount}</td>
              <td className="py-3 px-6 text-left">{backtest.slackNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
