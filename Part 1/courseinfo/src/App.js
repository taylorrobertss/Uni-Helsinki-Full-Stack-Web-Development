const Header = (props) =>{
  return(
    <div>
      <h1>{props.course.name}</h1>
    
    </div>
  )

}
const Content = (props) =>{
  return(
    <div>
      <Part part1= {props.course.parts[0].name} exercise1 = {props.course.parts[0].exercises} />
      <Part part2= {props.course.parts[1].name} exercise2 = {props.course.parts[1].exercises}/>
      <Part part3= {props.course.parts[2].name} exercise3 = {props.course.parts[2].exercises} />
    </div>
  )
}
const Part = (props) =>{
  return(
    <div>
    <p>
      {props.part1} {props.exercise1}
    </p>

    <p>
      {props.part2} {props.exercise2}
    </p>

    <p>
      {props.part3} {props.exercise3}
    </p>
   
  </div>
  )

}
const Total = (props) => {
  return(
    <div>
      <p>
        Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}
      </p>
    </div>
  )
}
const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course= {course} />
      <Content course= {course} />
      <Total course={course} /> 
    </div>
  )
}



export default App