
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './assets/styles/theme';
import Routes from './routes';
import { Provider } from 'react-redux'
import store from './redux/store'
import { TranslatorProvider } from "react-translate"
import ar from './assets/dictionary/ar.json';
import en from './assets/dictionary/en.json';
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TranslatorProvider translations={{AR:ar,EN:en,locale:"en"}}>
          <Routes />
        </TranslatorProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
