import React from 'react'
import '../stylesheets/account.css'

function Dropdown({ category, setCategory }) {
    return (
        <div className='dropdown'>
            <h4>Select Category</h4>
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

export default Dropdown;