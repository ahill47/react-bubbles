import React, { useState } from "react";
import axiosWithAuth from "./axiosWithAuth";
import AddColor from "./AddColor.js";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
   // console.log(colors);
   const [editing, setEditing] = useState(false);
   const [colorToEdit, setColorToEdit] = useState(initialColor);

   const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();

    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then(() => {
      setEditing(false);
    })
    .catch((err) => console.log(err));
};

const deleteColor = (color) => {
  axiosWithAuth()
    .delete(`/colors/${color.id}`, color)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

return (
  <div className="colors-wrap">
    <p>colors</p>
    <ul>

    {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
            <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
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
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
             onChange={(e) =>
              setColorToEdit({ ...colorToEdit, color: e.target.value })
            }
            value={colorToEdit.color}
          />
        </label>
        <label>
          hex code:
          <input
          onChange={(e) =>
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
     <div />
      <AddColor />
    </div>
  );
};
export default ColorList;