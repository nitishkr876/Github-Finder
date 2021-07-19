class Github {
  constructor() {
    this.client_id = 'da819f8fb0e8758ae37d';
    this.client_secret = 'ee220070e7656d20529a8fea987a02a664e61d65';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  async getUser(user) {
    const profileResponse = await fetch
    (`https://api.github.com/users/${user}?client_id=${this.client_id}
    &client_secret=${this.client_secret}`);
    const profile = await profileResponse.json();
    console.log("DATA", profile, profileResponse);

    let repoResponse;
    if(profileResponse.status === 200) {
      repoResponse = await fetch
      (`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}
      &sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
    }

    if(profileResponse.status === 403) {
      return {
        profile,
        repos: {}
      }
    }

    const repos = await repoResponse.json();

    return {
      profile,
      repos
    }
  }
}