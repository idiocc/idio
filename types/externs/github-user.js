/**
 * @fileoverview
 * @externs
 */
/* typal node_modules/@idio/github/types/user.xml */
/** @const */
var _idio = {}
/**
 * @record
 */
_idio.GithubEmail
/**
 * The email address.
 * @type {string}
 */
_idio.GithubEmail.prototype.email
/**
 * Whether the email was verified.
 * @type {boolean}
 */
_idio.GithubEmail.prototype.verified
/**
 * Whether the email is primary.
 * @type {boolean}
 */
_idio.GithubEmail.prototype.primary
/**
 * Either `public` or `private`.
 * @type {string}
 */
_idio.GithubEmail.prototype.visibility
/**
 * Public user information
 * @typedef {{ email: ?string, emails: !Array<!_idio.GithubEmail>, login: string, id: number, node_id: string, avatar_url: string, gravatar_id: string, url: string, html_url: string, followers_url: string, following_url: string, gists_url: string, starred_url: string, subscriptions_url: string, organizations_url: string, repos_url: string, events_url: string, received_events_url: string, type: string, site_admin: boolean, name: string, company: string, blog: string, location: string, hireable: boolean, bio: string, public_repos: number, public_gists: number, followers: number, following: number, created_at: string, updated_at: string }}
 */
_idio.GithubUser
