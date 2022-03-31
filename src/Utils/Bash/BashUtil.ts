import Folder from "../../Model/Bash/FileSystem/Folder";

class BashUtil {
    private extractPath(pwd: string): string {
        return pwd.replace(/^\/+/, '');
    }

    public getFullPath(pwd: string): string {
        if (pwd === '~') {
            return `/`;
        }

        return `/${pwd}`;
    }

    public getFiles(cwd: string, files: Folder): string[] {
        const fullPath = this.getFullPath(cwd);
        const folder = this.extractPath(fullPath);
        console.log(folder)
        const folderFiles = files[folder];

        if (folderFiles) {
            return Object.keys(folderFiles);
        }

        return [];
    }
}

export default new BashUtil();