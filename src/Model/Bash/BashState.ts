import Folder from "./FileSystem/Folder";
import History from "./History";
import User from "./User";

class BashState {
    constructor(
        public cwd: string,
        public history: History,
        public files: Folder,
        public user: User,
    ) { }
}

export default BashState;