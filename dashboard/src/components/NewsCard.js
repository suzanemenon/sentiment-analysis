import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, Divider } from '@material-ui/core';
import News from './News';

const listStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  avatarBackground: {
    backgroundColor: 'white',
  },
}));

const NewsCard = React.forwardRef((props, ref) => {
  const {
   news,
  } = props;

  const listClasses = listStyles();

  return(
    <div style={{ width: '350px', float: 'left', height: '400px', overflow: 'auto' }}>
      <List className={listClasses.root}>
        {news && news.map((n) => (
          n[1].map((i) => (
            <>
              <News content={i.title} date={i.date} url={i.url} />
              <Divider variant="inset" component="li" />
            </>
          ))
        ))}
      </List>
    </div>
  )
})

NewsCard.displayName = 'NewsCard';
export default NewsCard;
