import { Navigate } from 'react-router-dom';

export default function UserProfile({
	isLoggedIn,
	fakeUserData: { name, age, city },
}) {
	if (!isLoggedIn) return <Navigate to='/error' />;
	return (
		<div>
			<h1>User</h1>
			<h2>
				{name} is {age} years old and from {city}
			</h2>
			<h1>🔓</h1>
		</div>
	);
}
