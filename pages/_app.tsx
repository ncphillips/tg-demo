import React from 'react';
import App from 'next/app';
import { TinaProvider, TinaCMS } from 'tinacms';

export default class Site extends App {
  cms: TinaCMS;
  constructor(props) {
    super(props);
    this.cms = new TinaCMS({
      sidebar: {
        hidden: true,
      },
      toolbar: {
        hidden: false,
      },
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <TinaProvider cms={this.cms}>
        <Component {...pageProps} />
      </TinaProvider>
    );
  }
}
