import { spawn } from 'child_process';

/**
 * Wrap command with child_process
 */
export default command => new Promise((resolve, reject) => {
  const robocopy = spawn(
    command.path || process.cwd(),
    command.args,
    {
      windowsVerbatimArguments: true,
      stdio: ['ignore', 'pipe', process.stderr],
    },
  );

  let stdout = '';

  robocopy.stdout.on('data', (data) => {
    stdout += data;
  });

  robocopy.on('error', (err) => {
    reject(err);
  });

  robocopy.on('exit', (code, signal) => {
    if (code > 8) {
      const message = `Robocopy failed with (${code}), signal: ${signal}`;

      reject(new Error(message));
    }

    resolve(stdout.trim());
  });
});
