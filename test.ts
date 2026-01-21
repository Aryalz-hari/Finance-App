import { connectDB } from "./lib/mongodb"; // ✅ correct relative path

async function test() {
  await connectDB();
  console.log("✅ MongoDB connected successfully!");
}

test();
