import BashState from "../Model/Bash/BashState";
import Folder from "../Model/Bash/FileSystem/Folder";
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
    // "whoami",
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

        const pathExists = BashUtil.pathExists(currentDirectory, state.files)
        if (pathExists) {
            return {
                ...state,
                cwd: currentDirectory,
            }
        }

        return {
            ...state,
            history: [...state.history, { content: `bash: cd: ${folderName}: No such file or directory` }],
        }
    }
}

const ls = {
    exec: (state: BashState, flags: string[] = [], args: string[] = []): BashState => {
        const folderName = args[0] || '';

        const currentPath = BashUtil.getFullPath(state.cwd, folderName);
        const files = BashUtil.getFilesByPath(currentPath, state.files);
        return {
            ...state,
            history: [...state.history, { content: files.join('\n') }],
        }
    }
}

const mkdir = {
    exec: (state: BashState, flags: string[] = [], args: string[] = []): BashState => {
        const path = args[0];
        const folderName = BashUtil.getFolderName(path);
        const fullPath = BashUtil.getFullPath(state.cwd, path);
        const fileSystemCopy = JSON.parse(JSON.stringify(state.files));
        const dir = BashUtil.getDirectoryByPath(fileSystemCopy, fullPath);

        if (dir[folderName]) {
            return {
                ...state,
                history: [...state.history, { content: `bash: mkdir: ${path}: File exists` }],
            }

        }

        dir[folderName] = {} as Folder;
        console.log(fileSystemCopy)
        return {
            ...state,
            files: fileSystemCopy,
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
    mkdir,
}

export default BaseCommands;