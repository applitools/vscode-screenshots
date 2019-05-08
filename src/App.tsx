import * as React from 'react';
import Screenshot from './models/Screenshot';
import ScreenshotsComponent from './modules/snapshots/components/Screenshots/Screenshots';
import ScreenshotComponent from './modules/snapshots/components/Screenshot/Screenshot';
import Settings from './modules/settings/components/Settings/Settings';
import MissingAPIKeyComponent from './modules/welcome/components/MissingAPIKey/MissingAPIKey';
import WelcomeComponent from './modules/welcome/components/Welcome/Welcome';
import { eErrors } from './modules/common/utils';
import Loader from './modules/common/components/Loader';
import Cog from './images/svg/cog.svg'; 
import './App.css';

interface IProps {
  screenshots: Screenshot[],
  error: eErrors,
  settings: any,
  vscode: any
};

interface IState {
  screenshot: Screenshot | undefined,
  showSettings: boolean,
  showUrl: boolean,
  loading: boolean
}

class App extends React.Component<IProps, IState> {
  public state: Readonly<IState> = {
    screenshot: undefined,
    showSettings: false,
    loading: false,
    showUrl: true
  };  

  constructor(props: IProps) {
    super(props);
    this.chooseScreenshot = this.chooseScreenshot.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.settingsChanged = this.settingsChanged.bind(this);
    this.takeScreenshot = this.takeScreenshot.bind(this);
    this.toggleShowUrl = this.toggleShowUrl.bind(this);
  }

  public chooseScreenshot(screenshot: Screenshot) {
     this.setState({
        screenshot
     });
  }

  public settingsChanged(settings: any) {
    const { vscode } = this.props;
    if (vscode) {
      vscode.postMessage({ command: 'settingsChanged', settings });
    }   
  }

  public takeScreenshot(settings: any) {
    const { vscode } = this.props;
    this.setState({ 
      loading: true,  
      showUrl: false
    });
    if (vscode) {
      vscode.postMessage({ command: 'takeScreenshot', settings });
    }   
  }

  public toggleSettings() {
    const { showSettings } = this.state;
    this.setState({
      screenshot: undefined,
      showSettings: !showSettings 
   });
  }

  public toggleShowUrl() {
    const { showUrl } = this.state;
    this.setState({
      showUrl: !showUrl
    });
  }

  public renderSettings() {
    const { settings } = this.props;
    const { showSettings } = this.state;
    return showSettings ? <Settings goBack={this.toggleSettings} settingsChanged={this.settingsChanged} settings={settings} takeScreenshot={this.takeScreenshot} /> : undefined 
  }

  public renderScreenshots() {
    const { screenshots, settings } = this.props;
    const { screenshot, showSettings, showUrl, loading } = this.state;

    if (!showSettings) {
      if (loading) {
        return (
          <div>
            <div>{`Running Applitools screenshots on: ${settings.applitoolsUnderTestUrl}`}</div>
            <Loader loading={loading} />
          </div>
        );
      }
      if (screenshot) {
        return (<ScreenshotComponent screenshot={screenshot} chooseScreenshot={this.chooseScreenshot} standalone={true} />);
      }
      if (showUrl) {
        return (<WelcomeComponent takeScreenshot={this.takeScreenshot} url={settings.applitoolsUnderTestUrl} />)
      } else {
        return (<ScreenshotsComponent goBack={this.toggleShowUrl} screenshots={screenshots} chooseScreenshot={this.chooseScreenshot} />);
      }
    }
    return undefined;
  }

  public renderErrors() {
    const { error } = this.props;
    const { showSettings } = this.state;

    if (!showSettings && error) {
      switch (error) {
        case eErrors.NoAPIKey: {
          return <MissingAPIKeyComponent settingsChanged={this.settingsChanged} />;
        }
        case eErrors.MissingSettings: {
          break;
        }
        default: {
          return <h2>Unknown error occurred</h2>;
        }
      }
    }
    return undefined;
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.screenshots !== this.props.screenshots) {
      this.setState({
        loading: false
      });
    }
  }

  public render() {
    const { error } = this.props;
    const { showSettings } = this.state;

    return (
      <div className="app">
        <header className="app-header">        
          <h1 className="app-title">Applitools Screenshots <img src={Cog} onClick={this.toggleSettings} hidden={showSettings} /></h1>
        </header>
        <div className="app-intro">
          {!error && this.renderSettings()}
          {!error && this.renderScreenshots()}
          {error && this.renderErrors()}
        </div>
      </div>
    );
  }
}

export default App;
