import React from 'react'

function productGroup ({ category, setCategory }) {
    return (
        <div className='productGroup'>
            <h4>Categories</h4>
            <select value={category} onChange={(e) => { setCategory(`/category/${e.target.value}`) }}>
                <option></option>
                <option>electronics</option>
                <option>jewelery</option>
                <option>men's clothing</option>
                <option>women's clothing</option>
            </select>
        </div>
    )
}

export default productGroup;