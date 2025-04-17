import { Routes, Route, Navigate } from "react-router-dom"
import { UsersPage } from "../pages/users-page"
import { UserPage } from "../pages/user-page"
import { Error } from "./error"

const App = () => {
  return (
    <>
      <Routes>
        {/* Перенаправление на страницу пользователей */}
        <Route path="/" element={<Navigate to="/users" replace />} />
        {/* Страница всех пользователей */}
        <Route path="/users" element={<UsersPage />} />
        {/* Страница одного пользователя */}
        <Route path="/user/:id" element={<UserPage />} />
        {/* Страница ошибки */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  )
}

export default App