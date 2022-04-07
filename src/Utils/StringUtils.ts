class StringUtils {
    //return true if string starts with a char
    static startsWith(str: string, char: string): boolean {
        return str.indexOf(char) === 0;
    }
}

export default new StringUtils();