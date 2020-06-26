
export const updateMovie = (movie, callback) => {
    //const route = 'movies/create?title=Title&year=2020&rated=PG&released_on=2020-04-20&genre=Action';
    let queryString = [];
    Object.entries(movie).forEach(entry => {
        if ((entry[0] !== 'movie' && entry[0] !== 'isShowingModal') && entry[0] !== 'pk') {
            if (entry[1] !== '' && entry[1] !== null) {
                queryString.push(`${entry[0]}=${entry[1]}`);
            }
        }
    });

    const qStr = queryString.join('&').trim().split(' ').join('+');

    fetch(`movies/update/${movie.pk}?${qStr}`)
        .then(res => res.json())
        .then(data => callback(data));

}
