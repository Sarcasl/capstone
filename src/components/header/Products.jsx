import React, { useReducer, useEffect, useState } from "react";
import AddProducts from "../addproducts/AddProducts";
import CardBody from "../cards/CardBody";

const Products = ({items, ShowAddProducts, setShowAddProducts, addedItems, searchValue}) => {

  const itemsFilter = items.filter((item) =>
  item.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  

  function addItem(item) {
    item.addNumber = 1;
    const itemArr = addedItems;
    setAddedItem([...itemArr, item]);
  }

  
  function removeItem(item) {
    const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
    setAddedItem(newItems);
  }


  return (
<div className="body__container">
        {ShowAddProducts && (
          <AddProducts
            click={setShowAddProducts}
            items={addedItems}
            removeItem={removeItem}
            setAddedItem={setAddedItem}
          />
        )}
        <CardBody
          products={itemsFilter}
          addItem={addItem}
          removeItem={removeItem}
          addedItems={addedItems}
        />
      </div>)}
   

export default Products;

        