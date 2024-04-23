import './App.css';
import Card from './components/Card';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getPosts();
	}, []);

	async function getPosts() {
		try {
			const apiPosts = await axios.get('http://localhost:8000/posts');
			const allPosts = apiPosts.data;

			const apiAuthors = await axios.get('http://localhost:8000/authors');
			const allAuthors = apiAuthors.data;

			for (const post of allPosts) {
				const authorIDs = post.authors;
				post.authorNames = [];
				for (const authorID of authorIDs) {
					for (const author of allAuthors) {
						if (authorID === author.id) {
							post.authorNames.push(author.name);
						}
					}
				}
			}
			
			setPosts( allPosts )
		} catch (error) {
			setPosts([]);
			console.error(error);
		}
	}

	if (!posts.length) return <p>Loading ...</p>;
	return (
		<>
			<h1>Blog</h1>
			{posts.length &&
				posts.map((post) => (
					<Card
						key={post.id}
						title={post.title}
						date={post.date}
						authors={post.authorNames}
						content={post.content}
					/>
				))}
		</>
	);
}

export default App;
