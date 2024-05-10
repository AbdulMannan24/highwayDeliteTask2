import { Pool, Client } from 'pg'

// export const db = new Client({
//   user: 'ma24042000',
//   password: process.env.POSTGRESQL_PASS,
//   host: 'ep-winter-thunder-17348528.us-east-2.aws.neon.tech',
//   database: 'NotesDB',
//   port: 5432, 
//   ssl: {
//     rejectUnauthorized: true 
//   }
// });
export const db = new Client({
  "user": "postgresdb_nq1x_user",
  "password": "5mtOnpzd7djNKlfCrcoUmhBScklGThwG",
  "host": "dpg-cneltb8l6cac73cobrpg-a.oregon-postgres.render.com",
  "port": 5432, // Assuming default port
  "database": "postgresdb_nq1x",
  "ssl": true
})

export async function connectDB() {
  try {
    await db.connect();
    console.log('Connected to PostgreSQL database');
  } catch (error) {
    console.log('Error connecting to PostgreSQL:', error);
  }
}

