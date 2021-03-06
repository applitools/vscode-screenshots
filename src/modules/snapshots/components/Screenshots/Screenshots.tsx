import * as React from 'react';
import Screenshot from '../../../../models/Screenshot';
import ScreenshotComponent from '../Screenshot/Screenshot';
import './screenshots.css';

interface IProps { 
    screenshots: Screenshot[],
    goBack: () => void,
    chooseScreenshot: (screenshot: Screenshot) => void
 };

const ScreenshotsComponent: React.FunctionComponent<IProps> = (props) => {
    const { goBack, chooseScreenshot } = props;

    const createScreenshot = (screenshot: Screenshot, index: number) => {
        return (
            <li key={`snapshot_${index}`}>
                <ScreenshotComponent screenshot={screenshot} chooseScreenshot={chooseScreenshot} standalone={false}  />
            </li>
        );
    }

    return (
        <React.Fragment>
            <button className="icon-button back-button" onClick={goBack}><i className="arrow-left" /></button>
            <ul>
                {props.screenshots.map((screenshot, index) => createScreenshot(screenshot, index))}
            </ul>
            {props.screenshots.length === 0 ? <h2>No screenshots. Try to change your Applitools settings and take screenshots again.</h2> : undefined}
        </React.Fragment>
    );
};

ScreenshotsComponent.defaultProps = {
    screenshots: []
};

export default ScreenshotsComponent;
