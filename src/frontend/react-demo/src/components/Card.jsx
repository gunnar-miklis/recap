import React from 'react';
import CardHeader from './CardHeader';
import CardContent from './CardContent';
import './CardStyles.css';

export default function Card({ title, date, authors, content }) {
	return (
		<div className='card shadow'>
			<CardHeader title={title} date={date} authors={authors} />
			<CardContent content={content} />
		</div>
	);
}
