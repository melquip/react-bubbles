import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from './../helpers/axiosWithAuth';

const BubblePage = () => {
	const [colorList, setColorList] = useState([]);
	// fetch your colors data from the server when the component mounts
	// set that data to the colorList state property
	useEffect(() => {
		if (colorList.length === 0) {
			axiosWithAuth().get(`http://localhost:5000/api/colors`)
			.then(response => {
				console.log('colors', response.data);
				setColorList(response.data);
			})
			.catch(err => console.log(err));
		}
	}, []);
	return (
		<>
			<ColorList colors={colorList} updateColors={setColorList} />
			<Bubbles colors={colorList} />
		</>
	);
};

export default BubblePage;
