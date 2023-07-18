import { selector, useRecoilState, useRecoilValue } from 'recoil';
import { itemsOffsetState } from '../atoms/itemsOffsetState';
import { searchResultState } from '../atoms/searchResultState';

export const currentReposSelector = selector({
  key: 'currentReposSelector',
  get: ({ get }) => {
    const itemsPerPage = 5;
    // ページの先頭に表示するリポジトリ
    const itemsOffset = get(itemsOffsetState);
    // ページの最後に表示するリポジトリ
    const endOffset = itemsOffset + itemsPerPage;
    // 検索結果に該当するリポジトリ
    const repos = get(searchResultState); 
    return repos.slice(itemsOffset, endOffset);
  },
});