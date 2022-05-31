export const getCurColorMode = () => {
  const body = document.body
  const mode = body.getAttribute('theme-mode')
  return mode ?? 'light'
}
export const switchMode = () => {
  const body = document.body
  const curMode = getCurColorMode()
  const targetMode = curMode === 'light' ? 'dark' : 'light'
  body.setAttribute('theme-mode', targetMode)
}
