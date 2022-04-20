import Folder from "../Model/Bash/FileSystem/Folder";

const fileSystem: Folder = {
    '.hidden': {
        secrets: {
            are_you_sure: {
                you_want_to_know_my_secret: {
                    '.secret': {content: 'I don\'t like Ubuntu, I\'m an arch user'}
                }
            }
        },
    },
    public: {
        file1: { content: 'The is the content for file1 in the <public> directory.' },
        file2: { content: 'The is the content for file2 in the <public> directory.' },
        file3: { content: 'The is the content for file3 in the <public> directory.' },
        dir1: {
            file: { content: 'The is the content for <file> in the <dir1> directory.' },
            dir2: {
                file32: { content: 'The is the content for <file> in the <dir2> directory.' },
            },
        },
    },
    'README.md': { content: 'Thanks for checking out my terminal portfolio! You can see the project\'s code here https://github.com/redBaron23/portfolio' },
};

const DEFAULT_CWD = '/';
const BACK_REGEX = /\/?\.?[\w-_]+\/\.\./;
const ERRORS = {
    COMMAND_NOT_FOUND: '$1: command not found',
    FILE_EXISTS: '$1: File exists',
    NO_SUCH_FILE: '$1: No such file or directory',
    NOT_A_DIRECTORY: '$1: Not a directory',
    IS_A_DIRECTORY: '$1: Is a directory',
}

const GlobalConstants = {
    fileSystem,
    DEFAULT_CWD,
    BACK_REGEX,
    ERRORS,
};

export default GlobalConstants;