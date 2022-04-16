const express = require('express')
const query = require('../db/query')

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        let name = req.body.name
        await query(`insert into users(name) value('${name}')`)
        res.json({
            status: 0
        })
    } catch(e) {
        console.log(e)
        res.json({
            status: 1,
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id
        await query(`delete from users where id=${id}`)
        res.json({
            status: 0
        })
    } catch(e) {
        console.log(e)
        res.json({
            status: 1,
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        let id = req.params.id
        let name = req.body.name
        await query(`update users set name='${name}' where id=${id}`)
        res.json({
            status: 0
        })
    } catch(e) {
        console.log(e)
        res.json({
            status: 1,
        })
    }
})

router.get('/', async (req, res) => {
    try {
        let limit = req.query.perPage
        let offset = (req.query.page - 1) * req.query.perPage
        let items = await query(`select * from users order by id limit ${limit} offset ${offset}`)
        let total = await query(`select count(*) from users`)
        total = total[0]['count(*)']
        res.json({
            status: 0,
            data: {
                items,
                total
            }
        })
    } catch(e) {
        console.log(e)
        res.json({
            status: 1,
        })
    }
})

module.exports = router