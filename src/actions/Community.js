import {
  GET_HUB_POSTS,
  GET_HUB_POSTS_SUCCESS,
  GET_HUB_POSTS_FAILED,
  GET_HUB_POSTS_NEXT
} from '../constants/ActionTypes';

export const getHubPosts = () => ({
  type: GET_HUB_POSTS
});

export const getHubPostsSuccess = hubPosts => ({
  type: GET_HUB_POSTS_SUCCESS,
  hubPosts
});

export const getHubPostsFailed = error => ({
  type: GET_HUB_POSTS_FAILED,
  error
});

export const getHubPostsNext = cursor => ({
  type: GET_HUB_POSTS_NEXT,
  cursor
});
