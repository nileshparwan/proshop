import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'admin user',
        email: 'pampersqa@gmail.com',
        password: bcrypt.hashSync('Testing123', 10),
        isAdmin: true
    },
    {
        name: 'guest1',
        email: 'pampers@gmail.com',
        password: bcrypt.hashSync('Testing123', 10),
        isAdmin: false
    }
]

export default users;