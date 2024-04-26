import React from 'react';
import CardHeader from './CardHeader';
import CardContent from './CardContent';
import './CardStyles.css';

export default function Card({ post, toggleIsRead, deletePost }) {
	return (
		<div className='card shadow'>
			<CardHeader
				id={post.id}
				title={post.title}
				date={post.date}
				authors={post.authorNames}
				isRead={post.isRead}
				toggleIsRead={toggleIsRead}
				deletePost={deletePost}
			/>
			<CardContent>
				<p>{post.content}</p>
				<p style={{ fontStyle: 'italic' }}>
					Additional (Fixed) Content: <strong>props.children</strong>{' '}
					represents the content between the opening and the closing
					tags when invoking/rendering a component.
				</p>
			</CardContent>
		</div>
	);
}
