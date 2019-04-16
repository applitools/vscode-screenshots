import * as React from 'react';
import Browser from 'src/models/Browser';
import Device from 'src/models/Device';
import './browserDetails.css';

interface IProps { 
    browser: Browser | Device
 };

const BrowserDetailsComponent: React.FunctionComponent<IProps> = (props) => {
    const { browser } = props;
    if (browser.type === 'Device') {
        return (
            <div>
                <span>Device name: {browser.deviceName} </span>
                <span>Screen orientation: {browser.screenOrientation} </span>
            </div>
        );
    } else {
        return (
            <div>
                <span>Browser: {browser.name} </span>
                <span>{browser.width}X{browser.height}</span>
            </div> 
        );
    }
};

export default BrowserDetailsComponent;
