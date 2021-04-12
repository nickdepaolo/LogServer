const Express = require('express');
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt");
const { LogModel } = require('../models');

/*

Create Log

*/
router.post('/', validateJWT, async (req, res) => {
    const {description, definition, result} = req.body.journal;
    const {id} = req.user;
    const logEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try {
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err){
        res.status(500).json({ error: err});
    }
    LogModel.create(logEntry)
});


/*

Get All Journals by User

*/
router.get("/", validateJWT, async (req, res) => {
    try {
        const userLogs = await LogModel.findAll();
        res.status(200).json(userLogs);
    } catch (err){
        res.status(500).json({ error: err})
    }
});

/*

Get Logs by ID

*/
router.get("/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const results = await LogModel.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(results);
    } catch (err){
        res.status(500).json({ error: err});
    }
});

/*

Update a Log

*/
router.put("/update/:Id", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const logId = req.params.Id;
    const userId = req.user.id;

    const query = {
        where: {
            id: logId,
            owner: userId
        }
    };

    const updatedLog = {
        description: description,
        definition: definition,
        result: result
    };

    try {
        const update = await LogModel.update(updatedLog, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err})
    }
});

/*

Delete a Log

*/
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const logId = req.params.id;

    try{
        const query = {
            where: {
                id: logId,
                owner: ownerId
            }
        };
        
        await LogModel.destroy(query);
        res.status(200).json({ message: "Log Entry Removed"});
    } catch (err){
        res.status(500).json({ error: err})
    }
})
module.exports = router;