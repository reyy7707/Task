import { useNavigate } from "react-router-dom";
import { User } from "../../../features/user"

const UserPage = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="relative w-full mb-6">
                <button
                    onClick={() => navigate('/users')}
                    className="absolute left-4 sm:left-10 py-2 px-4 bg-blue-500 hover:bg-blue-700 transition duration-300 rounded-lg text-white text-sm sm:text-base"
                >
                    На главную
                </button>
            </div>

            <User />
        </>
    )
}

export default UserPage