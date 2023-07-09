import React, { useState } from 'react'
import Repo from '../type';
import Repositories from './Repositories';
import { NextPage } from 'next';
import ReactPaginate from 'react-paginate';

type repoInfo = {
    repos: Repo[];
};

const Pagenation: NextPage<repoInfo> = (props) => {
    const { repos } = props;
    // 1ページに表示するリポジトリ数
    const itemsPerPage = 5;
    // ページの先頭に表示するリポジトリの状態管理
    const [itemsOffset, setitemsOffset] = useState(0);
    // ページの最後に表示するリポジトリ
    const endOffset = itemsOffset + itemsPerPage;
    // slice関数で区切って表示
    const currentRepos = repos.slice(itemsOffset, endOffset);
    // 現在のページ数の計算
    const pageCount = Math.ceil(repos.length / itemsPerPage);
    const handlePageChange = (e: {selected:number}) => {
        const newOffset = (e.selected * itemsPerPage) % repos.length;
        setitemsOffset(newOffset);
    }

    return (
        <div>
            <Repositories repos={repos} currentRepos={currentRepos} />
            <ReactPaginate pageCount={pageCount} onPageChange={handlePageChange}/>
        </div>
    )
}

export default Pagenation