import * as React from 'react';
import SingleSettingsComponent from 'src/modules/settings/components/SingleSetting/SingleSettings';
import { css } from '@emotion/core';
import './welcome.css';

const ClipLoader = require('react-spinners').ClipLoader;
const override = css`
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
`;

interface IProps {
    takeScreenshot: (settings: any) => void
};

interface IState {
    APIKey: string,
    url: string,
    showUrl: boolean,
    settings: any,
    loading: boolean
}

class WelcomeComponent extends React.Component<IProps, IState> {
    public state: Readonly<IState> = {
        APIKey: '',
        url: '',
        loading: false,
        showUrl: false,
        settings: {}
    };  

    constructor(props: IProps) {
        super(props);
        this.takeScreenshot = this.takeScreenshot.bind(this);
        this.APIKeyChanged = this.APIKeyChanged.bind(this);
    }

    public APIKeyChanged(settings: any) {
        this.setState({ showUrl: true, settings });
    }

    public takeScreenshot(settings: any) {
        const { takeScreenshot } = this.props;
        const oldSettings = this.state.settings;
        this.setState({ loading: true });
        if (takeScreenshot) {
            takeScreenshot(Object.assign(oldSettings, settings));
        }
    }

    public render() {
        const { APIKey, url, showUrl, loading } = this.state;
        return (
            <React.Fragment>                
                <h2>Welcome to Applitools Eyes Screenshots</h2>
                {!showUrl && !loading ? <SingleSettingsComponent message="Please enter your Applitools API key:" 
                    setting={APIKey} 
                    saveSetting={this.APIKeyChanged}
                    settingName="applitoolsAPIKey"
                    buttonLabel="Save API Key" 
                /> : undefined}
                {showUrl && !loading ? <SingleSettingsComponent message="Please enter screenshot Url:" 
                        setting={url} 
                        saveSetting={this.takeScreenshot}
                        settingName="applitoolsUnderTestUrl"
                        buttonLabel="Take Screenshot"
                /> : undefined}
                {<ClipLoader css={override} sizeUnit={"px"} size={35} color={'#36D7B7'} loading={loading} />}
            </React.Fragment>
        );
    }
}

export default WelcomeComponent;
