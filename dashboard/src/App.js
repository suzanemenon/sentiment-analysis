import React, { useEffect, useState } from 'react';
import './App.css';
import { csv } from 'd3-fetch';
import { group, groups, descending, ascending } from 'd3-array';
import { Select } from '@material-ui/core';
import moment from 'moment';

import commentsDatasetFile from './datasets/covid19_classified_dataset_from_2020-02-23_to_2020-08-02.csv'
import newsDatasetFile from './datasets/news_g1_covid19_dataset_from_2020-02-23_to_2020-08-02.csv'

import WordCloudChart from './components/WordCloudChart';
import CalendarChart from './components/CalendarChart';
import AreaChart from './components/AreaChart';
import Filter from './components/Filter';
import CommentsCard from './components/CommentsCard';
import NewsCard from './components/NewsCard';

const areaChartcolumns = ['Date', 'Positive', 'Negative']

const App = () => {
  const [newsData, setNewsData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [hasNews, setHasNews] = useState(false);
  const [hasComments, setHasComments] = useState(false);
  const [openCharts, setOpenCharts] = useState(false);

  const [areaChartData, setAreaChartData] = useState([]);
  const [areaChartPositiveCommentsData, setAreaChartPositiveCommentsData] = useState([]);
  const [areaChartNegativeCommentsData, setAreaChartNegativeCommentsData] = useState([]);

  const [newsByRange, setNewsByRange] = useState([]);
  const [commentsByHashtags, setCommentsByHashtags] = useState([]);
  
  const [filteredAreaChartData, setFilteredAreaChartData] = useState([]);
  const [selectedOption, setSelectedOption] = useState({ });
  const [chartData, setChartData] = useState(undefined);
  const [selectedDateIndex, setSelectedDateIndex] = useState(undefined);
  const [selectedTweets, setSelectedTweets] = useState(undefined);
  const [comments, setComments] = useState(undefined);
  const [selectedStartDate, setSelectedStartDate] = useState("2020-06-02");
  const [selectedEndDate, setSelectedEndDate] = useState("2020-07-30");

  useEffect(() => {
    if(hasNews && hasComments) {
      document.getElementById("import").innerHTML = 'All set!';
    }
  }, [hasNews, hasComments])

  useEffect(() => {
  }, [])

  const handleOnLoadComments = () => {
    //'id', 'replies', 'retweets', 'favorites', 'hashtags', 'text', 'permalink', 'date', 'time', 'label'

    csv(commentsDatasetFile).then(data => {
      setCommentsData(data)
      setHasComments(true)
    })
  }

  const handleOnLoadNews = () => {
    //'id', 'date', 'time', 'title', 'subtitle', 'url', 'text'

    csv(newsDatasetFile).then(data => {
      const days = group(data, d => d.date)
      console.log(days)
      setNewsData(days)
      setHasNews(true)
    })
  }
  
  const handleCalendarChartClick = (index) => {
    setSelectedDateIndex(index);

    selectedTweets && selectedTweets.map((t, i) => {
      if((selectedDateIndex) === i) {
        console.log(selectedTweets[selectedDateIndex])
      }
    })
  }

  const handleAreaChartClick = (comments) => {
    setComments(comments)
  }

  const handleAreaChartData = () => {
    const areaChartData = []
    const areaChartPositiveCommentsData = []
    const areaChartNegativeCommentsData = []

    const days = group(commentsData, d => d.date, d => d.label)

    for(const d of days.entries()) {
      const date = d[0]
      const countPositives = d[1].has('POSITIVE') ? d[1].get('POSITIVE').length : 0
      const countNegatives = d[1].has('NEGATIVE') ? d[1].get('NEGATIVE').length : 0

      areaChartData.push([date, countPositives, countNegatives])
      areaChartPositiveCommentsData.push(d[1].has('POSITIVE') ? [date, d[1].get('POSITIVE').map((e) => e.text)] : [])
      areaChartNegativeCommentsData.push(d[1].has('NEGATIVE') ? [date, d[1].get('NEGATIVE').map((e) => e.text)] : [])
    }

    areaChartData.unshift(areaChartcolumns)
    setAreaChartData(areaChartData)

    setAreaChartPositiveCommentsData(areaChartPositiveCommentsData)
    setAreaChartNegativeCommentsData(areaChartNegativeCommentsData)
  }

  const handleFilteredAreaChartData = () => {
    let filteredData = areaChartData.filter((item) => {
      return new Date(item[0]) >= selectedStartDate &&
            new Date(item[0]) <= selectedEndDate;
    });

    filteredData = filteredData.sort((x, y) => {
      return ascending(x[0], y[0]);
    });

    filteredData.unshift(areaChartcolumns)
    setFilteredAreaChartData(filteredData)
  }

  const handleFilteredNewsData = () => {
    let filteredNews = []
    for(const d of newsData.entries()) {
      const date = new Date(d[0])
      if(date >= selectedStartDate && date <= selectedEndDate) {
        filteredNews.push(d)
      }
    }
    console.log(filteredNews)
    setNewsByRange(filteredNews)
  }

  const handleCommentsByHashtag = () => {
    let newTags = new Map();
      commentsData.forEach((row) => {
        const rowTags = row.hashtags.toLowerCase().split(' ').map(h => h.substring(1));

        if(!!rowTags[0]) {
          rowTags.forEach((tag) => {
            const value = newTags.get(tag)
            if(value) {
              value.push(row)
              newTags.set(tag, value)
            } else {
              newTags.set(tag, [row])
            }
          })
        }
      });
      
      let wordsCount = []
      let index = 0;
      newTags.forEach((value, key, map) => {
        wordsCount.push({text: key, value: value.length, id: index, content: map})
        index++;
      })
      const sortedWordsCount = wordsCount.sort((x, y) => {
        return descending(x.value, y.value);
      });
      setCommentsByHashtags(sortedWordsCount);
  }

  const handleFilter = () => {
    handleAreaChartData()
    handleFilteredAreaChartData()
    handleFilteredNewsData()
    handleCommentsByHashtag()

    setOpenCharts(true)
  }

  const handleChange = (event) => {
    const optionId = event.target.value
    
    commentsByHashtags.map((h) => {
      if(h.id.toString() === optionId) {
        setSelectedOption({ value: h.id, label: h.text });

        const tweets = groups(h.content.get(h.text), r => r.date)
        setSelectedTweets(tweets);

        const data = tweets.map((t) => {
          return [moment(t[0]).toDate(), t[1].length]
        })
        
        data.unshift([{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }])

        setChartData(data)
      } 
    });
  }

  return (
    <div className="App">
      <div>
        <button onClick={handleOnLoadComments}>Import Comments</button>
        <button onClick={handleOnLoadNews}>Import News</button>
        <div><p id='import'>No datasets available yet</p></div>
      </div>
      {hasNews && hasComments &&
        <Filter 
          startDate={selectedStartDate}
          endDate={selectedEndDate}
          onClickButton={handleFilter}
          onClickStartDate={(e) => setSelectedStartDate(new Date(e.target.value))}
          onClickEndDate={(e) => setSelectedEndDate(new Date(e.target.value))}
        />
      }
      {openCharts &&
        <div style={{ padding: '50px' }}>
          <Select
            native
            value={selectedOption.value}
            onChange={handleChange}
            inputProps={{
              name: 'Hashtag',
              id: 'hashtag-native-simple',
            }}
          >
            {commentsByHashtags.map((t) => (<option value={t.id}>{t.text} ({t.value})</option>))}
          </Select>
          
          <div style={{ display: 'flex', paddingTop: '50px' }}>
            <div style={{ flex: '50%' }}>
              <AreaChart 
                data={filteredAreaChartData}
                positiveComments={areaChartPositiveCommentsData}
                negativeComments={areaChartNegativeCommentsData}
                onClick={handleAreaChartClick}
                title={'COVID-19'} 
              />
              <CalendarChart data={chartData} onClick={handleCalendarChartClick} title={selectedOption.label} />
            </div>
            <div style={{ flex: '50%' }}>
              <div style={{ display: 'flex' }}>
                <CommentsCard comments={comments} />
                <NewsCard news={newsByRange} />
              </div>
            </div>
          </div>
          <WordCloudChart words={commentsByHashtags.map((c) => ({ text: c.text, value: c.value }))} />
        </div>
      }
    </div>
  );
};

export default App;
