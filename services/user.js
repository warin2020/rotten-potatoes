const fs = require('fs')
const path = require('path')
const query = require('../db/query')

const userInfo = async(user_id) => {
    let [ user ] = await query(`select avatar_url, name from users where id=${user_id}`)
    user.comments = await query(`select m.id, m.name, m.cover_url, c.rate, c.content, c.comment_date from movies m inner join comments c on m.id=c.movie_id where c.user_id=${user_id}`)
    return user
}

const getUserInfo = async(req, res, next) => {
    try {
        let user_id = req.params.id
        let user = await userInfo(user_id)
        res.json({
            status: 0,
            data: user
        })
    } catch(e) {
        next(e)
    }
}

const getMeInfo = async(req, res, next) => {
    try {
        let user = await userInfo(req.user_id)
        res.json({
            status: 0,
            data: user
        })
    } catch(e) {
        next(e)
    }
}

const changeMeAvatar = async(req, res, next) => {
    try {
        let [ { avatar_url } ] = await query(`select avatar_url from users where id=${req.user_id}`)
        await query(`update users set avatar_url='images/${req.file.filename}' where id=${req.user_id}`)
        if (avatar_url !== null) fs.unlinkSync(path.join(__dirname, '..', 'public', avatar_url))
        res.json({
            status: 0
        })
    } catch(e) {
        next(e)
    }
}

const changeMeName = async(req, res, next) => {
    try {
        let { new_name } = req.body
        let user = await query(`select * from users where name='${new_name}'`)
        if (user.length >= 1) {
            res.json({
                status: 1,
                msg: 'user name already exists'
            })
            return
        }
        await query(`update users set name='${new_name}' where id=${req.user_id}`)
        res.json({
            status: 0,
            msg: 'name changed successfully'
        })
    } catch(e) {
        next(e)
    }
}

const changeMePassword = async(req, res, next) => {
    try {
        let { old_password, new_password } = req.body
        let [ { password } ] = await query(`select password from users where id='${req.user_id}'`)
        if (password !== old_password) {
            res.json({
                status: 1,
                msg: 'wrong old password'
            })
            return
        }
        await query(`update users set password='${new_password}' where id=${req.user_id}`)
        res.json({
            status: 0,
            msg: 'password changed successfully'
        })
    } catch(e) {
        next(e)
    }
}

module.exports = {
    getUserInfo,
    getMeInfo,
    changeMeAvatar,
    changeMeName,
    changeMePassword
}