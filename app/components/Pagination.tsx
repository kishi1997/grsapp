import React, { useState } from 'react'
import ReactPaginate from 'react-paginate';
import classes from '../styles/components/Pagination.module.scss';
import { searchResultState } from '../states/atoms/searchResultState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { itemsOffsetState } from '../states/atoms/itemsOffsetState';
import { currentReposSelector } from '../states/selector/currentReposSelector';

const Pagination = () => {
    // 検索結果のリポジトリ
    const repos = useRecoilValue(searchResultState);
    // 現在表示されているリポジトリ５つ
    const currentRepos = useRecoilValue(currentReposSelector);
    // 1ページに表示するリポジトリ数
    const itemsPerPage = 5;
    // ページの先頭に表示するリポジトリの状態管理
    const [itemsOffset, setItemsOffset] = useRecoilState(itemsOffsetState);
    // 現在のページ数の計算
    const pageCount = Math.ceil(repos.length / itemsPerPage);
    // ページの先頭に表示するリポジトリが何番目のリポジトリかを計算
    const handlePageChange = (e: { selected: number }) => {
        const newOffset = (e.selected * itemsPerPage) % repos.length;
        setItemsOffset(newOffset);
    }

    return (
        <>
            {/* <Repositories repos={repos} currentRepos={currentRepos} /> */}
            {repos.length > 0 &&
                <div className={classes.container}>
                    <ReactPaginate
                        pageCount={pageCount}
                        onPageChange={handlePageChange}
                        breakLabel="..."
                        nextLabel="next >"
                        pageRangeDisplayed={5}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                    />
                </div>
            }
        </>
    )
}

export default Pagination