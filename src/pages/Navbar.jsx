import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContexts';

const Navbar = () => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    
    return (
        <nav className="bg-cyan-700 text-white p-4 border-b-4 border-cyan-900">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold font-serif">
                    Bracketology
                </div>

                {/* Navigation Links */}
                <div className="flex items-center space-x-6">
                    <div className="hidden md:flex space-x-4 font-serif">
                        <Link to="/home" className="hover:underline">Home</Link>
                        <Link to="/my-brackets" className="hover:underline">My Brackets</Link>
                        <Link to="/create" className="hover:underline">Create</Link>
                        <Link to="/about" className="hover:underline">About</Link>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <span className="hidden md:block text-sm">
                            {user?.email}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-serif"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;