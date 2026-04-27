function Experiences() {
    return (
        <div className="bg-black text-white p-10 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Experiences</h1>

            <div className="grid md:grid-cols-2 gap-6">
                {/* IMAX */}
                <div className="relative">
                    <img
                        src="https://th.bing.com/th/id/R.2c57a0ed4824b191de6271c76cc9349b?rik=aC6T8UVKNqhkrg&riu=http%3a%2f%2f109cinemas.net%2fimg%2fimax%2fabout%2ftheatres_28.jpg&ehk=U7fw3UIg88iUFRpyUyKEEsZc45b7diW65n8gxgej%2f20%3d&risl=&pid=ImgRaw&r=0"
                        className="w-full h-[300px] object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 p-6 bg-black/60 w-full">
                        <h2 className="text-xl font-bold">IMAX WITH LASER</h2>
                        <p className="text-sm text-gray-300">Experience at WD15 Cinemas</p>
                    </div>
                </div>

                {/* Dolby */}
                <div className="relative">
                    <img
                        src="https://scopecinemas-v2.s3.amazonaws.com/images/1764910526256_dolby-atmos.jpg"
                        className="w-full h-[300px] object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 p-6 bg-black/60 w-full">
                        <h2 className="text-xl font-bold">DOLBY ATMOS</h2>
                        <p className="text-sm text-gray-300">Premium sound experience</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Experiences;