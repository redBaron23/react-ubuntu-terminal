import BashState from "../Model/Bash/BashState";
import BashUtil from "../Utils/Bash/BashUtil";

const helpCommands = [
    "clear",
    "ls",
    // "cat",
    // "mkdir",
    // "cd",
    "pwd",
    "echo",
    // "env",
    "whoami",
    // "rm",
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
        const currentDirectory = BashUtil.getFullPath(state.cwd);
        return {
            ...state,
            history: [...state.history, { content: currentDirectory }],
        }
    }
}

const echo = {
    exec: (state: BashState, flags?: string[], args?: string[]): BashState => {
        const message = args!.join(' ');
        return {
            ...state,
            history: [...state.history, { content: message }],
        }
    }
}

const whoami = {
    exec: (state: BashState): BashState => {
        const user = state.user;
        return {
            ...state,
            history: [...state.history, { content: state.user.username }],
        }
    }
}

const cd = {
    exec: (state: BashState, flags?: string[], args?: string[]): BashState => {
        const folderName = args![0];
        const currentDirectory = BashUtil.getFullPath(state.cwd, folderName);
        return {
            ...state,
            cwd: currentDirectory,
            history: [...state.history, { content: currentDirectory }],
        }
    }
}

const ls = {
    exec: (state: BashState, flags: string[] = [], args: string[] = []): BashState => {
        const folderName = args[0] || '';

        const currentPath = BashUtil.getFullPath(state.cwd, folderName);
        const files = BashUtil.getFiles(currentPath, state.files, false);

        return {
            ...state,
            history: [...state.history, { content: files.join('\n') }],
        }
    }
}

const BaseCommands = {
    help,
    clear,
    pwd,
    echo,
    ls,
    whoami,
    cd,
}

export default BaseCommands;