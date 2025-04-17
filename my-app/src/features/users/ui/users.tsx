import { UsersList } from "../model/users-list"


const Users = () => {
  return (
    <>
      <p className="text-3xl text-center font-bold mb-6">Пользователи</p>

      <UsersList />
    </>
  )
}

export default Users