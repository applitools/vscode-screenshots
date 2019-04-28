import * as React from 'react';
import { css, SerializedStyles } from '@emotion/core';

const ClipLoader = require('react-spinners').ClipLoader;
const override = css`
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
`;

interface IProps  {
    loading: boolean,
    overrideCss?: SerializedStyles
}

export default class Loader extends React.Component<IProps> {
    public render() {
        const { loading, overrideCss } = this.props;
    
        return (
            <ClipLoader loading={loading} css={overrideCss ? overrideCss : override} sizeUnit="px" size={35} color={'#36D7B7'} />
        );
    }
}
