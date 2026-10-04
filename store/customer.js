export class Customer {
    #name;

    /**
     *
     * @param {string} name
     */
    constructor(name) {
        if (typeof name !== "string" || name.trim() === "") {
            throw new Error("Invalid Customer name")
        }

        this.#name = name.trim();
    }

    get name() {
        return this.#name
    }
}