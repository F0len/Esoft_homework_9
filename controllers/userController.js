class UserController {

    constructor(userServise) {
        this.userServise = userServise;
        this.HTTP_STATUS = {
            OK: 200,
            CREATED: 201,
            NO_CONTENT: 204,
            BAD_REQUEST: 400,
            NOT_FOUND: 404,
            ERROR: 500,
        };
        this.HTTP_MESSAGE = {
            NOT_FOUND_USER: 'Пользователь не найден',
            MISSING_FIELDS: 'Отсутствуют обязательные поля',
            CREATED_USER: 'Пользователь успешно добавлен',
        };
    }

    


    getAllUsers = async (req, res) => {
        const users = await this.userServise.getAllUsers();
        res.status(this.HTTP_STATUS.OK).json(users);
    }

    getUserById = async (req, res) => {
        const user = await this.userServise.getUserById(req.params.id);
        user ? res.status(this.HTTP_STATUS.OK).json(user) : res.status(this.HTTP_STATUS.NOT_FOUND).json({ error: this.HTTP_MESSAGE.NOT_FOUND_USER });

    }

    addUser = async (req, res) => {
        const user = await this.userServise.createUser(req.body);
        if (user != -1) {
            res.status(this.HTTP_STATUS.CREATED).json({ message: this.HTTP_MESSAGE.CREATED_USER });
        }
        else {
            return res.status(this.HTTP_STATUS.BAD_REQUEST).json({ message: this.HTTP_MESSAGE.MISSING_FIELDS });
        }
    };

    updateUser = async (req, res) => {
        const user = await this.userServise.updateUser(req.params.id, req.body);
        if (!user) {
            res.status(this.HTTP_STATUS.NOT_FOUND).json({ message: this.HTTP_MESSAGE.NOT_FOUND_USER });
        }
        else {
            res.status(this.HTTP_STATUS.OK).json(user);
        }
    }

    deleteUser = async (req, res) => {
        const user = await this.userServise.deleteUser(req.params.id);
        if (!user) {
            res.status(this.HTTP_STATUS.NOT_FOUND).json({ message: this.HTTP_MESSAGE.NOT_FOUND_USER });
        } else {
            res.status(this.HTTP_STATUS.NO_CONTENT).send();
        }
    }

    getUsersOlderThan = async (req, res) => {
        const filteredUsers = await this.userServise.getUsersOlderThan(req.params.age);
        res.status(this.HTTP_STATUS.OK).json(filteredUsers);
    }

    getUsersByDomain = async (req, res) => {
        const filteredUsers = await this.userServise.getUsersByDomain(req.params.domain);
        res.status(this.HTTP_STATUS.OK).json(filteredUsers);
    }

    getUsersSortedByName = async (req, res) => {
        const sortedUsers = await this.userServise.getUsersSortedByName();
        res.status(this.HTTP_STATUS.OK).json(sortedUsers);
    }


}

module.exports = UserController;