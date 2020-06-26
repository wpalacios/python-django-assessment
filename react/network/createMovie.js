
export const createMovie = (movie, callback) => {
    //const route = 'movies/create?title=Title&year=2020&rated=PG&released_on=2020-04-20&genre=Action';
    let missing = [];
    if (movie.title === undefined) missing.push('title');
    if (movie.year  === undefined) missing.push('year');
    if (movie.rated === undefined) missing.push('rated');
    if (movie.released_on === undefined) missing.push('released_on');
    if (movie.genre === undefined) missing.push('genre');
    if (movie.rating === undefined) missing.push('rating');
    if (missing.length !== 0) {
        callback({
            success: false,
            error: {
                type: 'Validation',
                missing
            },
        })
    }
    const route = 'movies/create?' +
        `title=${movie.title}&` +
        `year=${movie.year}&` + 
        `rated=${movie.rated}&` + 
        `released_on=${movie.released_on}&` +
        `genre=${movie.genre}` +
        `rating=${movie.rating}`;

    fetch(route)
        .then(res => {
            console.log(res.status);
        });

}



// 