
const Course = ({course}) =>(
  <div>
    <Header course={course.name}/>
    <Content parts={course.parts} />
    <Total parts ={course.parts} />
    
  </div>

)

const Content = ({ parts }) => {
  return(
      <div>
        {parts.map((parts) =>(
          <Part key={parts.id} part={parts} />
        ))}
      </div>
    )
  }


const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  
  const sum = parts.reduce((previousSum, currentSum) => previousSum + currentSum.exercises,
  0)
  return(
    <p>Total of {sum} exercies</p>
  )

}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>


  export default Course