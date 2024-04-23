import React from 'react';
import './CardStyles.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CardHeader({ title, date, authors }) {
	if (!authors.length) return <p>Loading ...</p>;
	return (
		<div className='flex-col'>
			<div className='flex-row flex-between'>
				<h3 className='card-title'>{title}</h3>
				<p className='card-date'>{date}</p>
			</div>
			<p className='card-authors'>
				written by{' '}
				{authors.length > 1 ? (
					authors.map((author, i) => (
						<a key={i}>
							{author}
							{i + 1 < authors.length ? ', ' : ''}
						</a>
					))
				) : (
					<a>{authors}</a>
				)}
			</p>
		</div>
	);
}
