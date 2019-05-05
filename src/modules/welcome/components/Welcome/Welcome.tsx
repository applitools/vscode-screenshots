import * as React from 'react';
import SingleSettingsComponent from 'src/modules/settings/components/SingleSetting/SingleSettings';
import Loader from 'src/modules/common/components/Loader';
import './welcome.css';

interface IProps {
    url: string,
    takeScreenshot: (settings: any) => void
};

interface IState {
    url: string,
    settings: any,
    loading: boolean
}

class WelcomeComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            url: props.url || '',
            loading: false,
            settings: {}
        }
        this.takeScreenshot = this.takeScreenshot.bind(this);
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
        const { url, loading } = this.state;
        return (
            <React.Fragment>                
                <h2>Welcome to Applitools Eyes Screenshots</h2>
                {!loading ? <SingleSettingsComponent message="Please enter screenshot Url:" 
                        setting={url} 
                        saveSetting={this.takeScreenshot}
                        settingName="applitoolsUnderTestUrl"
                        buttonLabel="Take Screenshot"
                /> : undefined}
                {<Loader loading={loading} />}
            </React.Fragment>
        );
    }
}

export default WelcomeComponent;
