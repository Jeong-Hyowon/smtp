const pool = require('../modules/pool');
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
const table = 'user';
const user = {
    auth : async(user_name,user_email) => {
        const fields = 'user_name,user_email';
        const questions = `?,?`;
        const values = [user_name,user_email];
        const query = `INSERT INTO ${table}(${fields}) VALUES (${questions})`;
    
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            // return insertId;
 
                var transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                    user: 'email',
                    pass: 'password'
                }
                }));
                
                var mailOptions = {
                from: 'email',
                to:user_email,
                subject: 'sub',
                html: 'html'
                };
                console.log("useremail :"+user_email);
                transporter.sendMail(mailOptions, function(error){
                if (error) {
                    console.log(error+"email send fail");
                } else {
                    console.log('Email sent: ');
                }
                });  

        } catch (err) {
            if (err.errno == 1062) {
                console.log('signup error: ', err.errno, err.code);
                return -1;
            }
            console.log('signup error: ', err);
            throw err;
        }
    },
    checkUser : async (user_email) => {
        const query = `SELECT user_idx FROM ${table} where user_email="${user_email}"`;
        try {
            const result = await pool.queryParamArr(query);

            return result[0];

        } catch (err) {
            console.log('checkUser error: ', err);
            throw err;
        }
    }
}

module.exports = user;