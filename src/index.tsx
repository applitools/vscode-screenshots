import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { css } from '@emotion/core';
import App from './App';
// import Screenshot from './models/Screenshot';
// import Browser, { eSizeMode, browsers } from './models/Browser';
import './index.css';

declare const acquireVsCodeApi: any;

const ClipLoader = require('react-spinners').ClipLoader;
const override = css`
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
`;

ReactDOM.render(
  <ClipLoader
    css={override}
    sizeUnit={"px"}
    size={35}
    color={'#36D7B7'}
    loading={true}
  />,
  document.getElementById('root') as HTMLElement
);

window.addEventListener('message', evt => {
  const { error, screenshots, settings } = evt.data; 
  let vscode;
  if (typeof acquireVsCodeApi === 'function') {
    vscode = acquireVsCodeApi();
  }
  // const screenshots = [
  //   new Screenshot(new Browser(browsers[0], 800, 600), 'https://eyesapi.applitools.com/api/sessions/running/data/1555230650_8b95583b-2ba6-4109-9d43-861562b5621c?accessKey=ekvzokSTejkQaWuPdbFZLxZAsyoBOda8v3Mk77iGFzA110'),
  //   new Screenshot(new Browser(browsers[1], 800, 600), 'https://eyesapi.applitools.com/api/sessions/running/data/1555230650_8b95583b-2ba6-4109-9d43-861562b5621c?accessKey=ekvzokSTejkQaWuPdbFZLxZAsyoBOda8v3Mk77iGFzA110'),
  //   new Screenshot(new Browser(browsers[0], 800, 600), 'https://eyesapi.applitools.com/api/sessions/running/data/1555230650_8b95583b-2ba6-4109-9d43-861562b5621c?accessKey=ekvzokSTejkQaWuPdbFZLxZAsyoBOda8v3Mk77iGFzA110'),
  //   new Screenshot(new Browser(browsers[1], 800, 600), 'https://eyesapi.applitools.com/api/sessions/running/data/1555230650_8b95583b-2ba6-4109-9d43-861562b5621c?accessKey=ekvzokSTejkQaWuPdbFZLxZAsyoBOda8v3Mk77iGFzA110'),
  //   new Screenshot(new Browser(browsers[0], 800, 600), 'https://eyesapi.applitools.com/api/sessions/running/data/1555230650_8b95583b-2ba6-4109-9d43-861562b5621c?accessKey=ekvzokSTejkQaWuPdbFZLxZAsyoBOda8v3Mk77iGFzA110'),
  // ];
  // const settings = {
  //   applitoolsUnderTestUrl:'http://www.google.co.il',
  //   applitoolsServerUrl: 'http://www.google.com',
  //   applitoolsAPIKey: 'ashdjhasdjsad',
  //   applitoolsProxy: undefined,
  //   applitoolsSizeMode: eSizeMode.Viewport
  // }
    
  ReactDOM.render(
      <App screenshots={screenshots} error={error} settings={settings} vscode={vscode} />,
      document.getElementById('root') as HTMLElement
  );
});
