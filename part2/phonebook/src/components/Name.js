const Name = (props) => {
  return (
    <div>
      name:
      <input value={props.newName} onChange={props.handleNameChange} />
    </div>
  )
}

export default Name