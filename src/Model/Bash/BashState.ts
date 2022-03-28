import Folder from "./FileSystem/Folder";
import History from "./History";

interface BashState {
    history: History;
    cwd: string;   
    fileSystem: Folder;
}

export default BashState;