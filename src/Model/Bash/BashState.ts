import Folder from "./FileSystem/Folder";
import History from "./History";

class BashState {
    constructor(
        public cwd: string,
        public history: History,
        public files: Folder,
    ) { }
}

export default BashState;