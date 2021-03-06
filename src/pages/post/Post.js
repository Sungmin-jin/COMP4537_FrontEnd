import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getPost } from '../../redux/action/post';
import './Post.css';
import moment from 'moment-timezone';
import CommentForm from '../../components/comment/CommentForm';
import CommentSection from '../../components/comment/CommentSection';
import { Spinner } from '@chakra-ui/react';
import axios from 'axios';
import url from '../../config/defaultUrl.json';
import { useHistory } from 'react-router-dom';

const Post = ({ match }) => {
	const dispatch = useDispatch();

	const post = useSelector(state => state.post.post);
	const loading = useSelector(state => state.post.loading);
	const user = useSelector(state => state.auth.user);

	const [commonRoom, setCommonRoom] = useState(null);
	const history = useHistory();
	useEffect(() => {
		dispatch(getPost(match.params.id));
	}, []);

	useEffect(() => {
		const getChatRooms = async () => {
			const config = {
				header: {
					'Content-Type': 'application/json',
				},
			};
			if (!user || !post) {
				return;
			}

			if (user.userId === post.userId) return;
			const res = await axios.post(
				`${url.url}/chatRoom/commonRoom`,
				{ user1: post.userId, user2: user.userId },
				config
			);
			setCommonRoom(res.data);
		};
		getChatRooms();
	}, [post, user]);

	const chatClick = async () => {
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};
		const createChatRoom = async () => {
			const chatRoom = await axios.post(
				`${url.url}/chatRoom`,
				{ userOne: post.userId, userTwo: user.userId },
				config
			);
			history.push(`/chatting/${chatRoom.chatRoomId}`);
		};

		if (!commonRoom) {
			createChatRoom();
		} else {
			history.push(`/chatting/${commonRoom.chatRoomId}`);
		}
	};

	return loading ? (
		<div className='spinner-container'>
			<Spinner
				size='xl'
				thickness='5px'
				speed='0.65s'
				emptyColor='#E2E8F0'
				color='#90CDF4'
			/>
		</div>
	) : (
		<div className='post-body-container'>
			<h1 className='posts-heading-primary'>
				<span className='posts-heading-primary-main'>
					Kreamin Studio
				</span>
			</h1>
			<div className='post-container'>
				<div className='post-image-container'>
					<img
						src={post.img}
						className='img-thumbnail'
						alt='postImage'
					/>
				</div>
				<div className='post-detail-container'>
					<div className='post-detail-header'>
						<span className='post-title'>{post.title}</span>
					</div>
					<div className='post-detail-contents-1'>
						{post.isSold === 1 ? (
							<span className='span-unavailable unavailable'>
								NOT AVAILABLE
							</span>
						) : (
							<span className='span-available available'>
								available
							</span>
						)}
						<span className='post-date'>
							{moment(post.postDate).fromNow()}
						</span>
						<hr className='post-divider' />
						<span className='post-price'>CA${post.price}</span>
						{post && user && post.userId !== user.userId ? (
							<button onClick={chatClick} className='go-to-chat'>
								Contact Seller
							</button>
						) : (
							<></>
						)}
					</div>
					<div className='post-detail-contents-2'>
						<div className='post-owner'>
							Posted By: <span> {post.name}</span>
						</div>
						<div className='post-text'>
							<span>{post.text}</span>
						</div>
					</div>
					<div className='post-comment-container'>
						<CommentSection id={match.params.id} />

						<CommentForm id={match.params.id} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
