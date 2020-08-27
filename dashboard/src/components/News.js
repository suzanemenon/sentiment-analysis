import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import SubjectIcon from '@material-ui/icons/Subject';

const listStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    avatarBackground: {
      backgroundColor: '#f2a646',
    },
  }));

const News = React.forwardRef((props, ref) => {
  const {
    content,
    date,
    url,
  } = props;

  const listClasses = listStyles();

  return(
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar className={listClasses.avatarBackground}>
          <SubjectIcon style={{ color: '#000' }} fontSize="large" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText 
        primary={content}
        secondary={<div><a href={url}>Fonte</a><p>{date}</p></div>}
      />
    </ListItem>
  )
})

News.displayName = 'News';
export default News;
