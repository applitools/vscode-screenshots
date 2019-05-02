import * as React from 'react';
import { css } from '@emotion/core';
import Screenshot from '../../../../models/Screenshot';
import BrowserDetailsComponent from '../BrowserDetails/BrowserDetails';
import Loader from '../../../../modules/common/components/Loader';
import Browser from '../../../../models/Browser';
import './screenshot.css';

const Img = require('react-image');
const PinchView = require('react-pinch-zoom-pan').PinchView;

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
            <PinchView backgroundColor='#fff' initialScale={1} maxScale={4} containerRatio={(((browser as Browser).height / (browser as Browser).width) * 100)}>
                <Img onClick={screenshotClicked} 
                    loader={<Loader overrideCss={override} loading={true} />} 
                    src={screenshot.screenshotUrl} 
                    alt={`screenshot for ${browser.type === 'Device' ? browser.deviceName : browser.name}`}
                    style={{
                        width: '100%',
                        height: 'auto'
                    }}
                />
            </PinchView>
            <BrowserDetailsComponent browser={browser} />
        </React.Fragment>
    );
};

ScreenshotComponent.defaultProps = {
    screenshot: undefined,
    standalone: true
};

export default ScreenshotComponent;
