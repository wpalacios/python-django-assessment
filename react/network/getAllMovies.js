export const getAllMovies = (callback) => {

    fetch('movies/')
        .then(res => res.json())
        .then(json => callback(json));

} 