import ArrayUtils from "../ArrayUtils";

export interface CommandInput {
    command: string;
    flags: string[];
    args: string[];
}

/*
 * This method parses a single command + args. It handles
 * the tokenization and processing of flags, anonymous args,
 * and named args.
 *
 * @param {string} input - the user input to parse
 * @returns {Object} the parsed command/arg dataf84t56y78ju7y6f
 */
const parseInput = (input: string): CommandInput => {
    const tokens = input.split(' ');
    const command = tokens[0];
    const flags = tokens.slice(1).filter(token => token.startsWith('-')).map(token => token.split(''));
    const args = tokens.slice(1).filter(token => !token.startsWith('-'));

    return {
        command,
        flags: ArrayUtils.flatten(flags),
        args
    };
};

/*
 * This function splits the input by `&&`` creating a
 * dependency chain. The chain consists of a list of
 * other commands to be run.
 *
 * @param {string} input - the user input
 * @returns {Array} a list of lists of command/arg pairs
 *
 * Example: `cd dir1; cat file.txt && pwd`
 * In this example `pwd` should only be run if dir/file.txt
 * is a readable file. The corresponding response would look
 * like this, where the outer list is the dependent lists..
 *
 * [
 *   [
 *     { command: 'cd', args: { 0: 'dir1'} },
 *     { command: 'cat', args: { 0: 'file.txt'} }
 *   ],
 *   [
 *     { command: 'pwd' }
 *   ]
 * ]
 */
function parse(input: string): CommandInput[] {
    const inputs = input.split(/ && /);
    const commands = inputs.map(parseInput);

    return commands;
}

const BashParser = {
    parse,
}

export default BashParser;
