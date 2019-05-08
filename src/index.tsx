import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Loader from './modules/common/components/Loader';
import App from './App';
// import Screenshot from './models/Screenshot';
// import Browser, { eSizeMode, browsers } from './models/Browser';
import './index.css';

declare const acquireVsCodeApi: any;
let vscode: any;

ReactDOM.render(
  <Loader loading={true} />,
  document.getElementById('root') as HTMLElement
);

window.addEventListener('message', evt => {
  if (typeof acquireVsCodeApi === 'function' && !vscode) {
    vscode = acquireVsCodeApi();
  }

  const { error, screenshots, settings } = evt.data; 
  // const screenshots: Screenshot[] = [
  //   new Screenshot(new Browser(browsers[0], 800, 600), 'https://eyesapi.applitools.com/api/sessions/running/data/1555230650_8b95583b-2ba6-4109-9d43-861562b5621c?accessKey=ekvzokSTejkQaWuPdbFZLxZAsyoBOda8v3Mk77iGFzA110'),
  //   new Screenshot(new Browser(browsers[1], 800, 600), 'https://eyesapi.applitools.com/api/sessions/running/data/1555230650_8b95583b-2ba6-4109-9d43-861562b5621c?accessKey=ekvzokSTejkQaWuPdbFZLxZAsyoBOda8v3Mk77iGFzA110'),
  //   new Screenshot(new Browser(browsers[0], 800, 600), 'https://eyesapi.applitools.com/api/sessions/running/data/1555230650_8b95583b-2ba6-4109-9d43-861562b5621c?accessKey=ekvzokSTejkQaWuPdbFZLxZAsyoBOda8v3Mk77iGFzA110'),
  //   new Screenshot(new Browser(browsers[1], 800, 600), 'https://eyesapi.applitools.com/api/sessions/running/data/1555230650_8b95583b-2ba6-4109-9d43-861562b5621c?accessKey=ekvzokSTejkQaWuPdbFZLxZAsyoBOda8v3Mk77iGFzA110'),
  //   new Screenshot(new Browser(browsers[0], 800, 600), 'https://eyesapi.applitools.com/api/sessions/running/data/1555230650_8b95583b-2ba6-4109-9d43-861562b5621c?accessKey=ekvzokSTejkQaWuPdbFZLxZAsyoBOda8v3Mk77iGFzA110'),
  // ];
  // const settings = {
  //   applitoolsUnderTestUrl:'http://www.google.co.il',
  //   applitoolsServerUrl: 'http://www.google.com',
  //   applitoolsAPIKey: '',
  //   applitoolsProxy: undefined,
  //   applitoolsTarget: eSizeMode.Viewport,
  //   applitoolsBrowsers: [
  //     new Browser(browsers[0], 2560, 1440),
  //     new Browser(browsers[1], 2560, 1440)
  //   ]
  // };
    
  ReactDOM.render(
      <App screenshots={screenshots} error={error} settings={settings} vscode={vscode} />,
      document.getElementById('root') as HTMLElement
  );
});
