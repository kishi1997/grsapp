'use client'
import classes from '../styles/components/SearchBox.module.scss'
import Pagination from './Pagination';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
// recoil：キーワード
import { addKeywordState } from '../states/atoms/addKeywordState';
// recoil： apiで取得したレポジトリを格納
import { searchResultState } from '../states/atoms/searchResultState';
import axios from 'axios';
// recoil： Githubのapiを取得
import { getApiState } from '../states/atoms/getApiState';

const SearchBox = () => {
    // 入力キーワードの状態管理
    const [ keyword, setKeyword] = useRecoilState(addKeywordState);

    // 検索したキーワードと一致するレポジトリの状態管理
    const [repos, setRepos] = useRecoilState(searchResultState);
    // const [repos, setRepos] = useState<Repo[]>([]);

    // 検索キーワードと一致するレポジトリをapiを使って検索し、setReposに
    const test = useRecoilValueLoadable(getApiState);

    const searchRepos = () => {
        // 値があれば表示
        if (test.state === 'hasValue') {
            const items = test.contents.data.items;
            setRepos(items);
            // itemsの値を使用する処理を記述する
          }
    }

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