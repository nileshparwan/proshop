import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'admin user',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'guest1',
        email: 'guest1@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
    {
        name: 'guest2',
        email: 'guest2@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    }
]

export default users;