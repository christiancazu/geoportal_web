export default function (token) {
  const formData = new FormData()
  formData.append('token', token.replace('Bearer ', ''))

  return formData
}
