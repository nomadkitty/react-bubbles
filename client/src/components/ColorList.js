import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, handleUpdate }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [adding, setAdding] = useState(false);
  const [addColor, setAddColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(handleUpdate())
      .then(res => {
        console.log(res)
        setEditing(false)
      })
      .catch(err => console.log(err))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(handleUpdate())
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  };

  const addNewColor =() =>{
    setAdding(true); 
  }
  const saveAdd = e => {
    e.preventDefault()
    axiosWithAuth()
      .post('/colors', addColor)
      .then(handleUpdate())
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <button onClick={() => addNewColor()}>Add New Color</button>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* <div /> */}
      {/* stretch - build another form here to add a color */}
        {adding && (
          <form onSubmit={saveAdd}>
              <legend>Add color</legend>
              <label>
                color name:
                <input
                  onChange={e =>
                    setAddColor({ ...addColor, color: e.target.value })
                  }
                  value={addColor.color}
                />
              </label>
              <label>
                hex code:
                <input
                  onChange={e =>
                    setAddColor({
                      ...addColor,
                      code: { hex: e.target.value }
                    })
                  }
                  value={addColor.code.hex}
                />
              </label>
              <div className="button-row">
                <button type="submit">Add</button>
              </div>
            </form>
        )}
    </div>
  );
};

export default ColorList;
