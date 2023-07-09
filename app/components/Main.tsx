import React from 'react'
import classes from '../styles/components/Main.module.scss'
// import Pagenation from './pagenation'
import SearchBox from './SearchBox'
import Repositories from './Repositories'
import Pagenation from './Pagenation'

const Main = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Githubリポジトリ検索アプリケーション</h1>
      <div className={classes.desc}>キーワードを入力してGithubリポジトリを見つけよう！</div>
      <SearchBox />
      {/* <Repositories /> */}
      {/* <Pagenation /> */}
    </div>
  )
}

export default Main