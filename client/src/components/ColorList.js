import React, { useState } from "react";
import axiosWithAuth from './../helpers/axiosWithAuth';

const initialColor = {
	color: "",
	code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
	console.log(colors);
	const [editing, setEditing] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);

	const editColor = color => {
		setEditing(true);
		setColorToEdit(color);
	};

	const saveEdit = e => {
		e.preventDefault();
		// Make a put request to save your updated color
		// think about where will you get the id from...
		// where is is saved right now?
		if (colorToEdit.id > 0) {
			axiosWithAuth().put(`colors/${colorToEdit.id}`, colorToEdit)
				.then(response => {
					const editedColor = response.data;
					updateColors(colors.map(color => {
						if (color.id === editedColor.id) return editedColor;
						return color;
					}))
					setColorToEdit(initialColor);
					setEditing(false);
				})
				.catch(err => console.log(err));
		} else {
			axiosWithAuth().post(`colors`, colorToEdit)
				.then(response => {
					updateColors(response.data);
					setColorToEdit(initialColor);
					setEditing(false);
				})
				.catch(err => console.log(err));
		}
	};

	const deleteColor = deletedColor => {
		// make a delete request to delete this color
		axiosWithAuth().delete(`colors/${deletedColor.id}`)
			.then(response => {
				updateColors(colors.filter(color => color.id !== response.data));
			})
			.catch(err => console.log(err));
	};

	const newColor = () => {
		setEditing(true);
		setColorToEdit(initialColor);
	}

	return (
		<div className="colors-wrap">
			<p>colors</p>
			<ul>
				{colors.map(color => (
					<li key={color.color} onClick={() => editColor(color)}>
						<span>
							<span className="delete" onClick={(e) => {
								e.stopPropagation();
								deleteColor(color);
							}}>
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

			<div className="button-row">
				<button onClick={e => newColor()}>new</button>
			</div>
			{editing && (
				<form onSubmit={saveEdit}>
					<legend>{colorToEdit.id > 0 ? 'edit' : 'new'} color</legend>
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
			<div className="spacer" />
			{/* stretch - build another form here to add a color */}
		</div>
	);
};

export default ColorList;
