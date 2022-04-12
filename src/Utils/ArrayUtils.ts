class ArrayUtils {
    //transform an array of arrays to a single array containing all elements and remove duplicates
    public flatten<T>(arr: T[][]): T[] {
        return arr.flat().filter((item, index, array) => array.indexOf(item) === index);
    }
}

export default new ArrayUtils()