import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserSchema } from '../../types/ui/users-types';
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const UsersList = () => {
  const [users, setUsers] = useState<UserSchema[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<UserSchema[]>(`${apiUrl}/users`);
        setUsers(response.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Ошибка загрузки пользователей');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex justify-center items-center h-screen text-2xl">Загрузка...</div>;
  if (error) return <p className="text-center text-red-500 text-2xl mt-10">{error}</p>;

  return (
    <div className="p-5">

      {/* Поиск */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Поиск по имени..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* Результаты поиска */}
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {filteredUsers.map(user => (
            <Link key={user.id} to={`/user/${user.id}`}>
              <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-white to-gray-100 shadow rounded-3xl animate-fade-in">
                <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Город:</span> {user.address.city}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">Пользователи не найдены</p>
      )}
    </div>
  );
};

export default UsersList;
