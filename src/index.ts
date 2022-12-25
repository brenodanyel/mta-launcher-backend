import 'dotenv/config';
import { App } from './server';

import { factory as serverInfo } from './use-cases/server-info/server-info.factory';
import { factory as pulse } from './use-cases/pulse/pulse.factory';
import { factory as auth } from './use-cases/auth/auth.factory';
import { factory as temp } from './use-cases/temp/temp.factory';
import { factory as products } from './use-cases/products';

const app = new App();
app.addRoute('/server-info', serverInfo());
app.addRoute('/pulse', pulse());
app.addRoute('/auth', auth());
app.addRoute('/temp', temp());
app.addRoute('/products', products());

const { SERVER_PORT = 3000 } = process.env;
app.listen(Number(SERVER_PORT));
