const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-700 to-sky-300 flex items-center justify-center px-4 py-8">
            <div className="max-w-4xl bg-white bg-opacity-90 rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-semibold text-indigo-800 text-center mb-8">Creators of Bracketology</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Person 1 */}
                    <div className="text-center">
                        <img 
                            src="/messi.png" 
                            alt="Creator 1" 
                            className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
                        />
                        <h3 className="font-semibold text-indigo-800">Liam O'Hara</h3>
                        <p className="text-gray-600">Professional Internship Rejection Getter</p>
                    </div>

                    {/* Person 2 */}
                    <div className="text-center">
                        <img 
                            src="https://via.placeholder.com/150" 
                            alt="Creator 2" 
                            className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
                        />
                        <h3 className="font-semibold text-indigo-800">Liam Campbell</h3>
                        <p className="text-gray-600">Master's in Procrastination</p>
                    </div>

                    {/* Person 3 */}
                    <div className="text-center">
                        <img 
                            src="https://via.placeholder.com/150" 
                            alt="Creator 3" 
                            className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
                        />
                        <h3 className="font-semibold text-indigo-800">Jack Dolan</h3>
                        <p className="text-gray-600">N/A</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
