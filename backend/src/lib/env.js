import "dotenv/config";

export const ENV = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    CLIENT_URL: process.env.CLIENT_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME
}

// PORT=3001
// MONGO_URI=mongodb+srv://pankajshinde2434_db_user:hZ12XvLfmQeA3rfr@cluster0.zrhwnzk.mongodb.net/chatify_db?appName=Cluster0
// NODE_ENV=development
// JWT_SECRET=myjwtsecret

// RESEND_API_KEY=re_Yd7B737B_5b4UQT4CSQ6w9pGYfhUPorbj

// EMAIL_FROM=onboarding@resend.dev
// EMAIL_FROM_NAME=Pankaj Shinde

// CLIENT_URL=http://localhost:5173/