const Course = ({ course }) => {
    const parts = course.parts
    //creating a list of just exercise numbers
    const exercises = parts.map(part => part.exercises)
    //sum of all elements in the list
    const total = exercises.reduce((s, p) => s + p)
    return (
      <>
        <h2>{course.name}</h2>
        {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
        <p><b>total of {total} exercises</b></p>
      </>
    )}

    export default Course