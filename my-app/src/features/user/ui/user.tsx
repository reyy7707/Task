import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserSchema } from '../../users/model/types/ui/users-types';

const User = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<UserSchema | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [popapState, setPopapState] = useState<boolean>(false);

    const onHandleOpenPopap = () => {
        setPopapState(prevState => !prevState);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get<UserSchema>(`https://jsonplaceholder.typicode.com/users/${id}`);
                setUser(response.data);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError('Ошибка при загрузке данных пользователя');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) return <div className="flex justify-center items-center h-screen text-2xl">Загрузка...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-2xl text-red-500">{error}</div>;

    if (!user) return null;

    return (
        <>
            <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-white to-gray-100 shadow-2xl rounded-3xl mt-12 animate-fade-in">
                <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-600 mb-6 shadow-md">
                        {user.name.charAt(0)}
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{user.name}</h1>
                    <p className="text-gray-500 text-lg mb-6">@{user.username}</p>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-lg font-medium">{user.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Телефон</p>
                            <p className="text-lg font-medium">{user.phone}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Веб-сайт</p>
                            <a
                                href={`http://${user.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg font-medium text-blue-600 hover:underline"
                            >
                                {user.website}
                            </a>
                        </div>
                        <div onClick={onHandleOpenPopap} className='cursor-pointer'>
                            {popapState ?
                                <>
                                    <p className="text-sm text-gray-500">Почтовый индекс города</p>
                                    <p className="text-lg font-medium">{user.address.zipcode}</p>
                                </>
                                :
                                <>
                                    <p className="text-sm text-gray-500">Город</p>
                                    <p className="text-lg font-medium">{user.address.city}</p>
                                </>
                            }

                        </div>
                        <div className="sm:col-span-2">
                            <p className="text-sm text-gray-500">Адрес</p>
                            <p className="text-lg font-medium">{user.address.street}, {user.address.suite}</p>
                        </div>
                        <div className="sm:col-span-2">
                            <p className="text-sm text-gray-500">Компания</p>
                            <p className="text-lg font-medium">{user.company.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default User;
