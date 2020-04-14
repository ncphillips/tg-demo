import { useGithubAuthRedirect } from 'react-tinacms-github';

export default function Authorizing() {
  useGithubAuthRedirect();
  return <h2>Authorizing with Github, Please wait...</h2>;
}
