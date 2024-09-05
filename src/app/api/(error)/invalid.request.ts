class InvalidRequest extends Error {
    public status: number = 403;
    constructor() {
        super("Invalid request");
    }
}

export default InvalidRequest;
