import 'dotenv/config';
import app from './src/app.js';

const START_PORT = parseInt(process.env.PORT, 10) || 5000;

async function start() {
  let port = START_PORT;
  const maxAttempts = 5;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      await new Promise((resolve, reject) => {
        const server = app.listen(port, () => {
          console.log(`Server running on port ${port}`);
          resolve();
        });
        server.on('error', (err) => reject(err));
      });
      return;
    } catch (err) {
      if (err && err.code === 'EADDRINUSE') {
        console.warn(`Port ${port} in use, trying ${port + 1}`);
        port += 1;
        continue;
      }
      console.error('Failed to start server', err && err.message ? err.message : err);
      process.exit(1);
    }
  }
  console.warn(`Could not bind to any port in range ${START_PORT}-${port}, falling back to ephemeral port`);
  // Start on an ephemeral port assigned by the OS
  const server = app.listen(0, () => {
    const assigned = server.address() && server.address().port;
    console.log(`Server running on ephemeral port ${assigned}`);
  });
}

start();
