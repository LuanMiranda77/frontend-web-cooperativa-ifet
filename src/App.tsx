import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { GlobalStyle } from "./styles/globalStyle";
import Routes from "./routes/index";
import { ThemeProvider } from 'styled-components';
import { ThemeContext } from './hooks/theme';
import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import 'react-dropdown/style.css';
import 'devextreme/dist/css/dx.light.compact.css';
import config from 'devextreme/core/config';
import { locale } from 'devextreme/localization';
import { ToastDefault } from './components/ToastDefault';


Modal.setAppElement('#root');


function App() {
  config({ defaultCurrency: 'BRL' });
  locale('pt');
  const root = ThemeContext.ThemeProvider();

  return (
    <ThemeProvider theme={root.theme}>
      <Routes setDefaultTheme={root.setDefaultTheme} />
      <GlobalStyle />
      <ToastDefault/>
    </ThemeProvider>
  )
}

export default App;
