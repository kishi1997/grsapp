import React from 'react'
import ReactPaginate from 'react-paginate';
import classes from '../styles/components/Pagination.module.scss';
import '../styles/pagination-parts.css';
// recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchResultState } from '../states/atoms/searchResultState';
import { itemsOffsetState } from '../states/atoms/itemsOffsetState';

const Pagination = () => {

    // -------------検索結果のリポジトリ
    const repos = useRecoilValue(searchResultState);

    // -------------1ページに表示するリポジトリ数
    const itemsPerPage = 5;

    // -------------ページの先頭に表示するリポジトリの状態管理
    const [itemsOffset, setItemsOffset] = useRecoilState(itemsOffsetState);

    // -------------現在のページ数の計算
    const pageCount = Math.ceil(repos.length / itemsPerPage);

    // -------------ページの先頭に表示するリポジトリが何番目のリポジトリかを計算
    const handlePageChange = (e: { selected: number }) => {
        const newOffset = (e.selected * itemsPerPage) % repos.length;
        setItemsOffset(newOffset);
    }

    return (

        <>
            {repos.length > 0 &&
                <div className={classes.pagination}>
                    <ReactPaginate
                        pageCount={pageCount}
                        onPageChange={handlePageChange}
                        breakLabel="..."
                        nextLabel="次へ >"
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={2}
                        previousLabel="< 前へ"
                        renderOnZeroPageCount={null}
                    />
                </div>
            }
        </>
    )
}

export default Pagination