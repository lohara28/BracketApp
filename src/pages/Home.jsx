const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-700 to-sky-300 flex items-center justify-center px-4">
            <div className="text-center max-w-xl bg-white bg-opacity-80 backdrop-blur-md rounded-2xl p-10 shadow-2xl">
                <h1 className="text-4xl font-bold text-indigo-800 mb-4">🏆 Welcome to Bracketology</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Create,  customize, and share your own tournament brackets. Whether it's March Madness, World Cup, or anything else — we've got you covered.
                </p>
                <a 
                    href="/create" 
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                >
                    Create Your Bracket
                </a>
            </div>
        </div>
    );
};

export default Home;
