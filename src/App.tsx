import * as React from 'react';
import Screenshot from './models/Screenshot';
import ScreenshotsComponent from './modules/snapshots/components/Screenshots/Screenshots';
import ScreenshotComponent from './modules/snapshots/components/Screenshot/Screenshot';
import Settings from './modules/settings/components/Settings/Settings';
import { eErrors } from './modules/common/utils';
import WelcomeComponent from './modules/welcome/components/Welcome/Welcome';
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
  showSettings: boolean
}

class App extends React.Component<IProps, IState> {
  public state: Readonly<IState> = {
    screenshot: undefined,
    showSettings: false
  };  

  constructor(props: IProps) {
    super(props);
    this.chooseScreenshot = this.chooseScreenshot.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.settingsChanged = this.settingsChanged.bind(this);
    this.takeScreenshot = this.takeScreenshot.bind(this);
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

  public renderSettings() {
    const { settings } = this.props;
    const { showSettings } = this.state;
    return showSettings ? <Settings goBack={this.toggleSettings} settingsChanged={this.settingsChanged} settings={settings} takeScreenshot={this.takeScreenshot} /> : undefined 
  }

  public renderScreenshots() {
    const { screenshots } = this.props;
    const { screenshot, showSettings } = this.state;

    if (!showSettings) {
      return (screenshot ? 
        <ScreenshotComponent screenshot={screenshot} chooseScreenshot={this.chooseScreenshot} standalone={true} /> :
        <ScreenshotsComponent screenshots={screenshots} chooseScreenshot={this.chooseScreenshot} />);
    }
    return undefined;
  }

  public renderErrors() {
    const { error } = this.props;
    const { showSettings } = this.state;

    if (!showSettings && error) {
      switch (error) {
        case eErrors.NoAPIKey: {
          return <WelcomeComponent takeScreenshot={this.takeScreenshot} />;
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
