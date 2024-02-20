const express = require('express');
const bodyParser = require('body-parser');

const connection = require('./config/DatabaseConfig')

const equipeRouter = require('./routes/EquipeRouter')
const clubRouter = require('./routes/ClubRouter')
const membreRouter = require('./routes/MembreRouter')
const participantRouter = require('./routes/ParticipantRouter')
const evenementrouter = require('./routes/EvenementRouter')

const tacherouter = require('./routes/TacheRouter')
const typerouter = require('./routes/TypeRouter')
const staderouter = require('./routes/StadeRouter')
const adversairerouter = require('./routes/AdversaireRouter')
const paymentrouter = require('./routes/PaymentRouter')
const depansesrouter = require('./routes/DepansesRouter')


const statistiquerouter = require('./routes/StatistiqueRouter')
const composrouter = require('./routes/ComposRouter')
const remplacantrouter = require('./routes/RemplacantRouter')

const notificationRouter = require("./routes/PushNotificationRoute");


















const equipeModel = require('./models/equipe.model');


connection.getConnections();

const app = express();

// for cors origin config
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/equipes', equipeRouter);
app.use('/api/clubs', clubRouter);
app.use('/api/membres', membreRouter);
app.use('/api/participants', participantRouter);
app.use('/api/evenements', evenementrouter);
app.use('/api/taches', tacherouter);
app.use('/api/types', typerouter);
app.use('/api/stades', staderouter);
app.use('/api/adversaires', adversairerouter);
app.use('/api/payments', paymentrouter);
app.use('/api/depanses', depansesrouter);
app.use('/api/statistiques', statistiquerouter);
app.use('/api/compos', composrouter);
app.use('/api/remplacants', remplacantrouter);

app.use("/api/notifications", notificationRouter);












module.exports = app;