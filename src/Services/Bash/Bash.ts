import BaseCommands from "../../Constants/BaseCommands";
import BashState from "../../Model/Bash/BashState";
import Commands from "../../Model/Bash/Commands";
import BashParser, { CommandInput } from "../../Utils/Bash/BashParser";

class Bash {
    private commands: Commands;
    private prevInput: string[];

    constructor(extensions?: Commands) {
        this.prevInput = [];
        this.commands = {
            ...BaseCommands,
            ...extensions
        };
    }

    private runCommands(commandInputs: CommandInput[], state: BashState): BashState {
        const newState = commandInputs.reduce((state, commandInput) => {
            const command = this.commands[commandInput.command];

            if (command) {
                return command.exec(state, commandInput.flags, commandInput.args);
            }

            return state;
        }, state);

        return newState;
    }

    public execute(input: string, currentState: BashState) {
        this.prevInput = [...this.prevInput, input];

        const history = [...currentState.history, { content: input, cwd: currentState.cwd }];
        const newState = { ...currentState, history };

        const commandInputs = BashParser.parse(input);

        return this.runCommands(commandInputs, newState);
    }
}

export default Bash;