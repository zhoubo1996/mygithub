let sqlMap = {
    user:{
        add:'insert into user(username, password,id) values (?, ?, ?)',
        queryAll: 'SELECT * FROM user',
        queryByUsername: 'SELECT * FROM user WHERE username = ?',
        upUserByUsername: 'UPDATE user SET username = ?,password = ? WHERE id = ?',
        deleteUser:'DELETE FROM user WHERE id = ? '
    }
}
module.exports = sqlMap;