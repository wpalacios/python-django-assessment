export const getAllMovies = (callback) => {

    fetch('movies/')
        .then(res => res.json())
        .then(movies => {
            const displayMovies = movies.map(movie => {
                const m = {
                    fields: {
                        ...movie.fields,
                        rating: parseInt(movie.fields.total_rating) / parseInt(movie.fields.num_of_ratings) || 1
                    },
                    pk: movie.pk
                }
                console.log(m)
                return m;
            })
            callback(displayMovies)
        
        });

} 