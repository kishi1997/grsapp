import { atom } from 'recoil';

// ページの先頭に表示するリポジトリの状態管理
export const itemsOffsetState = atom({
  key: 'itemsOffsetState',
  default: 0,
});