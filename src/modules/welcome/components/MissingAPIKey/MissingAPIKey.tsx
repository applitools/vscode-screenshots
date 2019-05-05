import * as React from 'react';
import SingleSettingsComponent from 'src/modules/settings/components/SingleSetting/SingleSettings';
import './missingAPIKey.css';

interface IProps {
    settingsChanged: (settings: any) => void
}

interface IState {
    APIKey: string,
    settings: any
}

class MissingAPIKeyComponent extends React.Component<IProps, IState> {
    public state: Readonly<IState> = {
        APIKey: '',
        settings: {}
    };  

    constructor(props: IProps) {
        super(props);
        this.APIKeyChanged = this.APIKeyChanged.bind(this);
    }

    public APIKeyChanged(settings: any) {
        const { settingsChanged } = this.props;
        if (settingsChanged) {
            settingsChanged(settings);
        }
    }

    public render() {
        const { APIKey } = this.state;
        return (
            <React.Fragment>                
                <h2>Welcome to Applitools Eyes Screenshots</h2>
                <SingleSettingsComponent message="Please enter your Applitools API key:" 
                    setting={APIKey} 
                    saveSetting={this.APIKeyChanged}
                    settingName="applitoolsAPIKey"
                    buttonLabel="Save API Key" 
                />
            </React.Fragment>
        );
    }
}

export default MissingAPIKeyComponent;
