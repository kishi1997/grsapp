'use client'
import React, { useState } from 'react'
import classes from '../styles/components/SearchBox.module.scss'
import axios from 'axios'
import Repo from '../type';
import Pagination from './Pagination';

const SearchBox = () => {
    // 入力キーワードの状態管理
    const [keyword, setKeyword] = useState('');

    // 検索したキーワードと一致するレポジトリの状態管理
    const [repos, setRepos] = useState<Repo[]>([]);

    // 検索キーワードと一致するレポジトリをapiを使って検索し、setReposに
    const searchRepos = async () => {
        try {
            const response = await axios.get(
                `https://api.github.com/search/repositories?q=${keyword}`
            );
            setRepos(response.data.items);
        } catch (error) {
            console.log('error');
            // setRepos(一致するレポジトリが見当たりません。キーワードを変えて再度検索ください。)
        }
    };

    return (
        <>
            <div className={classes.searchBox}>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
            <button className={classes.primaryBtn} onClick={searchRepos}>Search</button>
            <Pagination repos={repos} />
        </>
    )
}

export default SearchBox