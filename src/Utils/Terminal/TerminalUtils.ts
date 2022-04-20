import { CHAR_LENGTH } from "../../Components/UbuntuTerminal/styles";

class TerminalUtils {
    public getCurrentCaretOffset(inputLength: number, inputCaretRelativePosition: number): number {
        const caretOffset = inputLength - inputCaretRelativePosition;

        // if caret is at the begining of the input return the first position of the input
        if (caretOffset === inputLength) {
            return (inputLength - 1) * CHAR_LENGTH;
        }

        // if caret is at the end of the input return the last position of the input
        if (caretOffset < 0) {
            return 0;
        }

        return caretOffset * CHAR_LENGTH;
    }
}

export default new TerminalUtils();