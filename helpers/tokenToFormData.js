export default function (token) {
  // console.warn('token>>> ', token)
  const formData = new FormData()
  formData.append('token', token.replace('Bearer ', ''))

  return formData
}
