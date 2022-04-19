const query = require('../db/query')

const listActors = async(req, res) => {
    try {
        let limit = req.query.perPage
        let offset = (req.query.page - 1) * req.query.perPage
        let items = await query(`select id, name, photo_url from actors order by id limit ${limit} offset ${offset}`)
        let total = await query(`select count(*) from actors`)
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
}

const getActorDetail = async(req, res) => {
    try {
        let actor_id = req.params.id
        let [ actor ] = await query(`select * from actors where id=${actor_id}`)
        actor.movies = await query(`select m.id, m.name, m.cover_url from movies as m inner join characters as c on m.id=c.movie_id where c.actor_id=${actor_id}`)
        res.json({
            status: 0,
            data: actor
        })
    } catch(e) {
        console.log(e)
        res.json({
            status: 1
        })
    }
}

module.exports = {
    listActors,
    getActorDetail
}