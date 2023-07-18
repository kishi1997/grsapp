export type Repo = {
    id: number;
    name: string;
    html_url: string;
    owner: {
        avatar_url: string;
    };
    language: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    open_issues_count: number;
};

// 受け取ったpropsはreposで、複数のrepository情報が格納された配列のため、[]をつける。
export type Repos = {
    repos: Repo[];
    currentRepos: Repo[];
}

// ログインしたユーザーのレポジトリ
export type userRepo = {
    name: string;
    id: number;
    owner: {
        login: string;
    };
};