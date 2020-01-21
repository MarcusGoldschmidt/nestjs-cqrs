import * as React from 'react';
import {
    Document,
    Head,
    Main,
} from '@react-ssr/nestjs-express';

export default class extends Document {
    render() {
        return (
            <html lang='en'>
            <Head>
                <title>React TOP TOP</title>
                <meta charSet='utf-8'/>
                <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width'/>
                <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
                <link rel='shortcut icon' href='/favicon.ico'/>
            </Head>
            <body>
            <Main/>
            </body>
            </html>
        );
    }
}
