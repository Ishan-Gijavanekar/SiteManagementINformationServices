import mongoose from 'mongoose'


const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongo Db connected to host: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error in database connection, `, error)
    }
}

export {connectDb}