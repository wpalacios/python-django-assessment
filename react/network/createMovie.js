
export const createMovie = (movie, callback) => {
    // const route = 'movies/create?title=Title&year=2020&rated=PG&released_on=2020-04-20&genre=Action';

    let missing = [];
    if (movie.title === undefined) missing.push('title');
    //if (movie.year  === undefined) missing.push('year');
    if (movie.rated === undefined) missing.push('rated');
    if (movie.released_on === undefined) missing.push('released_on');
    if (movie.genre === undefined) missing.push('genre');
    if (missing.length !== 0) {
        callback({
            success: false,
            error: {
                type: 'Validation',
                missing
            },
        })
    }

    let year = movie.released_on.split('-')[0]; // depends on YYYY-MM-DD which is might be validated currently...
    let route = 'movies/create?' +
        `title=${movie.title}&` +
        `year=${year}&` + 
        `rated=${movie.rated}&` + 
        `released_on=${movie.released_on}&` +
        `genre=${movie.genre}`;
    
    route = route.split(' ').join('+')
    console.log(route)
    fetch(route)
        .then(res => res.json())
        .then(json => callback(json));

}



// 