import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const datePickerStyles = makeStyles((theme) => ({
  container: {
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const Filter = React.forwardRef((props, ref) => {
  const {
    startDate,
    endDate,
    onClickButton,
    onClickStartDate,
    onClickEndDate,
  } = props;

  const datePickerClasses = datePickerStyles();

  // <Paper component="form" className={classes.root}>
  //   <InputBase
  //     className={classes.input}
  //     placeholder="Search News"
  //     inputProps={{ 'aria-label': 'search news' }}
  //   />
  //   <IconButton type="submit" className={classes.iconButton} aria-label="search">
  //     <SearchIcon />
  //   </IconButton>
  // </Paper>

  return(
    <>
    <div>
      <form className={datePickerClasses.container} noValidate>
        <TextField
          id="start_date"
          label="Start Date"
          type="date"
          defaultValue={startDate}
          className={datePickerClasses.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onClickStartDate}
        />
      </form>
    </div>
    <div>
      <form className={datePickerClasses.container} noValidate>
        <TextField
          id="end_date"
          label="End Date"
          type="date"
          defaultValue={endDate}
          className={datePickerClasses.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onClickEndDate}
        />
      </form>
    </div>
    <button onClick={onClickButton}>Filter</button>
    </>
  )
})

Filter.displayName = 'Filter';
export default Filter;
