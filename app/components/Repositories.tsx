'use client'
import React, { useState } from 'react'
import Repo from '../type';
import { NextPage } from 'next';
import classes from '../styles/components/Repositories.module.scss'

// 受け取ったpropsはreposで、複数のrepository情報が格納された配列のため、[]をつける。
type repoInfo = {
    repos: Repo[];
    currentRepos: Repo[];
};

const Repositories: NextPage<repoInfo> = (props) => {
    const {repos, currentRepos} = props;
    // idの状態管理
    const [openIds, setOpenIds] = useState(null);
    // idが一致する場合はnullに（詳細表示）、しない場合は付与（詳細非表示）
    const toggleDetails = (id: number) => {
        if (openIds === id) {
            setOpenIds(null);
        } else {
            setOpenIds(id);
            console.log(openIds);
        }
    };

    return (
        <ul>
            {currentRepos.map((repo) => (
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
    )
}

export default Repositories