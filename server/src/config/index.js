import dotenv from 'dotenv';

dotenv.config()

const config = {
    PORT : process.env.PORT || 3001,
    MONGODB_URL : process.env.MONGODB_URL || "mongodb://localhost:27017/billingnew",
}

export default config