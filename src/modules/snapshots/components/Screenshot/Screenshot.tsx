import * as React from 'react';
import { css } from '@emotion/core';
import Screenshot from '../../../../models/Screenshot';
import BrowserDetailsComponent from '../BrowserDetails/BrowserDetails';
import Loader from '../../../../modules/common/components/Loader';
import './screenshot.css';

const Img = require('react-image');

const override = css`
    display: block;
`;

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
            <Img onClick={screenshotClicked} 
                loader={<Loader overrideCss={override} loading={true} />} 
                src={screenshot.screenshotUrl} 
                alt={`screenshot for ${browser.type === 'Device' ? browser.deviceName : browser.name}`}
            />
            <BrowserDetailsComponent browser={browser} />
        </React.Fragment>
    );
};

ScreenshotComponent.defaultProps = {
    screenshot: undefined,
    standalone: true
};

export default ScreenshotComponent;
