import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, Divider } from '@material-ui/core';
import Comment from './Comment';

const listStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  avatarBackground: {
    backgroundColor: 'white',
  },
}));

const CommentsCard = React.forwardRef((props, ref) => {
  const {
   comments,
  } = props;

  const listClasses = listStyles();

  return(
    <div style={{ width: '350px', float: 'right', height: '400px', overflow: 'auto' }}>
      <List className={listClasses.root}>
        {comments && comments[1].map((c) => (
          <>
            <Comment content={c} date={c.date} typeColor={comments[0] === 1 ? '#1DA1F2' : '#DD3F19'}/>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    </div>
  )
})

CommentsCard.displayName = 'CommentsCard';
export default CommentsCard;
