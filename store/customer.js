export class Customer {
    #name;

    /**
     * 
     * @param {number} name 
     */
    constructor(name) {
        if (typeof name !== "string" || name.trim() === "") {
            throw new Error("Invalid Customer name")
        }

        this.#name = name;
    }

    get name() {
        return this.#name
    }
}