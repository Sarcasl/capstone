import React from 'react'

function Sort({ sort, setSort }) {
    return (
        <div className='dropdown'>
            <h4>Sort</h4>
            <select value={sort} onChange={(e) => { setSort(`?sort=${e.target.value}`) }}>
                <option></option>
                <option>asc</option>
                <option>desc</option>
            </select>
        </div>
    )
}

export default Sort;
