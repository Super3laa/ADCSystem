
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './assets/styles/theme';
import Routes from './routes';
import { batch ,useDispatch} from 'react-redux'
import { TranslatorProvider } from "react-translate"
import ar from './assets/dictionary/ar.json';
import en from './assets/dictionary/en.json';
import { changeLanguage } from './redux/actions/language';
import { useEffect, useState } from 'react';
function App() {
  /*const [appState,setAppState]=useState(null);
  const dispatch = useDispatch();
  useEffect(()=>{
    batch(()=>{
      dispatch()
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])*/
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TranslatorProvider translations={{AR:ar,EN:en,locale:"en"}}>
          <Routes />
        </TranslatorProvider>
      </ThemeProvider>
  );
}

export default App;
