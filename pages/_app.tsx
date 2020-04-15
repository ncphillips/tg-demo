import React from 'react';
import App from 'next/app';
import { TinaProvider, TinaCMS } from 'tinacms';
import { GithubClient } from 'react-tinacms-github';

const REPO_FULL_NAME = 'ncphillips/tg-demo';

import { TinacmsGithubProvider, authenticate } from 'react-tinacms-github';

const enterEditMode = () =>
  fetch(`/api/preview`).then(() => {
    window.location.href = window.location.pathname;
  });
const exitEditMode = () => {
  fetch(`/api/reset-preview`).then(() => {
    window.location.reload();
  });
};

const YourLayout = ({ error, children }) => {
  return (
    <TinacmsGithubProvider
      authenticate={() =>
        authenticate(
          process.env.GITHUB_CLIENT_ID,
          '/api/create-github-access-token'
        )
      }
      enterEditMode={enterEditMode}
      exitEditMode={exitEditMode}
      error={error}
    >
      {children}
    </TinacmsGithubProvider>
  );
};

export default class Site extends App {
  cms: TinaCMS;
  constructor(props) {
    super(props);
    this.cms = new TinaCMS({
      apis: {
        github: new GithubClient('/api/proxy-github', REPO_FULL_NAME),
      },
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
    console.log({ pageProps });
    return (
      <TinaProvider cms={this.cms}>
        <YourLayout error={this.props.pageProps.error}>
          <Component {...pageProps} />
        </YourLayout>
      </TinaProvider>
    );
  }
}
