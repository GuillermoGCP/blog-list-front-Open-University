import LogOutButton from './LogOutButton'

const User = ({ user, setUser }) => (
  <div>
    <p>{`${user.username} logged in`}</p>
    <LogOutButton setUser={setUser} />
  </div>
)

export default User
