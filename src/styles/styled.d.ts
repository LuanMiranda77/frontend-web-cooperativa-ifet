import 'styled-components';

declare module 'styled-components'{
    export interface DefaultTheme{
        title: string;

        colors:{
            primary:string;
            secondary:string;
            tertiary:string;

            background:string,

            textLabel: string,
    
            white: string;
            black: string;
            gray: string;
    
            success:string;
            info:string;
            warning:string;
            error:string;
    
            dns_success:string;
            dns_info:string;
            dns_warning:string;
            dns_error:string;
        }
    }
}