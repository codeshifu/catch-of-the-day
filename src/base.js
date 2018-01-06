import Rebase from 're-base';
import keys from './config/keys';
let config = keys;
if (process.env.NODE_ENV === 'production') {
    config = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL
    }
}

export default Rebase.createClass(config)