import React from 'react';
import { Formik, Form, Field } from 'formik';
// import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';
import ReactSelect from 'react-select';

const castOptions = [
    { value: "A.C. Abadie", label: "A.C. Abadie" },
    { value: "Gilbert M. 'Broncho Billy' Anderson", label: "Gilbert M. 'Broncho Billy' Anderson" },
    { value: "George Barnes", label: "George Barnes" },
    { value: "Justus D. Barnes", label: "Justus D. Barnes" }
];
const data = {
    "_id": {
        "$oid": "573a1390f29313caabcd42e8"
    },
    "plot": "A group of bandits stage a brazen train hold-up, only to find a determined posse hot on their heels.",
    "genres": [
        "Short",
        "Western"
    ],
    "runtime": 11,
    "cast": [
        "A.C. Abadie",
        "Gilbert M. 'Broncho Billy' Anderson",
        "George Barnes",
        "Justus D. Barnes"
    ],
    "poster": "https://m.media-amazon.com/images/M/MV5BMTU3NjE5NzYtYTYyNS00MDVmLWIwYjgtMmYwYWIxZDYyNzU2XkEyXkFqcGdeQXVyNzQzNzQxNzI@._V1_SY1000_SX677_AL_.jpg",
    "title": "The Great Train Robbery",
    "fullplot": "Among the earliest existing films in American cinema - notable as the first film that presented a narrative story to tell - it depicts a group of cowboy outlaws who hold up a train and rob the passengers. They are then pursued by a Sheriff's posse. Several scenes have color included - all hand tinted.",
    "languages": [
        "English"
    ],
    "released": {
        "$date": {
            "$numberLong": "-2085523200000"
        }
    },
    "directors": [
        "Edwin S. Porter"
    ],
    "rated": "TV-G",
    "awards": {
        "wins": 1,
        "nominations": 0,
        "text": "1 win."
    },
    "lastupdated": "2015-08-13 00:27:59.177000000",
    "year": 1903,
    "imdb": {
        "rating": 7.4,
        "votes": 9847,
        "id": 439
    },
    "countries": [
        "USA"
    ],
    "type": "movie",
    "tomatoes": {
        "viewer": {
            "rating": 3.7,
            "numReviews": 2559,
            "meter": 75
        },
        "fresh": 6,
        "critic": {
            "rating": 7.6,
            "numReviews": 6,
            "meter": 100
        },
        "rotten": 0,
        "lastUpdated": {
            "$date": "2015-08-08T19:16:10.000Z"
        }
    },
    "num_mflix_comments": 0
}
const initialValues = {
    plot: '',
    title: '',
    cast: ''
}
const onSubmit = (values) => {
    console.log('values', values)
}



const EditMovieForm = () => {

    return (
        // <Formik
        //     initialValues={initialValues}
        //     onSubmit={onSubmit}
        // >
        //     {({ values, setFieldValue }) => (
        //         <Form >
        //             <div className={''}>
        //                 <label htmlFor="title">Title</label>
        //                 <Field type="text" name="title" />
        //             </div>
        //             <div >
        //                 <label htmlFor="plot">Plot</label>
        //                 <Field as="textarea" name="plot" rows={4} />
        //             </div>
        //             <div className={''}>
        //                 <label htmlFor="cast">Cast</label>
        //                 <ReactSelect
        //                     options={castOptions}
        //                     isMulti
        //                     value={values.cast}
        //                     onChange={(selectedOptions) => setFieldValue('cast', selectedOptions)}
        //                 />
        //             </div>
        //             <button
        //                 type="submit"
        //                 variant="contained"
        //                 color="primary"
        //                 className={''}
        //             >
        //                 Submit
        //             </button>
        //         </Form>
        //     )}
        // </Formik>
        <h1>sdfgs</h1>
    );
};

export default EditMovieForm;
