const functions = require('firebase-functions');
const uuidv5 = require('uuid/v5');

const express = require('express');
const cors = require('cors');

const admin = require('firebase-admin');

admin.initializeApp();

const app = express();
app.use(cors());

exports.addMessage = functions.https.onRequest( async (req, res) => {
    const original = req.query.text;

    const snapshot = await admin.database().ref('/').push({original: original});
    res.redirect(303, snapshot.ref.toString());

})

app.post('/', async (req, res) => {
    try {
            const timestamp = new Date().getTime().toString();
            const body = req.body;
            await admin.database().ref('/test-user').push({
                userId: uuidv5(timestamp, uuidv5.URL),
                firstName: body.firstName,
                lastName: body.lastName,
                birthday: body.birthday,
                age: body.age,
                hobby: body.hobby
            })
            res.status(201).json({status: 'success'})
    } catch (error) {
        res.send('Error Occured')
    }
});
exports.Register = functions.https.onRequest(app)