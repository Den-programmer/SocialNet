import React, { useState } from 'react'
import classes from './Paginator.module.css'
import { Button, makeStyles, Theme, createStyles } from '@material-ui/core'

interface PaginatorPropTypes {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  changePage: (currentPage: number) => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  controlButton: {
    fontWeight: 'bold',
    padding: '5px 10px',
    color: '#FFF'
  }
}))

const Paginator: React.FC<PaginatorPropTypes> = ({totalItemsCount, pageSize, currentPage, changePage}) => {
  const s = useStyles()
  let pagesCount: number = Math.ceil(totalItemsCount / pageSize)

  let pagesToShow: Array<number> = []

  for (let i = 1; i<=pagesCount; i++) {
    pagesToShow.push(i)
  }
  let portionCount:number = Math.ceil(pagesCount / pageSize)
  let [portionNumber, setPortionNumber] = useState<number>(1)
  let leftLimitPageNmb:number = (portionNumber - 1) * pageSize + 1
  let rightLimitPageNmb:number = portionNumber * pageSize

  let pages = pagesToShow.filter(page => page >= leftLimitPageNmb && page <= rightLimitPageNmb).map(p => {
       return <button key={p}
       className={currentPage === p ? classes.selected_page : classes.page} 
       onClick={() => changePage(p)}>{p}</button>
  })

    return (
        <div className={classes.pages}>
          {portionNumber > 1 && <Button className={s.controlButton} variant="contained" color="secondary" onClick={() => { setPortionNumber(portionNumber - 1) }}>Previous</Button>}
          {pages}
          {portionCount > portionNumber && <Button className={s.controlButton} variant="contained" color="primary" onClick={() => { setPortionNumber(portionNumber + 1) }}>Next</Button>}
        </div>
    )
}

export default Paginator