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
      <button onClick={searchRepos}>Search</button>
      <ul>
        {repos.map((repo: any) => (
          <li key={repo.id}>
            <a href={repo.html_url} target='_blank' rel="noopener noreferrer">
            <img src={repo.owner.avatar_url} alt="Owner Avatar" />
            <div>{repo.name}</div>
            <div>Language: {repo.html_url}</div>
            <div>Language: {repo.language}</div>
            <div>Stars: {repo.stargazers_count}</div>
            <div>Watchers: {repo.watchers_count}</div>
            <div>Forks: {repo.forks_count}</div>
            <div>Issues: {repo.open_issues_count}</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Main