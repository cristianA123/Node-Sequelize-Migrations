
const { Sequelize } = require('sequelize');
const { QueryTypes } = require('sequelize');


const db = new Sequelize('node_migrations', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
})

async function prueba() {
    const suma = await db.query('SELECT 1+2 AS result LIMIT 1', {
      type: QueryTypes.SELECT,
    });
    console.log(suma);
}
prueba()



module.exports = db