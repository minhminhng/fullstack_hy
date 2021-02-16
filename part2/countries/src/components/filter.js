import React from 'react'

const Filter = ( props ) => {
    return (
    <form>
        <div>
          find countries <input value={props.value} onChange={props.handleFilterChange} />
        </div>
    </form>
    )
}

export default Filter