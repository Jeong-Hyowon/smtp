const pool = require('../modules/pool');
const table = 'user';

const input = {
    answer1 : async (user_email, randomString) => {
        const query = `SELECT * FROM ${table} where user_email="${user_email}"`;
    
        try {
            const result = await pool.queryParamArr(query);
            console.log(randomString);
            if (randomString===`12345` ){
                return true;
            } else{
                return false;
            }

        } catch (err) {
            console.log('randomString error: ', err);
            throw err;
        }
    }}

module.exports = input;