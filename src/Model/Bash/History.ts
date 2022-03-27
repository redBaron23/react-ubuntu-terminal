interface Log {
    content: string;
    cwd?: string;
}

type History = Log[];

export default History;