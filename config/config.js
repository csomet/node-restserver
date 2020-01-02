/*
    APP PORT
*/
process.env.PORT = process.env.PORT || 3000;


/*
    ENVIRONMENT
*/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


/*
    DB
*/
let dburl;

if ( process.env.NODE_ENV === 'dev') {
    dburl = 'mongodb://localhost:27017/jedi'
} else {
    dburl = process.env.MONGO_URI
}

process.env.DBURL = dburl;


/*
    TOKEN EXPIRY
*/
process.env.TOKEN_EXPIRY = 60 * 60 * 60;


/*
    AUTH SIGNATURE
*/
process.env.TOKEN_SIGN =  process.env.TOKEN_SIGN || 'this-is-seed';