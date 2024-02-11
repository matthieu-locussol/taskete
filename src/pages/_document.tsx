import createEmotionServer from '@emotion/server/create-instance';
import Document, { DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import { theme } from '../styles/theme';
import { createEmotionCache } from '../utils/createEmotionCache';

interface MyDocumentProps extends DocumentInitialProps {
   emotionStyleTags: JSX.Element[];
}

export default class MyDocument extends Document {
   render() {
      return (
         <Html lang="en">
            <Head>
               <meta name="theme-color" content={theme.palette.primary.main} />
               <meta name="emotion-insertion-point" content="" />
               {(this.props as unknown as MyDocumentProps).emotionStyleTags}
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}

MyDocument.getInitialProps = async (context): Promise<MyDocumentProps> => {
   const originalRenderPage = context.renderPage;

   const cache = createEmotionCache();
   const { extractCriticalToChunks } = createEmotionServer(cache);

   context.renderPage = () =>
      originalRenderPage({
         enhanceApp: (App: any) => (props) => <App emotionCache={cache} {...props} />,
      });

   const initialProps = await Document.getInitialProps(context);
   const emotionStyles = extractCriticalToChunks(initialProps.html);
   const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
         data-emotion={`${style.key} ${style.ids.join(' ')}`}
         key={style.key}
         dangerouslySetInnerHTML={{ __html: style.css }}
      />
   ));

   return {
      ...initialProps,
      emotionStyleTags,
   };
};
