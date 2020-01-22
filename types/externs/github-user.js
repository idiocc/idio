/**
 * @fileoverview
 * @externs
 */
/* typal node_modules/@idio/github/types/user.xml */
/**
 * @typedef {Object} GithubEmail `＠record`
 * @prop {string} email The email address.
 * @prop {boolean} verified Whether the email was verified.
 * @prop {boolean} primary Whether the email is primary.
 * @prop {string} visibility Either `public` or `private`.
 * @typedef {Object} GithubUser Public user information
 * @prop {?string} email Publicly visible email address. `octocat＠github.com` or `null`.
 * @prop {!Array<!_idio.GithubEmail>} emails All email addresses accessible if the `user:email` scope was requested.
 * @prop {string} login `octocat`
 * @prop {number} id 1
 * @prop {string} node_id `MDQ6VXNlcjE=`
 * @prop {string} avatar_url `https://github.com/images/error/octocat_happy.gif`
 * @prop {string} gravatar_id ``
 * @prop {string} url `https://api.github.com/users/octocat`
 * @prop {string} html_url `https://github.com/octocat`
 * @prop {string} followers_url `https://api.github.com/users/octocat/followers`
 * @prop {string} following_url `https://api.github.com/users/octocat/following{/other_user}`
 * @prop {string} gists_url `https://api.github.com/users/octocat/gists{/gist_id}`
 * @prop {string} starred_url `https://api.github.com/users/octocat/starred{/owner}{/repo}`
 * @prop {string} subscriptions_url `https://api.github.com/users/octocat/subscriptions`
 * @prop {string} organizations_url `https://api.github.com/users/octocat/orgs`
 * @prop {string} repos_url `https://api.github.com/users/octocat/repos`
 * @prop {string} events_url `https://api.github.com/users/octocat/events{/privacy}`
 * @prop {string} received_events_url `https://api.github.com/users/octocat/received_events`
 * @prop {string} type `User`
 * @prop {boolean} site_admin false
 * @prop {string} name `monalisa octocat`
 * @prop {string} company `GitHub`
 * @prop {string} blog `https://github.com/blog`
 * @prop {string} location `San Francisco`
 * @prop {boolean} hireable false
 * @prop {string} bio `There once was...`
 * @prop {number} public_repos 2
 * @prop {number} public_gists 1
 * @prop {number} followers 20
 * @prop {number} following 0
 * @prop {string} created_at `2008-01-14T04:33:35Z`
 * @prop {string} updated_at `2008-01-14T04:33:35Z`
 */
