const{
    getFlightPrice
} = require("./price.service");

module.exports = {
    getFlightPrice : async(req, res)=>{
        try{
            const { source, destination, date } = req.query;
            if(!source || !destination || !date) return res.json({
                success: false,
                message: "Parameters missing"
            })
            const params = { source, destination, date };
            const data = await getFlightPrice(params);
            return res.json(data);
        }catch(err){
            console.log(err);
            return res.json({
                success: false,
                message: "Something went wrong"
            });
        }
    }
}