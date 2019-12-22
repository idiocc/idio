import alamode from 'alamode'

alamode({
  matcher(path) {
    if (/@goa\/goa\/modules/.test(path)) return true
    if (/@goa\/session/.test(path)) return true
    if (/test\/(spec|context|mask)/.test(path)) return true
    if (/src/.test(path)) return true
    if (/\/modules/.test(path)) return true
    if (/node_modules/.test(path)) return false
    return true
  },
  ignoreNodeModules: false,
})