import React from 'react';
import { PostStyled, Avatar, PostBody, PostDescription, Images, PostFooter } from './styles';
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

export const Posts = ({ name, username, text, avatar, imagePost }) => {
  return (
    <PostStyled>
      <div className='post_avatar'>
        <Avatar src={avatar} alt='' />
      </div>
      <PostBody>
        <div>
          <h3>
            {name}
            <span>
              <VerifiedIcon className='post_icon' />
              @{username}
            </span>
          </h3>
          <PostDescription>
            <p>{text}</p>
          </PostDescription>
        </div>
        {imagePost && <Images src={imagePost} alt="Post image" />}
        <PostFooter>
          <ChatBubbleOutlineOutlinedIcon fontSize='small' />
          <RepeatOutlinedIcon fontSize='small' />
          <FavoriteBorderOutlinedIcon fontSize='small' />
          <EqualizerOutlinedIcon fontSize='small' />
          <BookmarkBorderOutlinedIcon fontSize='small' />
          <PublishOutlinedIcon fontSize='small' />
        </PostFooter>
      </PostBody>
    </PostStyled>
  );
};
