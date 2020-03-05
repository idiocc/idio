import github from '@idio/github'

/**
 * GitHub OAuth.
 * @param {!_goa.Application} app
 * @param {!Object} _
 * @param {_idio.GitHubOptions} options
 * @param {!_idio.ConfiguredMiddleware} acc
 */
export default function setupGithub(app, _, options, acc) {
  if (!acc.session) throw new Error('You need to configure session before GitHub middleware.')
  let { path, paths, redirectPath, scope, ...rest } = options
  if (paths && !redirectPath) throw new Error('When giving multiple paths, the redirect path is also required.')
  if (!paths) paths = { [path]: scope }
  Object.entries(paths).forEach(([p, s]) => {
    github(app, {
      path: p,
      scope: s,
      redirectPath,
      ...rest,
      session: acc.session,
    })
  })
}
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../../types/options').GitHubOptions} _idio.GitHubOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../..').ConfiguredMiddleware} _idio.ConfiguredMiddleware
 */