import GlobalConstants from "../../Constants/GlobalConstants";
import Folder from "../../Model/Bash/FileSystem/Folder";

class BashUtil {
    private extractFirstFolder(path: string): string[] {
        const folders = path.split('/').filter(x => x !== '');
        if (folders.length === 0) {
            return [''];
        }
        return [folders[0], folders.slice(1).join('/')];
    }

    private translatePath(path: string): string {
        return path.replace('~', '/');
    }

    /**
     * 
     * @param path full path eg: /home/user/file.txt
     * @returns array of folders in path eg: ['home', 'user']
     */
    private getFoldersInPath(path: string): string[] {
        return path.split('/').filter(x => x !== '');
    }

    private getFilesInFolder(files: Folder, folderName: string, showHiden: boolean): string[] {
        if (!folderName || GlobalConstants.defaultCwd === folderName) {
            return Object.keys(files).filter(x => showHiden || x.charAt(0) !== '.');
        }

        const folder = files[folderName];
        if (!folder) {
            //TODO Folder not found throw error here
            return [];
        }

        const filesInFolder = Object.keys(folder).filter(x => x !== '.');
        if (showHiden) {
            return filesInFolder;
        }
        return filesInFolder.filter(x => x[0] !== '.');
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
            return this.getFilesInFolder(files, currentPath, showHiden);
        }

        const [firstFolder, restOfPath] = this.extractFirstFolder(currentPath);
        return this.getFiles(restOfPath, files[firstFolder] as Folder, showHiden, n++);
    }
}

export default new BashUtil();