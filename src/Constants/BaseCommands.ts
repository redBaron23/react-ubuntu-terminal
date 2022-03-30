import BashState from "../Model/Bash/BashState";

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
        const helMessage = "Hola que hace"
        return {
            ...state,
            history: [...state.history,
            { content: helMessage },
            ]
        };
    }
};

const BaseCommands = {
    help,
}

export default BaseCommands;