const sqlClient = require('./sequelizeClient');

async function connectDB() {
    try {
        await sqlClient.authenticate()
        console.log('✅ Connexion to the DB succeded')
    } catch (error) {
        console.log('🚨 Failed to connect to DB')
    }
}

module.exports = connectDB