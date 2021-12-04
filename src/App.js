
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './assets/styles/theme';
import Routes from './routes';
import { batch ,useDispatch, useSelector} from 'react-redux'
import ar from './assets/dictionary/ar.json';
import en from './assets/dictionary/en.json';
import { useEffect, useState } from 'react';
import CounterPart from 'counterpart';
import ModalForm from './components/Modal/Modal';

function App() {
  CounterPart.registerTranslations('EN',en);
  CounterPart.registerTranslations('AR',ar);
  CounterPart.setLocale('AR');
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
        <ModalForm />
        <CssBaseline />
          <Routes />
      </ThemeProvider>
  );
}

export default App;
