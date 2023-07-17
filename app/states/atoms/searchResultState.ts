import {atom, selector } from "recoil";
import { Repo } from "../../type";

// apiで取得したレポジトリを格納
export const searchResultState = atom<Array<Repo>> ({
    key: 'searchResultState',
    default: [],
});
