
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, props = {}, ...rest }) {
	return (
		<Route
			{...rest}
			render={routeProps =>
				localStorage.getItem('token') ? (
					<Component {...routeProps} {...props} />
				) : (
						<Redirect to="/" />
					)
			}
		/>
	);
}
export const isLoggedIn = () => localStorage.getItem('login_token') ? true : false;