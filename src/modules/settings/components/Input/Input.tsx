import * as React from 'react';
import './input.css';

interface IProps {
    name: string,
    label?: string,
    value?: string,
    type?: string,
    checked?: boolean,
    required?: boolean,
    onChange: (value: string, name: string) => void
}

export default class Input extends React.Component<IProps, {}> {
    public static defaultProps = {
        type: 'text'
    }

    public render() {
        const props = Object.assign({}, this.props, {
        onChange: (e: React.ChangeEvent) => {
                const target = (e.target) as HTMLInputElement;
                if (this.props.onChange) { 
                    this.props.onChange(target.value, target.name);
                }
            },
        }); 

        return (
            <div className={`input ${this.props.type}`}>
                {this.props.label && <label htmlFor={this.props.name}>{this.props.label}</label>}
                <input {...props} />
            </div>
        );
  }
}
