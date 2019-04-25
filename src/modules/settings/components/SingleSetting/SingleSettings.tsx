import * as React from 'react';
import Input from '../Input/Input';
import './singleSettings.css';

interface IProps {
    saveSetting: (settings: any) => void,
    setting: string,
    settingName: string,
    message: string,
    buttonLabel: string 
};

interface IState {
    setting: any
}

class SingleSettingsComponent extends React.Component<IProps, IState> {
    public static defaultProps = {
        setting: ''
    }  
    
    constructor(props: IProps) {
        super(props);
        this.state = {
            setting: props.setting
        };
        this.settingsChanged = this.settingsChanged.bind(this);
        this.saveSetting = this.saveSetting.bind(this);
    }

    public saveSetting() {
        const { saveSetting, settingName } = this.props;
        const { setting } = this.state;
        
        if (saveSetting) {
            saveSetting({ [settingName]: setting });
        }
    }

    public settingsChanged(value: string) {
        this.setState({ setting: value });
    }

    public render() {
        const { message, buttonLabel } = this.props;
        const { setting } = this.state;
        return (
            <React.Fragment>
                <h3>{message}</h3> 
                <Input name="setting" onChange={this.settingsChanged} value={setting} required={true} />
                <button onClick={this.saveSetting} disabled={!setting}>{buttonLabel}</button>
            </React.Fragment>
        );
    }
}

export default SingleSettingsComponent;
