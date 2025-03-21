import { LinksFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import { ToastProvider } from '~/context/ToastContext';
import { ShopProvider } from './context/ShopContext';
import styles from "./tailwind.css";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
];

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <ShopProvider>
                    <ToastProvider>
                        <Outlet />
                    </ToastProvider>
                </ShopProvider>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

export function ErrorBoundary() {
    return (
        <html>
            <head>
                <title>Oops!</title>
                <Meta />
                <Links />
            </head>
            <body>
                <div className="error-container">
                    <h1>Something went wrong</h1>
                    <p>There was an error loading this page</p>
                </div>
                <Scripts />
            </body>
        </html>
    );
}
