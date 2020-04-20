// pages/_app.js
import { TinaCMS, TinaProvider } from 'tinacms';
import {
  useGithubEditing,
  GithubClient,
  TinacmsGithubProvider,
} from 'react-tinacms-github';
import App from 'next/app';

const REPO_FULL_NAME = process.env.REPO_FULL_NAME as string; // e.g: tinacms/tinacms.org

export default class Site extends App {
  cms: TinaCMS;

  constructor(props) {
    super(props);
    this.cms = new TinaCMS({
      apis: {
        github: new GithubClient('/api/proxy-github', REPO_FULL_NAME),
      },
      sidebar: {
        hidden: !props.pageProps.preview,
      },
      // ... any other tina config
    });
  }
  render() {
    const { Component, pageProps } = this.props;
    console.log({ pageProps });
    return (
      <TinaProvider cms={this.cms}>
        <YourLayout editMode={pageProps.editMode} error={pageProps.error}>
          <Component {...pageProps} />
        </YourLayout>
      </TinaProvider>
    );
  }
}

const enterEditMode = () => {
  return fetch(`/api/preview`).then(() => {
    window.location.href = window.location.pathname;
  });
};

const exitEditMode = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload();
  });
};

const YourLayout = ({ editMode, error, children }) => {
  console.log('CLIENT ID', process.env.GITHUB_CLIENT_ID);
  console.log('REPO', process.env.REPO_FULL_NAME);
  console.log('BRANCH', process.env.BASE_BRANCH);
  return (
    <TinacmsGithubProvider
      clientId={process.env.GITHUB_CLIENT_ID}
      authCallbackRoute='/api/create-github-access-token'
      editMode={editMode}
      enterEditMode={enterEditMode}
      exitEditMode={exitEditMode}
      error={error}
    >
      <EditLink isEditing={editMode} />
      {children}
    </TinacmsGithubProvider>
  );
};

export interface EditLinkProps {
  isEditing: boolean;
}

export const EditLink = ({ isEditing }: EditLinkProps) => {
  const github = useGithubEditing();

  return (
    <button onClick={isEditing ? github.exitEditMode : github.enterEditMode}>
      {isEditing ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  );
};
