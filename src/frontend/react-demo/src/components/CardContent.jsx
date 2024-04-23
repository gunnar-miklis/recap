import React from 'react';
import './CardStyles.css';

export default function CardContent({ content }) {

	return (
		<div className='card-content'>
			<p>{content}</p>
		</div>
	);
}
