// pages/index.tsx

import Head from 'next/head';
/*
 ** Import helpers and GetStaticProps type
 */
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { GetStaticProps } from 'next';

export default function Home(props) {
  const data = props.file.data;

  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1 className='title'>
          {/*
           ** Render the title from `home.json`
           */}
          {data.title}
        </h1>

        <p className='description'>
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className='grid'>{/*...*/}</div>
      </main>

      <footer>{/*...*/}</footer>
    </div>
  );
}

/*
 ** Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/home.json',
      parse: parseJson,
    });
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('../content/home.json')).default,
      },
    },
  };
};
