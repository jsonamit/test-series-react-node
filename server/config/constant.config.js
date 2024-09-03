const development = {
    WEBBYPASSURL: [
        '/login',
        '/signup'
    ],
    APPBYPASSURL: [
        '/app/user/login',
        '/app/user/signup'
    ],
    WEBPATH: 'http://localhost:3000',
    DEBUGLIST: [
        '319133',
        '319144'
    ]
}

const production = {
    WEBBYPASSURL: [
        '/login',
        '/signup'
    ],
    APPBYPASSURL: [
        '/app/user/login',
        '/app/user/signup'
    ],
    WEBPATH: 'http://localhost:3000', // replace web path here
    DEBUGLIST: []
}

module.exports = process.env.NODE_ENV == 'develpment' ? development
                : process.env.NODE_ENV == 'production' ? production :  development ;