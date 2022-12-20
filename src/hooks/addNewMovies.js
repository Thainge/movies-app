// Fetch movie data
const fetchRequest = async (array) => {
    let parsedMovieStrings = [];
    array.forEach((item, index) => {
        // If it is a movie file process it
        if (item.includes('mkv') || item.includes('mp4')) {
            let Name;
            let Date;

            Name = item.split('.')[0].split('(')[0];
            Date = item.split('.')[0].replace(/\D+/g, '');
            let trimmedName = Name.replace(/\s+$/, '');
            let trimmedDate = Date.replace(/\s+$/, '');
            let newData = {
                name: trimmedName,
                date: trimmedDate,
            }
            if (trimmedDate.length > 3) {
                parsedMovieStrings.push(newData)
            }
        }
    });

    let FinishedData = [];
    for (let i = 0; i < parsedMovieStrings.length; i++) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${parsedMovieStrings[i].name}&api_key=a3dbbc2d7d1c0929ba88f4887b98b5ca`);
            const data = await response.json();
            let newData = data.results.filter(Item => Item.release_date.includes(parsedMovieStrings[i].date));
            if (newData.length !== 1) {
                newData = data.results.filter(Item => Item.title === parsedMovieStrings[i].name && Item.release_date.includes(parsedMovieStrings[i].date));
            }
            const IMDBdata = await getIMDBdata(newData[0].id);
            let tempData = newData[0];
            tempData = { ...tempData, IMDBdata: IMDBdata }
            FinishedData.push(tempData);
        }
        catch (err) {
            console.log(parsedMovieStrings[i].name);
        }
    }
    return FinishedData;
}

async function getIMDBdata(id) {
    let IMDBdata = [];
    try {
        const getImdbid = await fetch(`https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=a3dbbc2d7d1c0929ba88f4887b98b5ca`);
        const imdbData = await getImdbid.json();
        const response = await fetch(`https://imdb-api.com/en/API/Title/k_vcyqkw6f/${imdbData.imdb_id}`);
        const data = await response.json();
        IMDBdata = {
            rating: data.imDbRating,
            runtime: data.runtimeStr,
        }
        return IMDBdata;
    }
    catch (err) {
        console.log('error fetching IMDB data')
    }
}

export default fetchRequest;