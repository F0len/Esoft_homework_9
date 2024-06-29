class UserServise {

    constructor(userModel) {
        this.userModel = userModel;
    }

    async createUser(userData) {
        if (!userData.name || !userData.email || !userData.age) {
            return -1;
        }
        return this.userModel.create(userData);
    }

    async getAllUsers() {
        return this.userModel.getAll();
    }

    async getUserById(id) {
        return this.userModel.getById(id);
    }

    async updateUser(id, userData) {
        return this.userModel.update(id, userData);
    }

    async deleteUser(id) {
        return this.userModel.delete(id);
    }

    async getUsersOlderThan(age) {
        return this.userModel.getOlderThan(age);
    }

    async getUsersByDomain(domain) {
        return this.userModel.getByDomain(domain);
    }

    async getUsersSortedByName() {
        return this.userModel.getSortedByName();
    }
}
module.exports = UserServise;