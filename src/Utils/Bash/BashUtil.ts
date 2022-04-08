import GlobalConstants from "../../Constants/GlobalConstants";
import File from "../../Model/Bash/FileSystem/File";
import Folder from "../../Model/Bash/FileSystem/Folder";

class BashUtil {
    /**
     * 
     * @param path full path eg: /home/user/file.txt
     * @returns array of folders in path eg: ['home', 'user']
     */
    private getFoldersInPath(path: string): string[] {
        return path.split('/').filter(x => x !== '');
    }

    private getAllFiles(files: Folder, showHiden: boolean): string[] {
        return Object.keys(files).filter(x => showHiden || x.charAt(0) !== '.');
    }

    private extractFirstFolder(path: string): string[] {
        const folders = this.getFoldersInPath(path);
        if (folders.length === 0) {
            return [''];
        }
        return [folders[0], folders.slice(1).join('/')];
    }

    private translatePath(path: string): string {
        return path.replace('~', '/');
    }

    public getFullPath(pwd: string, folderName?: string): string {
        const realPwd = this.translatePath(pwd);

        if (realPwd === GlobalConstants.defaultCwd) {
            return realPwd + folderName;
        }

        if (!!folderName) {
            return `${realPwd}/${folderName}`;
        }
        return realPwd;
    }

    public getFiles(currentPath: string, files: Folder, showHiden: boolean, n: number = 0): string[] {
        if (currentPath === GlobalConstants.defaultCwd || !currentPath) {
            return this.getAllFiles(files, showHiden);
        }

        const [firstFolder, restOfPath] = this.extractFirstFolder(currentPath);

        const folder = files[firstFolder];

        if (this.isFolder(folder)) {
            return this.getFiles(restOfPath, folder as Folder, showHiden, n + 1);
        }

        return [firstFolder];
    }

    public isFolder(folder: Folder | File): boolean {
        // if folder has the property content return false
        return !folder.hasOwnProperty('content');
    }

    public isFile(file: Folder | File): boolean {
        // if file has the property content return true
        return file.hasOwnProperty('content');
    }
}

export default new BashUtil();