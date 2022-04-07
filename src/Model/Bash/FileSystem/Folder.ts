import File from './File';

enum FolderType {
    FOLDER = 'Folder',
    FILE = 'File',
}

type Folder = {
    [key: string]: File | Folder;
}

export default Folder;