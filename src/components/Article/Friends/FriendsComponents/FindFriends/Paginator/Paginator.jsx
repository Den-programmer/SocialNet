import React, { useState } from 'react';
import classes from './Paginator.module.css';

const Paginator = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pagesToShow = [];

  for (let i = 1; i<=pagesCount; i++) {
    pagesToShow.push(i);
  }
  let portionCount = Math.ceil(pagesCount / props.pageSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftLimitPageNmb = (portionNumber - 1) * props.pageSize + 1;
  let rightLimitPageNmb = portionNumber * props.pageSize;

  let pages = pagesToShow.filter(page => page >= leftLimitPageNmb && page <= rightLimitPageNmb).map(p => {
       return <button 
       className={props.currentPage === p ? classes.selected_page : ''} 
       onClick={() => props.changePage(p)} 
       key={p}>{p}</button>
  });

    return (
        <div className={classes.pages}>
          {portionNumber > 1 && <button onClick={() => { setPortionNumber(portionNumber - 1) }}>Previous</button>}
          {pages}
          {portionCount > portionNumber && <button onClick={() => { setPortionNumber(portionNumber + 1) }}>Next</button>}
        </div>
    );
}

export default Paginator;