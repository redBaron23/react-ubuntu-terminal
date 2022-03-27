const helpCommands = ['clear', 'ls', 'cat', 'mkdir', 'cd', 'pwd', 'echo', 'printenv', 'whoami', 'rm'];

const help = {
    exec: (state: Object) => {
        return Object.assign({}, state, {
            // history: state.history.concat(
            //     { value: 'React-bash:' },
            //     { value: 'These shell commands are defined internally.  Type \'help\' to see this list.' },
            //     ...helpCommands.map(value => ({ value }))
            // ),
        });
    },
};

const Commands = {
    help,
}

export default Commands;