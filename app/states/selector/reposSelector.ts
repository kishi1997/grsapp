import axios from "axios";
import { addKeywordState } from "../atoms/addKeywordState";
import { selector} from "recoil";

// 体重のAtomを作成
export const reposSelector = selector({
    key: 'getApiState',
    get: async ({ get }) => {
        try {
            const keyword = get(addKeywordState);
            const response = await axios(
                `https://api.github.com/search/repositories?q=${keyword}`
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
});