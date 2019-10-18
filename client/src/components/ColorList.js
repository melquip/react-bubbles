import React, { useState } from "react";
import axiosWithAuth from './../helpers/axiosWithAuth';

const initialColor = {
	color: "",
	code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
	const [editing, setEditing] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);
	const [colorFormErrors, setColorFormErrors] = useState([]);

	const editColor = color => {
		setEditing(true);
		setColorToEdit(color);
		setColorFormErrors([]);
	};

	const isValidColorForm = (currentColor) => {
		let isValid = true;
		let errors = [];
		let duplicateColor;
		let duplicateColorHex;
		if (typeof currentColor === 'undefined') {
			currentColor = { ...colorToEdit };
		}
		if (typeof currentColor.id === 'undefined') {
			duplicateColor = colors.find(color => currentColor.color === color.color);
			duplicateColorHex = colors.find(color => currentColor.code.hex === color.code.hex);
		} else if (currentColor.id > 0) {
			duplicateColor = colors.find(color => currentColor.color === color.color &&
				color.id !== currentColor.id);
			duplicateColorHex = colors.find(color => currentColor.code.hex === color.code.hex &&
				color.id !== currentColor.id);
		}
		if (typeof duplicateColor !== 'undefined') {
			isValid = false;
			errors.push('There\'s already a color with this name in the list!');
		}
		if (typeof duplicateColorHex !== 'undefined') {
			isValid = false;
			errors.push('There\'s already a color with this hex code in the list!');
		}
		if (currentColor.code.hex) {
			if (!/^#([0-9a-f]{3}){1,2}$/i.test(currentColor.code.hex.toLowerCase())) {
				isValid = false;
				errors.push('This is not a valid hex color!');
			}
		}
		setColorFormErrors(errors);
		console.log('errors', errors, currentColor, duplicateColor);
		return isValid;
	}

	const saveEdit = e => {
		e.preventDefault();
		// Make a put request to save your updated color
		// think about where will you get the id from...
		// where is is saved right now?
		if (isValidColorForm()) {
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
		setColorFormErrors([]);
	}

	const onInputChange = (value, type) => {
		let state;
		if (type === 1) {
			state = {
				...colorToEdit,
				color: value
			};
		} else {
			state = {
				...colorToEdit,
				code: { hex: value }
			};
		}
		setColorToEdit(state);
		isValidColorForm(state);
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
							onChange={e => onInputChange(e.target.value, 1)}
							value={colorToEdit.color}
						/>
					</label>
					<label>
						hex code:
            			<input
							onChange={e => onInputChange(e.target.value, 2)}
							value={colorToEdit.code.hex}
						/>
					</label>
					<label>
						<div className="color-box" style={{ backgroundColor: colorToEdit.code.hex }}></div>
					</label>
					{colorFormErrors.length > 0 ? colorFormErrors.map(err => <p key={err}>{err}</p>) : null}
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
