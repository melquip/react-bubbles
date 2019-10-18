import React from 'react';
import axios from 'axios';

export default function axiosWithAuth() {
	const token = localStorage.getItem('login_token');
	return axios.create({
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${token}`,
		},
	});
};
