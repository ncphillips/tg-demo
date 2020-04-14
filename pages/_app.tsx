import React from 'react';
import App from 'next/app';
import { TinaProvider, TinaCMS } from 'tinacms';
import { GithubClient } from 'react-tinacms-github';

const REPO_FULL_NAME = process.env.REPO_FULL_NAME; // e.g: tinacms/tinacms.org

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

const YourLayout = ({ pageProps, children }) => {
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
      error={pageProps.error}
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
    return (
      <TinaProvider cms={this.cms}>
        <YourLayout {...this.props.pageProps}>
          <Component {...pageProps} />
        </YourLayout>
      </TinaProvider>
    );
  }
}
