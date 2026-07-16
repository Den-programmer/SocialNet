import React from 'react'
import classes from '../wall.module.scss'
import { Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

interface IProps {
  
}

const SemanticSearch: React.FC<IProps> = (props) => {
  return (
    <div className={classes.semanticSearch}>
      <SearchOutlined className={classes.searchIcon} />
      <input type="text" 
      name="posts_semanticSearch"
      placeholder="Search posts by meaning... (e.g 'happy', 'cats', 'dogs')" 
      className={classes.sem_searchInput}/>
      <Button className={classes.searchButton}>Semantic Search</Button>
    </div>
  )
}

export default SemanticSearch