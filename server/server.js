const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const {middleware} = require('./middleware/middleware');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
    origin : true,
    credentials: true, 
};  

app.use(cors(corsOptions));
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "img-src" : ["'self'","https://*" ,"data:","blob:"],
            "default-src" : ["*","blob:"],
            "object-src" : ["*"],
            "script-src" : ["*","'unsafe-inline'", "'unsafe-eval'"],
            "script-src-elem" : ["*","'unsafe-inline'", "'unsafe-eval'"]
        },
    })
);

app.use(middleware);


const mainRouter = express.Router();
const mainRoutes = require('./routes/index')(mainRouter);
app.use('/app', mainRoutes);

let PORT  = process.env.PORT || 3001;

app.listen(`${PORT}`,()=>{
    console.log(`server running on ${process.env.NODE_ENV} port ${PORT}`);
});

