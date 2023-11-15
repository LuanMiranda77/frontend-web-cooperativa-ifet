import { DefaultTheme } from 'styled-components';
import dark from '../styles/themes/dark';
import light from '../styles/themes/light';
import roxo from '../styles/themes/roxo';
import usePersistState from './usePersistState';


export class ThemeContext {

    static ThemeProvider = () => {

        const [theme, setTheme] = usePersistState<DefaultTheme>("@theme-local", light);

        const setDefaultTheme =() => {
            setTheme(
                theme.title === 'dark'? light :
                theme.title === 'light' ? dark : roxo
            )
        };
        return {theme, setDefaultTheme};
    } 
}


