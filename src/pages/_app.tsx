import { UserProfile, UserProvider } from '@auth0/nextjs-auth0/client';
import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { StoreProvider } from '../store';
import '../styles/fonts.css';
import { theme } from '../styles/theme';
import { createEmotionCache } from '../utils/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
   emotionCache?: EmotionCache;
   user?: UserProfile;
}

const MyApp = observer((props: MyAppProps) => {
   const { Component, emotionCache = clientSideEmotionCache, pageProps, user } = props;

   return (
      <CacheProvider value={emotionCache}>
         <Head>
            <meta charSet="utf-8" />
            <link
               rel="icon"
               type="image/png"
               sizes="192x192"
               href="/android-icon-192x192.png?v=2"
            />
            <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png?v=2" />
            <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png?v=2" />
            <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png?v=2" />
            <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png?v=2" />
            <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png?v=2" />
            <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png?v=2" />
            <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png?v=2" />
            <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png?v=2" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png?v=2" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png?v=2" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
            <link rel="manifest" crossOrigin="use-credentials" href="/manifest.webmanifest?v=2" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg?v=2" color="#236348" />
            <link rel="shortcut icon" href="/favicon.ico?v=2" />
            <meta name="msapplication-TileColor" content="#236348" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
         </Head>
         <UserProvider user={user}>
            <StoreProvider>
               <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Component {...pageProps} />
               </ThemeProvider>
            </StoreProvider>
         </UserProvider>
      </CacheProvider>
   );
});

export default MyApp;
