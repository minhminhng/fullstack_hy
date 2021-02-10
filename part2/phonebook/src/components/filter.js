import React from 'react'

const Filter = ( props ) => {
    return (
    <form onChange={props.filterName}>
        <div>
          filter shown with <input value={props.value} onChange={props.handleFilterChange} />
        </div>
    </form>
    )
}

export default Filter