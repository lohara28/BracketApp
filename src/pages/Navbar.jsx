const Navbar = () => {
    
    return (
        <nav className="bg-cyan-700 text-white p-4 border-b-4 border-cyan-900">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold font-serif">
                    Bracketology
                </div>

                {/* Navigation Links */}
                <div className="space-x-4 hidden md:flex font-serif">
                    <a href="/home" className="hover:underline">Home</a>
                    <a href="/my-brackets" className="hover:underline">My Brackets</a>
                    <a href="/create" className="hover:underline">Create</a>
                    <a href="/about" className="hover:underline">About</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;