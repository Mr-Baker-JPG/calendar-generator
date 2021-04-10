import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  testEnvironment: "jest-environment-node",
  transform: {},
  displayName: "TESTING",
  roots: [path.join(__dirname, "./src")],
  rootDir: path.join(__dirname, ".."),
  testMatch: ["**/__tests__/*.spec.*"],
  moduleDirectories: [
    "node_modules",
    __dirname,
    path.join(__dirname, "../src"),
  ],
  coverageDirectory: path.join(__dirname, "/coverage"),
  collectCoverageFrom: ["**/src/**/*.*js"],
  coveragePathIgnorePatterns: [".*/__tests__/.*"],
  watchPlugins: [],
}
