import * as React from 'react';
import Input from '../Input/Input';
import BrowsersSelector from '../BrowsersSelector/BrowsersSelector';
import { eSizeMode } from '../../../../models/Browser';
import './settings.css';

interface IProps {
    goBack: () => void,
    settingsChanged: (settings: any) => void,
    takeScreenshot: (settings: any) => void,
    settings: any 
};

interface IState {
    settings: any
}

class SettingsComponent extends React.Component<IProps, IState> {
    public static defaultProps = {
        settings: {}
    }  
    
    constructor(props: IProps) {
        super(props);
        this.state = {
            settings: props.settings
        };
        this.settingsChanged = this.settingsChanged.bind(this);
        this.takeScreenshot = this.takeScreenshot.bind(this);
    }

    public noop() {
        console.log('noop');
    }

    public settingsChanged(value: any, name: string) {
        const { settingsChanged } = this.props;

        const newState = Object.assign(this.state.settings, { [name]: value });
        this.setState({ settings: newState });

        if (settingsChanged) {
            settingsChanged(newState);
        }
    }

    public takeScreenshot() {
        const { goBack, takeScreenshot } = this.props;
        if (goBack) {
            goBack();
        }
        if (takeScreenshot) {
            takeScreenshot(undefined);
        }
    }

    public render() {
        const { goBack } = this.props;
        const { settings } = this.state;
        return (
            <React.Fragment>
                <button className="icon-button back-button" onClick={goBack}><i className="arrow-left" /></button>
                <h2>Settings</h2> 
                <div className="settings-container">
                    <hr />
                    <h3>General</h3>
                    <Input label="Website Url" name="applitoolsUnderTestUrl" onChange={this.settingsChanged} value={settings && settings.applitoolsUnderTestUrl} />
                    <Input label="API Key" name="applitoolsAPIKey" onChange={this.settingsChanged} value={settings && settings.applitoolsAPIKey} />
                    <Input label="Proxy" name="applitoolsProxy" onChange={this.settingsChanged} value={settings && settings.applitoolsProxy} />
                    <Input label="Server Url" name="applitoolsServerUrl" onChange={this.settingsChanged} value={settings && settings.applitoolsServerUrl} />
                    <hr />
                    <h3>Target</h3>
                    <Input type="radio" label="Full Page" name="applitoolsTarget" onChange={this.settingsChanged} value={eSizeMode.FullPage} checked={settings && settings.applitoolsTarget === eSizeMode.FullPage} />
                    <Input type="radio" label="Viewport" name="applitoolsTarget" onChange={this.settingsChanged} value={eSizeMode.Viewport} checked={settings && settings.applitoolsTarget === eSizeMode.Viewport} />
                    <hr />
                    <h3>Browsers</h3>
                    <BrowsersSelector selectedBrowsers={settings && settings.applitoolsBrowsers} onChange={this.settingsChanged} />
                    <button onClick={this.takeScreenshot}>Take Screenshot</button>
                </div>            
            </React.Fragment>
        );
    }
}

export default SettingsComponent;
