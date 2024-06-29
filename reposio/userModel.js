let users = [
    
    { id: 2, name: 'Bob Smith', email: 'bob.smith@example2.com', age: 34 },
    { id: 3, name: 'Charlie Brown', email: 'charlie.brown@example2.com', age: 45 },
    { id: 4, name: 'Eva Davis', email: 'eva.davis@example.com', age: 37 },
    { id: 5, name: 'David Wilson', email: 'david.wilson@example.com', age: 23 },
    { id: 6, name: 'Alice Davis', email: 'alice.davis@example.com', age: 22 },
    
];
class InMemoryUserModel {

    constructor(usersDefault, currentId){
        this.users = usersDefault;
        this.currentId = currentId;
    }
    async create(userData){
        const newUser = { id: this.currentId++, ...userData };
        this.users.push(newUser);
        return newUser;
    }

    async getAll(){
      return this.users;
    }

    async getById(id){
        return this.users.find(u => u.id === parseInt(id));
       
    }

    async update(id, userData){
        const userIndex = this.users.findIndex(u => u.id === parseInt(id));
        if(userIndex !== -1){
            this.users[userIndex] = {...this.users[userIndex], ...userData};
            return this.users[userIndex];
        }
        return null;
    }

    async delete(id){
        const userIndex = this.users.findIndex(u => u.id === parseInt(id));
        if(userIndex !== -1){
            this.users.splice(userIndex, 1);
            return true;
        }
        return null
    }
    async getOlderThan(age) {
        return this.users.filter(user => user.age > parseInt(age));
    }

    async getByDomain(domain){
        return this.users.filter(user => user.email.split('@')[1] === domain);
    }

    async getSortedByName() {
        return this.users.slice().sort((a, b) => a.name.localeCompare(b.name));
    }
}

const inMemoryUserModel = new InMemoryUserModel(users,7);
module.exports = inMemoryUserModel;