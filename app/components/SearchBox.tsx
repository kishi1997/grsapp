'use client'
import classes from '../styles/components/SearchBox.module.scss'
import Pagination from './Pagination';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
// recoil：キーワード
import { addKeywordState } from '../states/atoms/addKeywordState';
// recoil： apiで取得したレポジトリを格納
import { searchResultState } from '../states/atoms/searchResultState';
// recoil： Githubのapiを取得
import { reposSelector } from '../states/selector/reposSelector';
import { isClickedState } from '../states/atoms/isClickedState';
import Repositories from './Repositories';

const SearchBox = () => {
    // 入力キーワードの状態管理
    const [keyword, setKeyword] = useRecoilState(addKeywordState);

    // 検索したキーワードと一致するレポジトリの状態管理
    const [repos, setRepos] = useRecoilState(searchResultState);
    // const [repos, setRepos] = useState<Repo[]>([]);

    // 検索キーワードと一致するレポジトリをapiを使って検索し、setReposに
    const responseLoadable = useRecoilValueLoadable(reposSelector);

    // クリックされたかどうかの判定
    // const [isClicked, setIsClicked] = useRecoilState(isClickedState);

    const searchRepos = () => {
        // 値があれば表示
        if (responseLoadable.state === 'hasValue') {
            // const response = responseLoadable.contents;
            const items = responseLoadable.contents.data.items;
            setRepos(items);
            // setIsClicked(true);
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
            {/* <Pagination repos={repos} /> */}
            <Repositories />
        </>
    )
}

export default SearchBox