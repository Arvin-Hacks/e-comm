const mongoose = require('mongoose')
console.log('Test')
let conn2 = mongoose.connect('mongodb+srv://arvindakm246:Gs0WehYRdimRBrBS@cluster0.9pr5oya.mongodb.net/sample_mflix')
const movies = new mongoose.Schema({
    fullplot: String,
    imdb: Object,
    year: Number,
    genres: Array,
    metacritic: Number,
    rated: String,
    title: String,
    languages: Array,
    writers: Array,
    tomatoes: Object,
    poster: String,
    num_mflix_comments: Number,
    released: Object,
    awards: Object,
    countries: Array,
    cast: Array,
    directors: Array,
    runtime: Number,
    plot_embedding: Array

},
    {
        timestamps: true
    }
)

const Movies = mongoose.model('movies', movies)






if (conn2) {
    console.log("database 2 Conncted ")
} else {
    console.log("database Connection error")

}



(async function () {
    try {

        // const data=new Movies({countries:['India','USA','Canada']})
        // const res=await data.save()
        // const data = await 
        // Movies.where("runtime").countDocuments()

        const data = await Movies.find({
            $or: [
                { $text: { $search: 'new', $caseSensitive: false } },
            ]
        }, {
            title: 1,
            "imdb.rating":1,
            "imdb.votes":1
        }).limit(10)
        console.log('data', data)


    } catch (error) {
        console.log('test Error', error)
    }
})()


function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const hourStr = hours === 1 ? 'hour' : 'hours';
    const minuteStr = minutes === 1 ? 'minute' : 'minutes';
    const secondStr = remainingSeconds === 1 ? 'second' : 'seconds';

    const parts = [];
    if (hours > 0) {
        parts.push(`${hours} ${hourStr}`);
    }
    if (minutes > 0) {
        parts.push(`${minutes} ${minuteStr}`);
    }
    if (remainingSeconds > 0) {
        parts.push(`${remainingSeconds} ${secondStr}`);
    }

    return parts.join(' ');
}

// Example usage:
const durationInSeconds = 60;
const formattedTime = formatTime(durationInSeconds);
console.log(formattedTime); // Output: "3 hours 25 minutes 45 seconds"
