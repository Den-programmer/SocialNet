import React, { useState } from 'react';
import classes from './Paginator.module.css';

interface PaginatorPropTypes {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  changePage: (currentPage: number) => void
}

const Paginator: React.FC<PaginatorPropTypes> = ({totalItemsCount, pageSize, currentPage, changePage}) => {
  let pagesCount: number = Math.ceil(totalItemsCount / pageSize);

  let pagesToShow: Array<number> = [];

  for (let i = 1; i<=pagesCount; i++) {
    pagesToShow.push(i);
  }
  let portionCount:number = Math.ceil(pagesCount / pageSize);
  let [portionNumber, setPortionNumber] = useState<number>(1);
  let leftLimitPageNmb:number = (portionNumber - 1) * pageSize + 1;
  let rightLimitPageNmb:number = portionNumber * pageSize;

  let pages = pagesToShow.filter(page => page >= leftLimitPageNmb && page <= rightLimitPageNmb).map(p => {
       return <button key={p}
       className={currentPage === p ? classes.selected_page : ''} 
       onClick={() => changePage(p)}>{p}</button>
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