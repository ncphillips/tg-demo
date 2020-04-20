//pages/github/authorizing.tsx
// Our GitHub app redirects back to this page with auth code
import React from 'react';
import { useGithubAuthRedirect } from 'react-tinacms-github';

export default function Authorizing() {
  // Let the main app know, that we receieved an auth code from the GitHub redirect
  useGithubAuthRedirect();
  return <h2>Authorizing with GitHub, Please wait...</h2>;
}
