import Folder from "./FileSystem/Folder";

interface BashState {
    history: History;
    cwd: string;   
    fileSystem: Folder;
}

export default BashState;