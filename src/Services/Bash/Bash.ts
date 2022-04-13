import BaseCommands from "../../Constants/BaseCommands";
import BashState from "../../Model/Bash/BashState";
import Commands from "../../Model/Bash/Commands";
import BashParser, { CommandInput } from "../../Utils/Bash/BashParser";

class Bash {
    private commands: Commands;
    private prevInput: string[];
    private prevInputIndex: number;

    constructor(extensions?: Commands) {
        this.prevInput = [];
        this.prevInputIndex = 0;
        this.commands = {
            ...BaseCommands,
            ...extensions
        };
    }

    private handleCommandNotFound(input: string, state: BashState): BashState {
        return {
            ...state,
            history: [...state.history, {
                content: `bash: ${input}: command not found
            ` }]
        };
    }

    private runCommands(commandInputs: CommandInput[], state: BashState): BashState {
        const newState = commandInputs.reduce((state, commandInput) => {
            const command = this.commands[commandInput.command];

            if (!command) {
                return this.handleCommandNotFound(commandInput.command, state);
            }
            
            try {
                return command.exec(state, commandInput.flags, commandInput.args);
            }
            catch(e: any) {
                return {
                    ...state,
                    history: [...state.history, { content: `bash: ${commandInput.command}: ${e.message}` }]
                };
            }
        }, state);

        return newState;
    }

    public execute(input: string, currentState: BashState) {
        this.prevInput = [...this.prevInput, input];
        this.prevInputIndex = this.prevInput.length - 1;

        const history = [...currentState.history, { content: input, cwd: currentState.cwd }];
        const newState = { ...currentState, history };

        const commandInputs = BashParser.parse(input);

        return this.runCommands(commandInputs, newState);
    }

    public getPreviousInput(): string {
        const lastInput = this.prevInput[this.prevInputIndex];
        if (this.prevInputIndex > 0) {
            this.prevInputIndex--;
        }

        return lastInput;
    }

    public getNextInput(): string {
        if (this.prevInputIndex < this.prevInput.length - 1) {
            this.prevInputIndex++;
            return this.prevInput[this.prevInputIndex];
        }

        return "";
    }

    public isLastInput(): boolean {
        return !!this.prevInput.length;
    }
}

export default new Bash();