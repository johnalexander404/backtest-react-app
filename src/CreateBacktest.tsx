import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Define the interface for Index and Algorithm objects
interface Index {
    id: string;
    name: string;
}

interface Algorithm {
    id: string;
    name: string;
}

interface BacktestFormInputs {
    index: string;
    algorithm: string;
    stocksCount: number;
    slackNumber: number;
}

export default function CreateBacktest() {
    const [indices, setIndices] = useState<Index[]>([])
    const [algorithms, setAlgorithms] = useState<Algorithm[]>([])
    const [startDate, setStartDate] = useState<Date | null>(new Date()) // Allow null
    const [endDate, setEndDate] = useState<Date | null>(new Date())     // Allow null
    const { register, handleSubmit, formState: { errors } } = useForm<BacktestFormInputs>()

    useEffect(() => {
        fetch('/index')
            .then(res => res.json())
            .then(data => setIndices(data))

        fetch('/algorithm')
            .then(res => res.json())
            .then(data => setAlgorithms(data))
    }, [])

    const onSubmit: SubmitHandler<BacktestFormInputs> = (data) => {
        const formData = {
            ...data,
            startDate: startDate?.toISOString() ?? '', // Check for null
            endDate: endDate?.toISOString() ?? ''      // Check for null
        }
        fetch('/backtest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => console.log('Backtest submitted:', data))
            .catch(error => console.error('Error:', error))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block mb-2">Select Index</label>
                <select {...register('index', { required: true })} className="w-full p-2 border rounded">
                    {indices.map(index => (
                        <option key={index.id} value={index.id}>{index.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block mb-2">Select Algorithm</label>
                <select {...register('algorithm', { required: true })} className="w-full p-2 border rounded">
                    {algorithms.map(algo => (
                        <option key={algo.id} value={algo.id}>{algo.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block mb-2">Start Date</label>
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)} // Accepts Date | null
                    className="w-full p-2 border rounded"
                />
            </div>

            <div>
                <label className="block mb-2">End Date</label>
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}   // Accepts Date | null
                    className="w-full p-2 border rounded"
                />
            </div>

            <div>
                <label className="block mb-2">Number of Stocks in Portfolio</label>
                <input
                    type="number"
                    {...register('stocksCount', { required: true, min: 1 })}
                    className="w-full p-2 border rounded"
                />
                {errors.stocksCount && <span className="text-red-500">This field is required and must be a positive number</span>}
            </div>

            <div>
                <label className="block mb-2">Slack Number</label>
                <input
                    type="number"
                    {...register('slackNumber', { required: true, min: 0 })}
                    className="w-full p-2 border rounded"
                />
                {errors.slackNumber && <span className="text-red-500">This field is required and must be a non-negative number</span>}
            </div>

            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Submit Backtest Request
            </button>
        </form>
    )
}
