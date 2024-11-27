const checkLocalStorage = () => () => {
  const userData =
    typeof window !== 'undefined' ? localStorage.getItem('user') : null
  return userData ? JSON.parse(userData) : {}
}
export default checkLocalStorage
