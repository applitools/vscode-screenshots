import * as React from 'react';
import Screenshot from '../../../../models/Screenshot';
import BrowserDetailsComponent from '../BrowserDetails/BrowserDetails';
import './screenshot.css';

interface IProps { 
    screenshot: Screenshot,
    standalone: boolean,
    chooseScreenshot: (screenshot: Screenshot | undefined) => void
 };

const ScreenshotComponent: React.FunctionComponent<IProps> = (props) => {
    const { screenshot, chooseScreenshot, standalone } = props;
    const { browser } = screenshot;

    const screenshotClicked = () => {
        chooseScreenshot(screenshot);
    }

    const backButtonClicked = () => {
        chooseScreenshot(undefined);
    }

    return (
        <React.Fragment>
            {standalone ? <button className="icon-button back-button" onClick={backButtonClicked}><i className="arrow-left" /></button> : undefined}
            <img onClick={screenshotClicked} src={screenshot.screenshotUrl} alt={`snapshot for ${browser.type === 'Device' ? browser.deviceName : browser.name}`} />
            <BrowserDetailsComponent browser={browser} />
        </React.Fragment>
    );
};

ScreenshotComponent.defaultProps = {
    screenshot: undefined,
    standalone: true
};

export default ScreenshotComponent;
