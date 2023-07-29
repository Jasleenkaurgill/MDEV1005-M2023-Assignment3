import React, { useState } from "react";

const Checklist = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");

    const handleInputChange = (event) => {
        setNewItem(event.target.value);
    };

    const handleAddItem = () => {
        if (newItem.trim() !== "") {
            setItems([...items, newItem]);
            setNewItem("");
        }
    };

    const handleRemoveItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    return (
        <div className="checklist-container">
            <h2 className="heading">Checklist</h2>
            <div className="input-container">
                <input
                    type="text"
                    value={newItem}
                    onChange={handleInputChange}
                    placeholder="Add item..."
                    className="input"
                />
                <button onClick={handleAddItem} className="add-button">
                    Add
                </button>
            </div>
            <ul className="list">
                {items.map((item, index) => (
                    <li key={index} className="list-item">
                        {item}
                        <button onClick={() => handleRemoveItem(index)} className="remove-button">
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Checklist;
