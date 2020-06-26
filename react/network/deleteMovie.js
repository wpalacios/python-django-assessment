export const deleteMovie = (pk, callback) => {

    fetch(`movies/delete/${pk}`)
        .then(res => res.json())
        .then(json => callback(json));

} 