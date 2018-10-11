export const log10 =
  Math.log10 ||
  function(x) {
    return Math.log(x) * Math.LOG10E
  }

export let _defaultButtonType = 'submit'

export function defaultButtonType(value) {
  if (value) {
    _defaultButtonType = value
  }
  return _defaultButtonType
}
