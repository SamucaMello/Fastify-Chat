import { configDotenv } from "dotenv"; configDotenv({quiet: true});

const environment = process.env;

const create_database_url = () => {
    const user      = environment.POSTGRES_USER
    const password  = environment.POSTGRES_PASSWORD 
    const host      = environment.POSTGRES_HOST
    const db        = environment.POSTGRES_DB
    const port      = environment.POSTGRES_PORT 

    return `postgresql://${user}:${password}@${host}:${port}/${db}`
}


export const DATABASE_URL = create_database_url()
export const PORT         = Number(environment.PORT) ?? 3000



