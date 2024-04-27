import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './components/Card';
import CreatePost from './controlled-components/CreatePost';
import StatusMessage from './components/StatusMessage';
import './App.css';
import './components/CardStyles.css';

// COMMENT: props vs state
//	* props: are read-only, come from "outside" (parent component)
//	* state: are read-write, belong to the component itself
//	* on props AND state updates => component gets re-rendered

// COMMENT: reacts flow of information: "data down, actions up"
//	* pass data down, with props
//	* lift data up, with (callback) functions

// COMMENT: lifecycle
//	* Mount: inital render of a component / component creation (to DOM)
//	* Updating: re-render on changes of state or props
//	* Unmount: remove/destroy component (from DOM), cleanup: cancel request, timers, etc
//	* (side) effects: run some code at particular times during a lifecycle phase
//		* Examples: data fetching, subscription (pending requests), start timer, manually change DOM
//		* useEffect(), (once) during mount: useEffect(() => {}, [])
//		* useEffect(), during updating: useEffect(()=>{}, [dependency])
//		* useEffect(), (cleanup) during unmount: useEffect(()=>{return()=>clearInterval(id)},[])

// COMMENT: hooks
//	* interfere/interact with current lifecycle, "functions that let you hook into react state/lifecylce"
//	* only call on top-level (not inside loops/conditions/functions)
//	* useState(): creates an "state vairable" which updates the component on change.
//	* useContext(): creates a state which is accessible from all components (eg. dark/light theme)
//	* useRef(): can store a mutable value, which does not re-render the view on update. can also store DOM elements. (similar to useState() but does not trigger re-render)
//	* useEffect(): function which gets called every time the view gets mounted or when the state inside [dependency] changes.
//	* useLayoutEffect(): similar to useEffect(), but instead gets called before view gets mounted, but can hurt performance (load items instantly upon screen display, without it causing a small blink/flash)

function App() {
	const [posts, setPosts] = useState([]);
	const [authors, setAuthors] = useState([]);
	const [isVisible, setIsVisible] = useState(false);
	const [statusMessage, setStatusMessage] = useState({
		show: false,
		status: '',
		message: '',
		seconds: 5,
	});
	const countdownRef = useRef(statusMessage.seconds);

	// NOTE: load all posts
	useEffect(() => {
		getPosts();
	}, []);
	async function getPosts(status, message) {
		try {
			const apiPosts = await axios.get('http://localhost:8000/posts');
			const allPosts = apiPosts.data;
			allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

			// populate posts with author names
			// COMMENT: i believe json-server does not offer this functionality. also good coding practice anyway
			const apiAuthors = await axios.get('http://localhost:8000/authors');
			const allAuthors = apiAuthors.data;
			setAuthors(allAuthors);

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

			// NOTE: show status message
			countdownRef.current = 5;
			setStatusMessage({
				show: true,
				status: status || 'success',
				message: message || 'Posts loaded',
				seconds: 5,
			});
		} catch (error) {
			setPosts([]);
			console.error(error);
		}
	}

	// NOTE: delete post
	async function deletePost(postID) {
		try {
			for (const post of posts) {
				if (post.id === postID) {
					await axios.delete(`http://localhost:8000/posts/${postID}`);
					getPosts('success', 'Post deleted.');
				}
			}
		} catch (error) {
			console.error(error);
		}
	}

	// NOTE: mark post read / unread
	async function toggleIsRead(postID) {
		try {
			for (const post of posts) {
				if (post.id === postID) {
					const readState = post.isRead ? false : true;
					// COMMENT: using json-server "put" overwrites the entire object, while "patch" updates just one field
					await axios.patch(`http://localhost:8000/posts/${postID}`, {
						isRead: readState,
					});

					if (readState) {
						getPosts('success', 'Post marked as: "read"');
					} else {
						getPosts('success', 'Post marked as: "unread"');
					}
				}
			}
		} catch (error) {
			console.error(error);
		}
	}

	// NOTE: show/update status message
	useEffect(() => {
		if (!statusMessage.show) return;
		function countdown() {
			const s = countdownRef.current;
			if (s <= 0) {
				setStatusMessage((prevState) => ({
					...prevState,
					show: false,
				}));
				clearInterval(timer);
			} else {
				countdownRef.current -= 1;
				setStatusMessage((prevState) => ({
					...prevState,
					seconds: countdownRef.current,
				}));
			}
		}
		const timer = setInterval(countdown, 1000);
		return () => clearInterval(timer);
	}, [statusMessage.show]);

	if (!posts.length) return <p>Loading ...</p>;
	return (
		<>
			{/* NOTE: status message */}
			{statusMessage.show && (
				<StatusMessage
					status={statusMessage.status}
					message={statusMessage.message}
					seconds={statusMessage.seconds}
				/>
			)}

			<h1>Blog</h1>

			{/* NOTE: New Post */}
			<div className='flex-row flex-between'>
				<h2>New Post</h2>
			</div>
			{isVisible ? (
				<div className='card-container'>
					<div className='card shadow'>
						<CreatePost
							authors={authors}
							postsCount={posts.length}
							toggleIsVisible={() => setIsVisible(!isVisible)}
							getPosts={getPosts}
						/>
					</div>
				</div>
			) : (
				<button onClick={() => setIsVisible(!isVisible)}>➕</button>
			)}

			{/* NOTE: All Posts */}
			<div className='flex-row flex-between'>
				<h2>All Posts</h2>
				<button
					className='reload'
					onClick={() => getPosts('success', 'Refreshed')}
				>
					&#8635;
				</button>
			</div>
			<div className='card-container'>
				{posts.length &&
					posts.map((post) => (
						<Card
							key={post.id}
							post={post} // COMMENT: pass data down, props
							toggleIsRead={toggleIsRead} // COMMENT: lift data up, functions
							deletePost={deletePost}
						/>
					))}
			</div>
		</>
	);
}

export default App;
