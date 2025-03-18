/**
 * This script sets up the basic directory structure for a Remix project
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define directories to be created
const directories = [
    'app',
    'app/routes',
    'app/styles',
    'public',
    'public/build'
];

// Create directories if they don't exist
directories.forEach(dir => {
    const fullPath = path.join(__dirname, dir);
    if (!fs.existsSync(fullPath)) {
        console.log(`Creating directory: ${dir}`);
        fs.mkdirSync(fullPath, { recursive: true });
    }
});

// Create a simple entry.server.tsx file if it doesn't exist
const entryServerPath = path.join(__dirname, 'app', 'entry.server.tsx');
if (!fs.existsSync(entryServerPath)) {
    console.log('Creating entry.server.tsx');
    const entryServerContent = `
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import type { EntryContext } from "@remix-run/node";

const ABORT_DELAY = 5_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const callbackName = isbot(request.headers.get("user-agent"))
    ? "onAllReady"
    : "onShellReady";

  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
      />,
      {
        [callbackName]: () => {
          const body = new PassThrough();
          
          responseHeaders.set("Content-Type", "text/html");
          
          resolve(
            new Response(body, {
              status: didError ? 500 : responseStatusCode,
              headers: responseHeaders,
            })
          );

          pipe(body);
        },
        onShellError(err: unknown) {
          reject(err);
        },
        onError(error: unknown) {
          didError = true;
          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
`;
    fs.writeFileSync(entryServerPath, entryServerContent);
}

// Create a simple entry.client.tsx file if it doesn't exist
const entryClientPath = path.join(__dirname, 'app', 'entry.client.tsx');
if (!fs.existsSync(entryClientPath)) {
    console.log('Creating entry.client.tsx');
    const entryClientContent = `
import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});
`;
    fs.writeFileSync(entryClientPath, entryClientContent);
}

// Install dependencies
console.log('Installing dependencies...');
try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('\nSetup complete! You can now run "npm run dev" to start the development server.');
} catch (error) {
    console.error('Error installing dependencies:', error.message);
    process.exit(1);
}
