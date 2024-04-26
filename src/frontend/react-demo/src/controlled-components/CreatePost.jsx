import React from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function CreatePost({
	authors,
	postsCount,
	toggleIsVisible,
	getPosts,
}) {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [selectedAuthors, setSelectedAuthors] = useState([]);

	// NOTE: create post
	async function createPost() {
		const now = new Date(Date.now());
		const today = now.toLocaleDateString();

		try {
			await axios.post(`http://localhost:8000/posts`, {
				id: `b${postsCount + 1}`,
				title,
				authors: selectedAuthors,
				date: today,
				content,
				isRead: false,
			});
			await toggleIsVisible();
			await getPosts('success', 'New post created!');
		} catch (error) {
			console.error();
		}
	}

	// NOTE: controlled components
	function handleTitle(e) {
		setTitle(e.target.value);
	}
	function handleAuthorSelection(e) {
		const selections = [];
		for (const selection of e.target.selectedOptions) {
			selections.push(selection.value);
		}
		setSelectedAuthors(selections);
	}
	function handleContent(e) {
		setContent(e.target.value);
	}
	function handleSubmit(e) {
		e.preventDefault();
		createPost();
	}

	return (
		<>
			<div className='flex-row flex-between'>
				<span />
				<button onClick={() => toggleIsVisible()}>✖️</button>
			</div>

			<form className='flex-col' method='POST' onSubmit={handleSubmit}>
				<label htmlFor='title'>Title</label>
				<input
					id='title'
					name='title'
					value={title}
					onChange={handleTitle}
					type='text'
					required
					autoFocus
				/>

				<label htmlFor='authors'>Author(s)</label>
				<select
					id='authors'
					name='authors'
					onChange={handleAuthorSelection}
					multiple
					required
				>
					{authors &&
						authors.map((author) => (
							<option key={author.id} value={author.id}>
								{author.name}
							</option>
						))}
				</select>

				<label htmlFor='name'>Content</label>
				<textarea
					id='content'
					name='content'
					value={content}
					onChange={handleContent}
					rows='10'
					required
				/>

				<button type='submit'>Create</button>
			</form>
		</>
	);
}
