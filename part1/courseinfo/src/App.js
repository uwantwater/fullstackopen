const Header = (props) => {
  return(
    <h1>{ props.course }</h1>
  )
}

const Part = (props) => {
  return(
    <p>{ props.name } { props.number }</p>
  )
}

const Content = () => {
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return(
    <>
    <Part name={part1} number={exercises1} />
    <Part name={part2} number={exercises2} />
    <Part name={part3} number={exercises3} />
    </>
  )
}

const Total = () => {
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14
  return(
    <>
    <p>Total number of exercises {exercises1 + exercises2 + exercises3}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total />
    </div>
  )
}

export default App;
