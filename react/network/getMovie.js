export const getMovie = (pk, callback) => {

    fetch(`movies/${pk}`)
        .then(res => res.json())
        .then(json => callback(json[0]));

}