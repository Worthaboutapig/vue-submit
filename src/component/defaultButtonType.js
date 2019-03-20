export let _defaultButtonType = 'submit'

export default function defaultButtonType(value) {
  if (value) {
    _defaultButtonType = value
  }
  return _defaultButtonType
}
