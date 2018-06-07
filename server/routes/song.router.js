const express = require('express');
const router = express.Router();

// _______________NEW PG_____________

//two dots to go up a directory, FOR A DOUBLE DOSE OF DIRECTORY MOVEMENT

const pool = require('../modules/pool');



router.get('/', (req, res) => {
    console.log('In song-router GET to read');

    //build a string for the query
    const queryText = 'SELECT * FROM songs';

    //query method on pool
    //keep everything within the .then and .catch
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((err) => {
            console.log('Error Getting all songs', err);
            res.sendStatus(500);
        }); 
});



router.post('/', (req, res) => {
    console.log('In song-router POST to create' , req.body);

    const album = req.body;

    //be sure to use the $#'s for taking data, more secure
    const queryText = `INSERT INTO songs (artist, track, published, rank)
    VALUES ($1, $2, $3, $4)`;

    //Having req.body.artist for your Values inputs makes it so someone else could execute commands

    pool.query(queryText, [album.artist, album.track, album.published, album.rank])
        .then( (result) => {
            console.log('Back from DB', result);
            res.sendStatus(200);
        }).catch( (err) => {
            console.log('Error', err);
        });
});

router.put('/:id', (req, res) => {
    console.log('In song-router PUT to update', req.body);

    const update = req.body;
    const id = req.params.id;
    //use commas to update multiple fields
    let queryText = `UPDATE songs SET rank = $2, artist = $3 WHERE id=$1`;

    pool.query(queryText, [id, update.rank, update.artist])
        .then( (result) => {
            console.log('back from DB with', result);
            res.sendStatus(200);
        }).catch( (err) => {
            console.log('Error', err);
            res.sendStatus(500);
        });
});

//declare id with /:id
router.delete('/:id', (req, res) => {
    console.log('In song-router DELETE to delete');

    const id = req.params.id;

    console.log('In song-router DELETE to delete');
    const queryText = 'DELETE FROM songs WHERE id=$1';

    //Passing two things to the query.
    //1) the queryText
    //2) the values to substitute into the query for $1, $2, etc
    //order is important

    pool.query(queryText, [id]) //this array will take the place of $1, $2, and so on
        .then( (result) => {
            console.log('Success', result);
            res.sendStatus(200);
        }).catch( (err) => {
            console.log('Error', err);
            res.sendStatus(500);
        });
});

//---------------END PG------------

module.exports = router;