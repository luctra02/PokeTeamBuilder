import { defineConfig } from "cypress";
import { connect, disconnect } from './cypress/support/db';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/project2/',
    setupNodeEvents(on, config) {
      on('task', {
        async clearDB() {
          const teamID = "testID"
          const db = await connect();
          const teams = db.collection('teams');
          await teams.deleteOne({ id: teamID });
          await teams.dropIndexes();
          await disconnect();
          return null;
        }
      });
    },
  },
});

