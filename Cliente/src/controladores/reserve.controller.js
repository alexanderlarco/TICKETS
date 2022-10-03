const Reserve = {};
const sql = require('../configuracionBaseDatos/baseDatos.sql');
const orm = require('../configuracionBaseDatos/baseDatos.orm');


Reserve.getIndex = async (req, res) => {
    const user = req.user || null;

    const reserves = await orm.reserve.findAll({
        where:{
            clientId: user.id,
            status: 'Ingresada',
            state: 1
        },
        raw: true
    })

    const history = await orm.reserve.findAll({
        where:{
            clientId: user.id,
            status:'Confirmada',
            state: 1
        },
        raw: true
    })
    res.render('reserve/index', {user,reserves,history});
}

Reserve.getNewView = async (req, res) => {
    const cities = await sql.query('SELECT city FROM province_city WHERE idProvince > 0');
    const user = req.user || null;
    res.render('reserve/newReserve', {user, cities});

}

Reserve.getTimeAvailable = async (req, res) => {
    let info = req.body;
    let availableTime = [];
    const timeBus = await orm.timeBus.findAll({
        where: {
            dateStart: info.date
        },
        raw: true
    }).then((res) => {
        return res;
    }).catch((err) => {
        console.log('err', err)
        return null
    });

    const cities = await sql.query('SELECT city FROM province_city WHERE idProvince > 0');
    const user = req.user || null;
    if (!timeBus) {
        availableTime = null
        res.render('reserve/newReserve', {user, cities, availableTime});
    }
    let rootBus = []
    for (const time of timeBus) {
        let root = await orm.root.findOne({
            where: {
                origin: info.origin,
                destiny: info.destiny,
                id: time.idRoot
            },
            raw: true
        }).then(res => {
            return res
        }).catch((err) => {
            console.log(err)
            return null
        });
        let total = root.priceComplete * info.passenger
        let totalC = root.priceMiddle * info.child
        time.root = {...root,subTotal: totalC+total}

        let bus = await orm.bus.findOne({
            where: {
                id: time.idBus
            },
            raw: true
        }).then(async res => {
            let driver = await orm.driver.findOne({
                where: {
                    id: res.idDriver
                },
                raw: true
            }).then(res => {
                return res
            }).catch((err) => {
                console.log(err)
                return null
            });
            res.driver = driver
            return res
        }).catch((err) => {
            console.log(err)
            return null
        });
        time.bus = bus
    }

    rootBus = [...timeBus]

    if (!rootBus) {
        availableTime = null
        res.render('reserve/newReserve', {user, cities, availableTime});
    }
    availableTime = [...rootBus]
    res.render('reserve/newReserve',{user,cities,availableTime,info })

}

Reserve.create= async (req,res)=>{
    console.log('-----------req',req.body);
    const data = req.body
    const infoInsert = {
        dateStart: data.date,
        numChild: data.child,
        numAdult: data.adult,
        subTotal:data.subTotal,
        idTime: data.idTime,
        clientId: req.user.id
    }

    const reserve = await orm.reserve.create(infoInsert).then(res=>{
        return res
    }).catch(err=>{
        console.log('err create', err)
        return null
    })
    console.log('-----------data',infoInsert);


    res.redirect("/reserve/");

}
module.exports = Reserve