export class ToolAlreadyExists extends Error {
    constructor() {
        super('Tool already exists.')
    }
}
