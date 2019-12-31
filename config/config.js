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
    dburl = 'mongodb+srv://admin:V9myHZz3H8YtJWtb@clusterdemo-zpuis.mongodb.net/Jedi'
}

process.env.DBURL = dburl;