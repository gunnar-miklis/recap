import './App.css';
import './components/CardStyles.css';
import Card from './components/Card';
import axios from 'axios';
import { useState, useEffect } from 'react';

// props: are read-only, come from "outside" (parent component)
// state: are read-write, belong to the component itself
// on props AND state updates => component gets re-rendered

function App() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getPosts();
	}, []);

	async function getPosts() {
		try {
			const apiPosts = await axios.get('http://localhost:8000/posts');
			const allPosts = apiPosts.data;

			// populate posts with author names (i believe json-server does not offer this functionality. also good coding practice anyway)
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

			setPosts(allPosts);
		} catch (error) {
			setPosts([]);
			console.error(error);
		}
	}

	function toggleIsRead(postID) {
		for (const post of posts) {
			if (post.id === postID) {
				const readState = post.isRead ? false : true;
				(async () => {
					try {
						// COMMENT: using json-server "put" overwrites the entire object, while "patch" updates just one field
						await axios.patch(
							`http://localhost:8000/posts/${postID}`,
							{ isRead: readState },
						);
						getPosts();
					} catch (error) {
						console.error(error);
					}
				})();
			}
		}
	}

	if (!posts.length) return <p>Loading ...</p>;
	return (
		<>
			<h1>Blog</h1>
			<div className='card-container'>
				{posts.length &&
					posts.map((post) => (
						<Card
							key={post.id}
							post={post} // COMMENT: pass data down, with props
							toggleIsRead={toggleIsRead} // COMMENT: lift data up, with functions
						/>
					))}
			</div>
		</>
	);
}

export default App;
