const LogOutButton = ({ setUser }) => {
  const handleLogOut = () => {
    setUser({})
    window.localStorage.removeItem('user')
  }

  return <button onClick={handleLogOut}>LogOut</button>
}

export default LogOutButton
