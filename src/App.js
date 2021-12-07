
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './assets/styles/theme';
import Routes from './routes';
import { batch ,useDispatch, useSelector} from 'react-redux'
import ar from './assets/dictionary/ar.json';
import en from './assets/dictionary/en.json';
import React, { useEffect, useState } from 'react';
import CounterPart from 'counterpart';
import ModalForm from './components/Modal/Modal';
import jwtDecode from 'jwt-decode';
import {updateUser} from './redux/actions/user'
import {loadUser} from './services/auth'
function App() {
  CounterPart.registerTranslations('EN',en);
  CounterPart.registerTranslations('AR',ar);
  CounterPart.setLocale('AR');
  const [appState,setAppState]=useState(null);
  const dispatch = useDispatch();
  useEffect(()=>{
    fetch();
   async function fetch(){
     let user = await loadUser()
     if (user){
      dispatch(updateUser(user));

     }
   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
      <ThemeProvider theme={theme}>
        <ModalForm />
        <CssBaseline />
          <Routes />
      </ThemeProvider>
  );
}

export default App;
