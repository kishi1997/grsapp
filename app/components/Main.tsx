import React from 'react'
import classes from '../styles/components/Main.module.scss'
import SearchBox from './SearchBox'

const Main = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Githubリポジトリ検索アプリケーション</h1>
      <div className={classes.desc}>キーワードを入力してGithubリポジトリを見つけよう！</div>
      <SearchBox />
    </div>
  )
}

export default Main