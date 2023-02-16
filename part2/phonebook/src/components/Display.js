const Display = (props) => {
    return (
    <ul>
        {props.personsToShow.map((persons) => 
        <li key = {persons.id}> {persons.name} {persons.number}
        <button onClick = {()=>props.removeItem(persons.id)}>delete</button>
        </li>
        )}
  
      </ul>
   
    )
  }
  
  export default Display