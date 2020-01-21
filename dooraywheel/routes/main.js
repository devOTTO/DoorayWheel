const Wheel = require('./wheel');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (app) => {
    app.post('/', (req, res) => {     
        console.log(req.body);   
        if (!isValidToken(req.body)) {
            return res.status(403).send();
        }
        
        return Wheel.call(req, res);
    });
};

function isValidToken(body) {
    return body.appToken && body.appToken === process.env.DOORAY_TOKEN;
}