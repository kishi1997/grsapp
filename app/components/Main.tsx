import React from 'react'
import classes from '@/styles/components/Main.module.scss'

const Main = () => {
  return (
    <div className={classes.container}>
        <h1 className={classes.title}>Githubリポジトリ検索アプリケーション</h1>
        <div className={classes.desc}>キーワードを入力してGithubリポジトリを見つけよう！</div>
        <div className={classes.searchBox}><input type="text" /></div>
    </div>
  )
}

export default Main