import React, { useState } from "react";
import axios from 'axios';

const Login = (props) => {
	// make a post request to retrieve a token from the api
	// when you have handled the token, navigate to the BubblePage route
	const [loginForm, setLoginForm] = useState({
		username: "",
		password: "",
	})
	const onLoginInputChange = e => {
		setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
	}
	const onLogin = (e) => {
		e.preventDefault();
		axios.post(`/login`, loginForm)
		.then(response => {
			localStorage.setItem('token', response.data.payload);
			props.history.push('/bubbles')
		})
		.catch(err => console.log(err))
	}
	return (
		<>
			<h1>Welcome to the Bubble App!</h1>
			<form onSubmit={onLogin}>
				<label htmlFor="username">
					Username (Lambda School)
					<input
						id="username"
						name="username"
						type="text"
						onChange={onLoginInputChange}
						autoComplete="username"
					/>
				</label>
				<label htmlFor="password">
					Password (i&lt;3Lambd4)
					<input
						id="password"
						name="password"
						type="password"
						onChange={onLoginInputChange}
						autoComplete="current-password"
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
		</>
	);
};

export default Login;
