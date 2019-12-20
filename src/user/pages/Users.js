import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
	const USERS = [
		{
			id: 'u1',
			name: 'Brandon Corey',
			image:
				'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2F-TPzt6V6JZIs%2FAAAAAAAAAAI%2FAAAAAAAAAAA%2FotPdYjyxaNw%2Fs900-c-k-no-mo-rj-c0xffffff%2Fphoto.jpg&f=1&nofb=1',
			placesCount: 10
		}
	];

	return <UsersList items={USERS} />;
};

export default Users;
