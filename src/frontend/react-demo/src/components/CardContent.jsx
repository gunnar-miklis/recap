import React from 'react';
import './CardStyles.css';

export default function CardContent( props ) {

	return (
		<div className='card-content'>
			{props.children}
		</div>
	);
}
