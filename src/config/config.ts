import { configDotenv } from "dotenv"; configDotenv({quiet: true});

const environment = process.env;

const create_database_url = () => {
    const host = process.argv.includes("--dev") ? "localhost" : "db"
    
    return `postgresql://${environment.POSTGRES_USER}:${environment.POSTGRES_PASSWORD}@${host}:5432/${environment.POSTGRES_DB}`
}


export const DATABASE_URL = create_database_url()
export const PORT         = Number(environment.PORT) ?? 3000



