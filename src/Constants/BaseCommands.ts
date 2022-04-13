import BashState from "../Model/Bash/BashState";
import BashUtil from "../Utils/Bash/BashUtil";
import GlobalConstants from "./GlobalConstants";

const helpCommands = [
    "help",
    "clear",
    "ls",
    "cat",
    "mkdir",
    "cd",
    "pwd",
    "echo",
    // "env",
    "whoami",
    // "rm",
    "node",
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
        return {
            ...state,
            history: [...state.history, { content: state.user.username }],
        }
    }
}

const cd = {
    exec: (state: BashState, flags?: string[], args?: string[]): BashState => {
        const folderName = args![0];

        if (!folderName || folderName === GlobalConstants.DEFAULT_CWD) {
            return {
                ...state,
                cwd: GlobalConstants.DEFAULT_CWD,
            }
        }

        const currentDirectory = BashUtil.getFullPath(state.cwd, folderName);

        //check if folder exists
        BashUtil.getDirectoryByPath(state.files, currentDirectory);

        return {
            ...state,
            cwd: currentDirectory ? currentDirectory : GlobalConstants.DEFAULT_CWD,
        }
    }
}

const ls = {
    exec: (state: BashState, flags: string[] = [], args: string[] = []): BashState => {
        const folderName = args[0] || '';

        const currentPath = BashUtil.getFullPath(state.cwd, folderName);
        const directory = BashUtil.getDirectoryByPath(state.files, currentPath);
        let files = Object.keys(directory);

        if (!flags.includes('a')) {
            files = files.filter(file => !file.startsWith('.'));
        }
        // if (flags.includes('l')) {
        //     return {
        //         ...state,
        //         history: { ...state.history }
        //     }
        // }

        return {
            ...state,
            history: [...state.history, { content: files.join('\n') }],
        }
    }
}

const mkdir = {
    exec: (state: BashState, flags: string[] = [], args: string[] = []): BashState => {
        const path = args[0];
        const fullPath = BashUtil.getFullPath(state.cwd, path);
        const newFileSystem = BashUtil.createFolder(fullPath, state.files)

        return { ...state, files: newFileSystem }
    }
}

const cat = {
    exec: (state: BashState, flags: string[] = [], args: string[] = []): BashState => {
        const path = args[0];
        const fullPath = BashUtil.getFullPath(state.cwd, path);
        const file = BashUtil.getFileByPath(state.files, fullPath);

        return { ...state, history: [...state.history, { content: file.content }] }
    }
}

const node = {
    exec: (state: BashState, flags: string[] = [], args: string[] = []): BashState => {
        const code = args.join(' ');
        const result = eval(code);

        return { ...state, history: [...state.history, { content: result }] }
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
    mkdir,
    cat,
    node,
}

export default BaseCommands;