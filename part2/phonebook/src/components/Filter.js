const Filter = (props) => {
  return (
    <div>
      filter shown with
      <input value={props.newSearch} onChange={props.handleSearchName} />
    </div>
  )
}

export default Filter