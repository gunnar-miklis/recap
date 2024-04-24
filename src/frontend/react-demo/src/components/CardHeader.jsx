import React from 'react';
import './CardStyles.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CardHeader({ id, title, date, authors, isRead, toggleIsRead }) {
	if (!authors.length) return <p>Loading ...</p>;
	return (
		<div className='flex-col'>
			<div className='flex-row flex-between'>
				<h3 className='card-title' onClick={() => toggleIsRead(id)}>
					{title}
					<span
						style={{
							fontSize: '50%',
							fontWeight: 'normal',
							color: 'gray',
							marginLeft: '0.6em',
							position: 'relative',
							bottom: '0.19em',
						}}
					>
						{isRead ? '✔️' : '✖️'}
					</span>
				</h3>
				<p className='card-date'>{date}</p>
			</div>
			<p className='card-authors'>
				written by{' '}
				{/* place comma after each author logic
					* when 1 author: no comma
					* when 2 or more: place coma after each, but the last...
						... instead:  "author1, author2, author3, " => do: "author1, author2, author3" */}
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
