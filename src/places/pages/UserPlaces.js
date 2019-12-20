import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
	{
		id: 'p1',
		title: 'Empire State Building',
		description: 'fame place',
		imageUrl:
			'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_(aerial_view).jpg',
		address: '20 W 34th St, New York, NY 10118',
		location: {
			lat: 40.75200883300933,
			lng: -73.99381831540529
		},
		creator: 'u1'
	},
	{
		id: 'p2',
		title: 'Empire State Building',
		description: 'fame place',
		imageUrl:
			'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_(aerial_view).jpg',
		address: '20 W 34th St, New York, NY 10118',
		location: {
			lat: 40.75200883300933,
			lng: -73.99381831540529
		},
		creator: 'u2'
	}
];

const UserPlaces = () => {
	const userId = useParams().userId;
	const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
	return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
