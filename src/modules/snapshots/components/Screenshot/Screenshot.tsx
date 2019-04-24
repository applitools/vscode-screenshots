import * as React from 'react';
import { css } from '@emotion/core';
import Screenshot from '../../../../models/Screenshot';
import BrowserDetailsComponent from '../BrowserDetails/BrowserDetails';
import './screenshot.css';

const Img = require('react-image');
const ClipLoader = require('react-spinners').ClipLoader;

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
                loader={<ClipLoader css={override} sizeUnit={"px"} size={35} color={'#36D7B7'} loading={true} />} 
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
