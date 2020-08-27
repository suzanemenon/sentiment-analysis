import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import ReactWordcloud from 'react-wordcloud';

// const wordCloudStyles = makeStyles((theme) => ({
//     root: {
//       width: '100%',
//       maxWidth: '36ch',
//       backgroundColor: theme.palette.background.paper,
//     },
//   }));

const wordCloudOptions = {
  colors: ['#000', '#A3A3A3'],
  enableTooltip: true,
  deterministic: true,
  randomSeed: 'seed4',
  fontFamily: 'impact',
  fontSizes: [10, 60],
  padding: 1,
  rotations: 2,
  rotationAngles: [-90, 0],
};

const WordCloud = React.forwardRef((props, ref) => {
  const {
    words,
  } = props;

  // const wordCloudClasses = wordCloudStyles();

  return(
    <div style={{ height: 600, width: 800 }}>
      <ReactWordcloud 
        options={wordCloudOptions}
        words={words} 
      />
    </div>
  )
})

WordCloud.displayName = 'WordCloud';
export default WordCloud;
