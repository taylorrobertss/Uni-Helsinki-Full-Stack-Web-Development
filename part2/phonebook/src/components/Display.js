const Display = (props) => {
    return (
    <ul>
        {props.personsToShow.map((persons) => <li key = {persons.id}> {persons.name} {persons.number}</li>)}
      </ul>
    )
  }
  
  export default Display