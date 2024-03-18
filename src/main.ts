import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import 'remixicon/fonts/remixicon.css';
import 'sixponents';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
