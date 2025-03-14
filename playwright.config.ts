import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', 
});

module.exports = {
  use: {
    headless: false,
  },
};