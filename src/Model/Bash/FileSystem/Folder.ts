import File from './File';

type Folder = {
    [key: string]: File | Folder;
}

export default Folder;