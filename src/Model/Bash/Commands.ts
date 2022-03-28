import BashState from "./BashState";

interface Command {
    exec: (state: BashState, flags?: string[], args?: string[]) => BashState
}

type Commands = {
    [key: string]: Command
}

export default Commands;