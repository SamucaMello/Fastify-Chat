import { configDotenv } from "dotenv"; configDotenv({quiet: true});

const environment = process.env;

const create_database_url = () => `postgresql://${environment.POSTGRES_USER}:${environment.POSTGRES_PASSWORD}@db:5432/${environment.POSTGRES_DB}`


export const DATABASE_URL = create_database_url()
export const PORT         = environment.PORT ?? 3000



