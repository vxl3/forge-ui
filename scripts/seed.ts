import { seedIfNeeded } from "../lib/seed/run"

seedIfNeeded().then(() => {
  console.log("Done")
  process.exit(0)
})
