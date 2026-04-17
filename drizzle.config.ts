import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// This explicitly tells Drizzle Kit to load your .env.local file ONLY
dotenv.config({ path: ".env.local" });

export default defineConfig({
  out: "./drizzle",
  schema: "./utils/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
