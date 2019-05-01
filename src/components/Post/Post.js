import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import VideoThumbNew from '../VideoThumbNew';
import { cutTextWithDots } from '../../util/textUtil';
import './style.scss';

const preparePostData = item => {
  return {
    ...item,
    avatarUrl: item.author.avatar.sources[0].url,
    userName: item.author.username,
    published: moment(item.published).format('MMMM D, YYYY'),
    description: cutTextWithDots(item.text, 83),
    video: {
      clip_id: item.sharing_details.clip_id,
      videos: [
        {
          id: item.sharing_details.id,
          title: item.sharing_details.title,
          thumbnail_url: item.items[0].thumbnail.sources[0].url,
          video_url: item.items[0].sources[1].url
        }
      ]
    }
  };
};

const PostItem = props => {
  const { item, setCurrentPlayId, playId } = props;
  const post = preparePostData(item);

  return (
    <div className="post">
      <div className="post-author">
        <div className="post-author__avatar">
          <img src={post.avatarUrl} alt="Avatar" width={42} />
        </div>
        <div className="post-data">
          <div className="post__author-name">{post.userName}</div>
          <div className="post__date">{post.published}</div>
        </div>
      </div>
      <div className="post-video-container">
        <VideoThumbNew
          clips={post.video}
          showVideoData={false}
          setCurrentPlayId={setCurrentPlayId}
          playId={playId}
          bookmarkBlock={false}
        />
      </div>
      <div className="post__description">{post.description}</div>
      <div className="post-actions">
        <div className="post__action">
          <svg id="post-like" viewBox="0 0 17 16" width="17" height="16">
            <path
              d="M15.118.924c2.246 1.678 2.524 5.331.6 8.275-.835 1.277-2.309 2.778-4.18 4.385a53.742
              53.742 0 0 1-2.742 2.199L8.5 16l-.296-.217-.222-.166a53.776 53.776 0 0
              1-2.52-2.033c-1.87-1.607-3.345-3.108-4.18-4.385-1.924-2.944-1.646-6.597.6-8.275C3.958-.626
              6.85-.187 8.5 1.903c1.65-2.09 4.542-2.53 6.618-.979zM8.997 14.372c.612-.478 1.252-1 1.89-1.546
              1.804-1.55 3.224-2.996 3.994-4.174 1.656-2.534 1.423-5.594-.361-6.926C12.729.388 10.161.93 8.932
              3.042l-.432.742-.432-.742C6.838.93 4.27.388 2.48 1.725.696 3.058.463 6.118 2.12 8.652c.77 1.178
              2.19 2.623 3.994 4.174a52.786 52.786 0 0 0 2.386 1.93l.497-.384z"
              fill="#3E3E3E"
            />
          </svg>
          {post.likes.count}
        </div>
        <div className="post__action">
          <svg id="post-comments" viewBox="0 0 17 17" width="17" height="17">
            <path
              d="M8.5 16.3l-2.531-2.802H4.001v.002a3.5 3.5 0 0 1-3.5-3.5V4.5H.5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H11l-2.5 2.8z"
              stroke="#3E3E3E"
              fill="none"
            />
          </svg>
          {post.comments.count}
        </div>
        <div className="post__action">
          <svg id="post-share" viewBox="0 0 17 17" width="17" height="17">
            <g fill="currentColor" fillRule="evenodd">
              <path
                d="M4.5 3.997L13.187 4a.5.5 0 0 0 0-1l-8.682-.003A4.505 4.505 0 0 0 0 7.5v2c0
                .276.235.5.51.5.277 0 .49-.224.49-.5V7.348a3.505 3.505 0 0 1 3.5-3.351z"
                fillRule="nonzero"
              />
              <path d="M12 7l5-3.5L12 0" />
              <path
                d="M5 14l7.495.003A4.505 4.505 0 0 0 17 9.5v-2a.51.51 0 0
                0-.51-.5.491.491 0 0 0-.49.5v2.152a3.505 3.505 0 0
                1-3.5 3.351L5 13v-3l-5 3.5L5 17v-3z"
                fillRule="nonzero"
              />
            </g>
          </svg>
          {post.repost.count}
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  myVideos: PropTypes.array,
  theme: PropTypes.object,
  setCurrentPlayId: PropTypes.func,
  play_id: PropTypes.string,
  rowState: PropTypes.bool
};

PostItem.defaultProps = {
  play_id: undefined,
  myVideos: []
};

export default PostItem;
