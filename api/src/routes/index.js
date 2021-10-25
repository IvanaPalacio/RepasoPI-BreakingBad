const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const router = Router();
const {Occupation, Character, characters_occupation}= require('../db');
const { v4: uuidv4 } = require('uuid');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//--------------------------------Trae la info de la api---------------------------------------
const getApiInfo = async() =>{    //va a llamar al endpoint de la api y me va a traer toda la info que va a necesitar
    const apiUrl = await axios.get(`https://breakingbadapi.com/api/characters`) //genero un mapeo para que me devuelva solo lo que yo necesito traerme desde el back para mi aplicación 
    const apiInfo = await apiUrl.data.map(el =>{  
        return{
            name: el.name,
            image: el.img,
            nickname: el.nickname,
            status:el.status,
            id: el.chard_id,
            birthday: el.birthday,
            occupation: el.occupation.map(el => el),
            appearance: el.appearance.map(el => el),
        };
    });
    return apiInfo;
};

//-----------------------------Trae la info de la Db-----------------------------------------
const getDbInfo = async () => {
    return await Character.findAll({
        include:{
            model: Occupation,
            attibutes: ['name'],
            through: {  //va siempre, es la comprobación cuando me quiero traer un atributo
                attributes: [],
            },
        }
    });
}

//-----------------------------concateno info de la api y la db-------------------------------------
const getAllCharacters = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}
//desde el front tengo el input de búsqueda que trae esta ruta por query
router.get('/characters', async (req,res)=>{
    const name= req.query.name
    let charactersTotal = await getAllCharacters();//trae lo que se concatenó
    if(name){ //si hay un nombre que me pasan por query hago ...
        let characterName = await charactersTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        characterName.length ? //¿encontraste algo acá?
        res.status(200).send(characterName) : 
        res.status(400).send('El personaje no está');
    }else{
        //si no hay un query 
        res.status(200).send(charactersTotal)
    };
});
//-----------Obtengo las ocupaciones desde la api externa, luego las guardo en la Base de datos y las empiezo a utilzar desde allí------------------------------
router.get('/occupations', async (req,res) => {
    const occupationsApi = await axios.get('https://www.breakingbadapi.com/api/characters') //Me trae la info de la api 
    const occupations = occupationsApi.data.map(el => el.occupation)    //la mapea
    const occEach = occupations.map(el => {
        for(let i =0; i < el.length; i++) return el[i]})
        console.log(occEach)
        occEach.forEach(el => {
            Occupation.findOrCreate({   //Hace un 'findOrCreate' dentro del modelo // cuando llamo a la ruta directamente me las guarda en la Db
                where: { name: el } 
            })
        })
        const allOccupations = await Occupation.findAll();  //Me guarda todas esas ocupaciones en el modelo
        res.send(allOccupations);
    })

    //Recibo los datos del formulario desde la ruta de creación del personaje por body//crea un nuevo personaje en la base de datos.
    router.post('/character', async(req, res)=>{ //lo que me llega por body
        try{
            let{
                name,
                nickname,
                birthday,
                image, 
                status,
                createInDb,    
                occupation
            } = req.body
            console.log(req.body)
            let characterCreated = await Character.create({ //Creo el personaje
            id: uuidv4(),
            name,
            nickname,
            birthday,
            image,
            status,
            createInDb
            //no me traigo la occupacion porque tengo que hacer la relación a parte.
            }) 
            //Acá recién me lo traigo del modelo de ocupación porque así se hizo el PI
            await characterCreated.addOccupation(occupation) //eL 'addOccupation' es un método de sequelize,  lo que hace es traerme de la tabla occupations lo que se pasa por paréntesis.
            // const occupationDb = await Occupation.findAll({
            //     where: {name : occupation} //que name sea igual al occupation que me llega por body
            // })
            
            return res.json(characterCreated)
        }catch(error){
            console.log(error)
            return res.status(500).json({error: 'No se pudo crear el personaje'})
        }
});

router.get('/characters/:id', async (req,res) =>{
    const id = req.params.id;
    const charactersTotal = await getAllCharacters();
    if(id){
        let characterId = await charactersTotal.filter(el => el.id == id)
        characterId.length?
        res.status(200).json(characterId) :
        res.status(404).send('No encontré ese personaje')
    }
})

//--------------------------------------------------------------------------------------------------------------------
module.exports = router;

