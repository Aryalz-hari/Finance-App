import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from './schema'
const sql = neon(
  "postgresql://neondb_owner:npg_FkcEKdQC32LY@ep-solitary-butterfly-an09jzev.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require",
);

export const db = drizzle(sql ,{schema});

