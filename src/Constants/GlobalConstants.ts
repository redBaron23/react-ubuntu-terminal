import Folder from "../Model/Bash/FileSystem/Folder";

const fileSystem: Folder = {
    '.hidden': {
        file1: { content: 'The is the content for file1 in the <.hidden> directory.' },
        file2: { content: 'The is the content for file2 in the <.hidden> directory.' },
        dir2: {
            file: { content: 'The is the content for <file> in the <.hidden> directory.' },
        },
        '.secrets': { content: 'I\'m still afraid of the dark...' },
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
    'README.md': { content: '✌⊂(✰‿✰)つ✌ Thanks for checking out the tool! There is a lot that you can do with react-bash and I\'m excited to see all of the fun commands and projects build on top of it!' },
};

const DEFAULT_CWD = '/';
const BACK_REGEX = /\/?\.?[\w-_]+\/\.\./;
const ERRORS = {
    COMMAND_NOT_FOUND: '-bash: $1: command not found',
    FILE_EXISTS: 'mkdir: $1: File exists',
    NO_SUCH_FILE: '-bash: cd: $1: No such file or directory',
    NOT_A_DIRECTORY: '-bash: cd: $1: Not a directory',
    IS_A_DIRECTORY: 'cat: $1: Is a directory',
}

const GlobalConstants = {
    fileSystem,
    DEFAULT_CWD,
    BACK_REGEX,
    ERRORS,
};

export default GlobalConstants;