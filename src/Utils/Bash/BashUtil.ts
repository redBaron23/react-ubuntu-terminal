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

    private getFilesByFolder(files: Folder, showHiden: boolean): string[] {
        return Object.keys(files).filter(x => showHiden || x.charAt(0) !== '.');
    }

    private extractFirstFolder(path: string): string[] {
        const folders = this.getFoldersInPath(path);
        if (folders.length === 0) {
            return [''];
        }

        const restOfPath = folders.slice(1).join('/');
        return [folders[0], Object.keys(restOfPath).length > 0 ? restOfPath : ""];
    }

    private trim(str: string, char: string) {
        if (str[0] === char) {
            str = str.substr(1);
        }
        if (str[str.length - 1] === char) {
            str = str.substr(0, str.length - 1);
        }
        return str;
    }

    public isFolder(folder: Folder | File): boolean {
        // if folder has the property content return false
        return !folder.hasOwnProperty('content');
    }

    public isFile(file: Folder | File): boolean {
        // if file has the property content return true
        return file.hasOwnProperty('content');
    }

    public pathExists(path: string, files: Folder): boolean {
        try {
            const filesInPath = this.getFilesByPath(path, files, true);
            return filesInPath.length > 0;
        }
        catch (e: any) {
            return false;
        }
    }

    public isFolderExists(path: string, files: Folder): boolean {
        const folders = this.getFoldersInPath(path);
        const folderName = folders[folders.length - 1];
        const restOfPath = folders.slice(0, folders.length - 1).join('/');

        const folder = files[folderName];

        if (!!folder && this.isFolder(folder)) {
            return this.isFolderExists(restOfPath, folder as Folder);
        }

        return false;
    }

    public getFullPath(rootPath: string, relativePath?: string): string {
        if (!relativePath) return rootPath;

        // Strip trailing slash
        relativePath = this.trim(relativePath, '/');

        // Create raw path
        let path = `${rootPath ? rootPath + '/' : ''}${relativePath}`;

        // // Strip ../ references
        while (path.match(GlobalConstants.BACK_REGEX)) {
            path = path.replace(GlobalConstants.BACK_REGEX, '');
        }
        return this.trim(path, '/');
    }

    public getDirectoryByPath(files: Folder, relativePath: string): Folder | never {
        // Short circuit for empty root path
        if (relativePath === '/') return files;

        const path = relativePath.split('/').filter(x => x !== '');

        let dir = files;
        let i = 0;
        while (i < path.length) {
            const key = path[i];
            const child = dir[key];
            if (child && typeof child === 'object') {
                if (child.hasOwnProperty('content')) {
                    throw new Error(GlobalConstants.ERRORS.NOT_A_DIRECTORY.replace('$1', relativePath));
                } else {
                    dir = child as Folder;
                }
            } else {
                throw new Error(GlobalConstants.ERRORS.NO_SUCH_FILE.replace('$1', relativePath));
            }
            i++;
        }
        return dir;
    }

    /**
     * 
     * @param currentPath where to look for files
     * @param files current fileSystem
     * @param showHiden show hidden files (eg: .dotfiles)
     * @param n param for recursivity
     * @returns files in selected path or not found
     */
    public getFilesByPath(currentPath: string, files: Folder, showHiden: boolean = false): string[] | never {
        if (currentPath === GlobalConstants.DEFAULT_CWD || !currentPath) {
            return this.getFilesByFolder(files, showHiden);
        }

        const [firstFolder, restOfPath] = this.extractFirstFolder(currentPath);

        const folder = files[firstFolder];

        if (!folder) {
            throw new Error(`${currentPath}: No such file or directory (os error 2)`);
        }

        if (this.isFolder(folder)) {
            return this.getFilesByPath(restOfPath, folder as Folder, showHiden);
        }

        return [firstFolder];
    }

    //TODO refactor
    public createFolder(path: string, files: Folder): Folder {
        const [folderName, restOfPath] = this.extractFirstFolder(path);

        // if there is more path to explore and the folder exists
        if (restOfPath && files[folderName]) {
            const newFolder = this.createFolder(restOfPath, files[folderName] as Folder);
            return { ...files, [folderName]: { ...files[folderName], ...newFolder } };
        }

        // if there is more path to explore and the folder doesn't exist
        // we create that folder and continue the recursion
        if (restOfPath && !files[folderName]) {
            const newFolder = this.createFolder(restOfPath, { ...files, [folderName]: {} });
            return { ...files, [folderName]: { ...files[folderName], ...newFolder } };
        }

        // if there is no more path to explore and the folder exists
        if (!restOfPath && files[folderName]) {
            throw new Error(`${path}: File exists`);
        }

        // if there is no more path to explore and the folder doesn't exist
        // we create that folder and return it
        return { ...files, [folderName]: {} };
    }

    public getFolderName(path: string): string {
        const splittedPath = path.split('/');
        return splittedPath.pop()!;
    }
}

export default new BashUtil();