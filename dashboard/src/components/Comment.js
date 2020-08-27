import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';

const listStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    avatarBackground: {
      backgroundColor: '#FFF',
    },
  }));

const Comment = React.forwardRef((props, ref) => {
  const {
    content,
    date,
    typeColor,
  } = props;

  const listClasses = listStyles();

  return(
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar className={listClasses.avatarBackground}>
          <CommentIcon style={{ color: typeColor }} fontSize="large" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={content} secondary={date} />
    </ListItem>
  )
})

Comment.displayName = 'Comment';
export default Comment;
