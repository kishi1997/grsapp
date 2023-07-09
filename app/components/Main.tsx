'use client'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import classes from '../styles/components/Main.module.scss'

interface Repo {
  id: number;
  name: string;
  html_url: string;
  owner: {
    avatar_url: string;
  };
  language: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
}

const Main = () => {
  const [keyword, setKeyword] = useState('');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  const searchRepos = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${keyword}`
      );
      setRepos(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const [openIds, setOpenIds] = useState(null);

  const toggleDetails = (id:number) => {
    if (openIds === id) {
      setOpenIds(null);
      console.log(openIds, 'nullだよ');
    } else {
      setOpenIds(id);
      console.log(openIds);
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Githubリポジトリ検索アプリケーション</h1>
      <div className={classes.desc}>キーワードを入力してGithubリポジトリを見つけよう！</div>
      <div className={classes.searchBox}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <button className={classes.primaryBtn} onClick={searchRepos}>Search</button>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id} className={classes.repo}>
            <div className={classes.repo__title}>
              <h2>{repo.name} {repo.id}</h2>
              <div className={classes.repo__btn1}>
                <button onClick={() => toggleDetails(repo.id)}>
                  {openIds === repo.id ? '閉じる' : '詳細を見る'}
                </button>
              </div>
            </div>
            {openIds === repo.id &&
                <div>
                  <div className={classes.repo__detail}>
                    <div className={classes.repo__icon}><img src={repo.owner.avatar_url} alt="Owner Avatar" /></div>
                    <div>プロジェクト言語: {repo.language}</div>
                    <div>Star数: {repo.stargazers_count}</div>
                    <div>Watcher数: {repo.watchers_count}</div>
                    <div>Fork数: {repo.forks_count}</div>
                    <div>Issue数: {repo.open_issues_count}</div>
                  </div>
                  <div className={classes.primaryBtn}>
                    <a href={repo.html_url} target='_blank' rel="noopener noreferrer">このリポジトリを見る</a>
                  </div>
                </div>
            }
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Main