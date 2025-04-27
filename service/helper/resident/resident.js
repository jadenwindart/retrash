const {Resident} = require('../../repository/model/resident')

module.exports.GetAllResident = async () => {
    console.log("Get All Resident");
    console.log(Resident);
    const residents = await Resident.findAll().catch(err => {
        console.log(err)
    });

    return residents
}