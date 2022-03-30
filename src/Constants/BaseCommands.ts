import BashState from "../Model/Bash/BashState";
import BashParser from "../Utils/Bash/BashParser";

const helpCommands = [
    "clear",
    "ls",
    "cat",
    "mkdir",
    "cd",
    "pwd",
    "echo",
    "printenv",
    "whoami",
    "rm",
];

const help = {
    exec: (state: BashState): BashState => {
        const helpMessage = "You can use any of the following commands"
        return {
            ...state,
            history: [...state.history,
            { content: helpMessage },
            ...helpCommands.map(command => ({ content: `${command}` }))
            ]
        };
    }
};

const clear = {
    exec: (state: BashState): BashState => {
        return {
            ...state,
            history: [],
        }
    }
};

const pwd = {
    exec: (state: BashState): BashState => {
        const currentDirectory = BashParser.getCurrentDirectory(state.cwd);
        return {
            ...state,
            history: [...state.history, { content: currentDirectory }],
        }
    }
}

const echo = {
    exec: (state: BashState, flags?: string[], args: string[] = [""]): BashState => {
        const message = args.join(' ') ;
        return {
            ...state,
            history: [...state.history, { content: message }],
        }
    }
}

const BaseCommands = {
    help,
    clear,
    pwd,
    echo,
}

export default BaseCommands;