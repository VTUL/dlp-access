import { defineConfig } from "cypress";

const apiTestOnly = process.env.CYPRESS_API_TEST_ONLY == "true";
export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl: apiTestOnly ? null : "http://localhost:3000"
  }
});
