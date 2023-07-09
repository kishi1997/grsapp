type Repo = {
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

export default Repo;