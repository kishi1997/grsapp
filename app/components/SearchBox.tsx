'use client'
import axios from 'axios';
import classes from '../styles/components/SearchBox.module.scss'
import Repositories from './Repositories';
// recoil
import { useRecoilState } from "recoil";
import { addKeywordState } from '../states/atoms/addKeywordState';
import { searchResultState } from '../states/atoms/searchResultState';
import { errorState } from '../states/atoms/errorState';

const SearchBox = () => {
    // errorの状態管理
    const [error, setError] = useRecoilState(errorState);
    // 入力キーワードの状態管理
    const [keyword, setKeyword] = useRecoilState(addKeywordState);

    // 検索したキーワードと一致するレポジトリの状態管理
    const [repos, setRepos] = useRecoilState(searchResultState);
    // const [repos, setRepos] = useState<Repo[]>([]);

    // 検索キーワードと一致するレポジトリをapiを使って検索し、setReposに
    const searchRepos = async () => {
        try {
            const response = await axios.get(
                `https://api.github.com/search/repositories?q=${keyword}`
            );
            setRepos(response.data.items);
            // console.log("not-error");
            if (response.data.items.length === 0) {
                setError(`"${keyword}"に一致するリポジトリがありません。`);
                console.log("error");
            }
        } catch (error) {
            throw error;
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
            <div>
                {error && <div className={classes.error}>{error}</div>}
            </div>
            <Repositories />
        </>
    )
}

export default SearchBox