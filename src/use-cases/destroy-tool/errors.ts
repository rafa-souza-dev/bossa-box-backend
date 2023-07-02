export class ToolDoesNotExist extends Error {
    constructor() {
        super('Tool does not exist.')
    }
}
