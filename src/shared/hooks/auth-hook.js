import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
	const [ token, setToken ] = useState(false);
	const [ userId, setUserId ] = useState(false);
	const [ tokenExpirationDate, setTokenExpirationDate ] = useState();

	//useCallback = function is not recreated on rerenders, no infinite loops on useEffect
	const login = useCallback((uid, token, expirationData) => {
		setToken(token);
		setUserId(uid);
		//Use expiration date from existing token (from local storage) or generate new time + 1hr
		const tokenExpirationDate =
			expirationData || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDate(tokenExpirationDate);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId: uid,
				token: token,
				expiration: tokenExpirationDate.toISOString() //ISO string = preserves date data
			})
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setTokenExpirationDate(null);
		setUserId(null);
		localStorage.removeItem('userData');
	}, []);

	//set auto-logout timer based on token expiration time from state
	useEffect(
		() => {
			if (token && tokenExpirationDate) {
				const remainingTime =
					tokenExpirationDate.getTime() - new Date().getTime();
				//set setTimeout id to logoutTimer variable outside app
				logoutTimer = setTimeout(logout, remainingTime);
			} else {
				//if user clicks logout & clears token, also clears logoutTimer
				clearTimeout(logoutTimer);
			}
		},
		[ token, logout, tokenExpirationDate ]
	);

	useEffect(
		() => {
			const storedData = JSON.parse(localStorage.getItem('userData'));

			if (
				storedData &&
				storedData.token &&
				new Date(storedData.expiration) > new Date()
			) {
				login(
					storedData.userId,
					storedData.token,
					new Date(storedData.expiration)
				);
			}
		},
		[ login ]
	);

	return { userId, token, login, logout };
};
