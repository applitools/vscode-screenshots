import * as React from 'react';
import Select from 'react-select';
import Browser, { viewportSizes, browsers } from '../../../../models/Browser';
import { parseBrowsers } from '../../../../modules/common/utils';
import './browsersSelector.css';

interface IProps {
    selectedBrowsers: Browser[],
    onChange: (value: Browser[], name: string) => void
}

interface IState {
    selectedBrowsers: Browser[]
}

export default class BrowsersSelector extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            selectedBrowsers: props.selectedBrowsers 
        };
        this.onChange = this.onChange.bind(this);
    }

    public onChange(value: any, action: any) {
        const { onChange } = this.props;
        const { selectedBrowsers } = this.state;
        const values = value.map((v: any) => v.value);
        let newBrowsersState: Browser[] = [];
        if (action.name === 'viewports') {
            newBrowsersState = parseBrowsers(selectedBrowsers.map(b => b.name), values);
        } else {
            newBrowsersState = parseBrowsers(values, this.getUniqueViewports(selectedBrowsers));
        }
        this.setState({
            selectedBrowsers: newBrowsersState
        });
        if (onChange) {
            onChange(newBrowsersState, 'applitoolsBrowsers');
        }
    }

    public render() {
        const { selectedBrowsers } = this.state;
        return (
          <React.Fragment>
            <label>Browsers:</label>
            <Select options={browsers.map(browser => ({ value: browser, label: browser }))} 
                name="browsers"
                isMulti={true} 
                isSearchable={true} 
                defaultValue={this.getBrowsers(selectedBrowsers)}
                onChange={this.onChange}
            />
            <label>Viewport Sizes:</label>
            <Select options={viewportSizes.map(viewport => ({ value: viewport, label: viewport }))} 
                name="viewports"
                isMulti={true} 
                isSearchable={true}
                defaultValue={this.getViewPorts(selectedBrowsers)}
                onChange={this.onChange}
            />
          </React.Fragment>
        );
    }

    private getUniqueViewports(selectedBrowsers: Browser[]) {
        const allViewports = selectedBrowsers.map(browser => this.getViewport(browser));
        return allViewports.filter((v, i, a) => a.indexOf(v) === i); 
    }

    private getViewPorts(selectedBrowsers: Browser[]) {
        const uniqueViewports = this.getUniqueViewports(selectedBrowsers);
        return uniqueViewports.map(viewport => ({ value: viewport, label: viewport }));
    }

    private getViewport(browser: Browser) {
        return `${browser.width}x${browser.height}`;
    }

    private getUniqueBrowsers(selectedBrowsers: Browser[]) {
        const allBrowsers = selectedBrowsers.map(browser => browser.name);
        return allBrowsers.filter((v, i, a) => a.indexOf(v) === i); 
    }

    private getBrowsers(selectedBrowsers: Browser[]) {
        const uniqueBrowsers = this.getUniqueBrowsers(selectedBrowsers);
        return uniqueBrowsers.map(browser => ({ value: browser, label: browser }));
    }
}
