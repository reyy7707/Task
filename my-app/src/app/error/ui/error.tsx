import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/users');
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100 text-gray-800">
            <h1 className="text-6xl font-bold mb-4">Упс... 404</h1>
            <p className="text-2xl mb-2">Страница не найдена</p>
            <p className="text-lg mb-6 text-gray-600">Возможно, вы перешли по неправильной ссылке.</p>
            <button
                onClick={handleGoHome}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300"
            >
                Вернуться на главную
            </button>
        </div>
    );
};

export default Error;
