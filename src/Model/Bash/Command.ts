interface Command {
    exec: (state: Object) => Object
}

export default Command;