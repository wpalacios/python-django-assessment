export const getMovie = (pk, callback) => {

    // I am making this call multiple times because I didn't 
    // have time to setup redux. Normally I would only have 
    // one and I would use redux. 
    fetch(`movies/${pk}`)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            const movie = {
                fields: {
                    ...res[0].fields,
                    rating: parseInt(res[0].fields.total_rating) / parseInt(res[0].fields.num_of_ratings) || 1
                }
            }
            callback(movie);
        });
}