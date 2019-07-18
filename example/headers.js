export default headers => Object.entries(headers).map(([s, v]) => {
  console.error('%s: %s', s.replace(/-/g, ' ').split(' ').map(a => {
    const [b, ...c] = a
    if (b) return [b.toUpperCase(), ...c].join('')
    // if (a[0]) a[0] = a[0].toUpperCase()
    return a
  }).join('-'), v)
})