import axios from "axios";
import { addKeywordState } from "./addKeywordState";
import { atom, selector, useRecoilValue } from "recoil";

// 体重のAtomを作成
export const getApiState = selector({
    key: 'getApiState',
    get: async ({ get }) => {
        try {
            const keyword = get(addKeywordState);
            const response = await axios(
                `https://api.github.com/search/repositories?q=${keyword}`
            );
            // const test = response.data.items;
            // return response;
            // const response = await axios('https://qiita.com/api/v2/items?page=1&per_page=20');
            // const test = response;
            return response;
            // return test;
        } catch (error) {
            throw error;
        }
    }
});