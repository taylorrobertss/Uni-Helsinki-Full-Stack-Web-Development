const Number = (props) => {
  return (
    <div>
      number:
      <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
  )
}

export default Number