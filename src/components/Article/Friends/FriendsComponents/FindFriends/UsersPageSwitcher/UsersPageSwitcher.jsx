import React from 'react';
import classes from './UsersPageSwitcher.module.css';

const UsersPageSwitcher = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pagesToShow = [];

  for (let i = 1; i<=pagesCount; i++) {
    if(i <= 7) {
      pagesToShow.push(i);
    }
  }
  pagesToShow = pagesToShow.map(p => {
       return <button className={props.currentPage === p ? classes.selected_page : ''} onClick={() => props.changePage(p)} key={p}>{p}</button>
  });

    return (
        <div className={classes.pages}>
          {pagesToShow}
        </div>
    );
}

export default UsersPageSwitcher;