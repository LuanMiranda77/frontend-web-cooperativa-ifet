
export class UtilsGeral {

    public static getEmoji(index: number) : string{
        let lista = ['🤑', '😀', '😱', '😰', '😥'];
        return lista[index];
    }


    static removeMask(value: any):string {
        let v = value.replaceAll(/\D/g, '');
        // v = v.replaceAll('-', '');
        // v = v.replaceAll('/', '');
        return v;
    }

    




}