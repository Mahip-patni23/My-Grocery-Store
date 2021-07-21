import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const List = ({items, editItem, removeItem}) => {
    return <React.Fragment>
        {
            items.map((singleItem) => {
              const {id, title} = singleItem;
              return <article key={id} className="singleItem">
                <p>{title}</p>
                <div className="btn-container">
                   <button className="editBtn" onClick={() => editItem(id)}><FaEdit></FaEdit></button>
                   <button className="removeBtn" onClick={() => removeItem(id)}><FaTrash></FaTrash></button>
                </div>
              </article>
            })
        }
    </React.Fragment>
}

export default List;