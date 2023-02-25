import { useState } from 'react'


const Button = ({ handle, text }) => {
    return (
        <button onClick={handle}>{text}</button>
    )
}


const StatisticsLine = ({ text, value }) => {
    return (
        <p>{text} {value}</p>
    )
}


const Stats = ({ good, neutral, bad }) => {
    let all = good + neutral + bad

    if (all === 0) {
        return (
            <p>No feedback given</p>
        )
    }

    let average = (good - bad) / all
    let positive = (good / all) * 100 + "%"

    return (
        <>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={all} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positive} />
        </>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <Button handle={() => setGood(good + 1)} text="good" />
            <Button handle={() => setNeutral(neutral + 1)} text="neutral" />
            <Button handle={() => setBad(bad + 1)} text="bad" />
            <h1>statistics</h1>
            <Stats good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App;