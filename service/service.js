const fs = require('fs');
require('dotenv').config()

const getParkingLot = () => {
    let fileName = 'parkingLot.json'
    if(process.env.NODE_ENV=='test') 
        fileName = 'testParkingLot.json'
    
    if (!fs.existsSync(fileName))
        fs.writeFileSync(fileName, '{}');
    let parkingLot = fs.readFileSync(fileName, "utf-8")
    return JSON.parse(parkingLot)
}

const saveParkingLot = (data) => {
    let fileName = 'parkingLot.json'
    if(process.env.NODE_ENV=='test') 
        fileName = 'testParkingLot.json'

    fs.writeFileSync(fileName, JSON.stringify(data), "utf-8")
}

const createParkingLot = (slotSize) => {
    let parkingLot = {}
    if(slotSize==0)
    {
        saveParkingLot(parkingLot)
        return null
    }
    let slotList = Array.from(Array(parseInt(slotSize))).map((e, i) => i + 1)
    slotList.forEach(slot => {
        parkingLot[slot] = null
    });
    saveParkingLot(parkingLot)
    return slotSize
}

const parkVehicle = (vehicle) => {
    let parkingLot = getParkingLot()
    if (isFull(parkingLot)) {
        return null;
    }

    let emptySlot = findEmptySlot(parkingLot)
    parkingLot[emptySlot] = vehicle
    saveParkingLot(parkingLot)
    return emptySlot
}

const leaveParkingLot = (slot) => {
    let parkingLot = getParkingLot()
    if (parkingLot[slot] == null) {
        return null
    }

    parkingLot[slot] = null
    saveParkingLot(parkingLot)
    return slot
}

const status = () => {
    let parkingLot = getParkingLot()
    if(parkingLot == {})
        return null;
    let currentStatus = Object.keys(parkingLot)
        .filter(slot => parkingLot[slot] != null)
        .reduce((current, slot) => {
            current[slot] = parkingLot[slot];
            return current;
        }, {});

    return Object.keys(currentStatus).length != 0 ? currentStatus : null
}

const findVehicles = (color) => {
    let parkingLot = getParkingLot()
    let vehicles = Object.keys(parkingLot)
        .filter(slot => parkingLot[slot] != null)
        .filter(slot => {
            return parkingLot[slot].color.toLowerCase() == color.toLowerCase()
        })
        .map(slot => parkingLot[slot].registrationNumber)

    return vehicles.length > 0 ? vehicles : null;
}

const findSlotsByColor = (color) => {
    let parkingLot = getParkingLot()
    let slots = Object.keys(parkingLot)
        .filter(slot => parkingLot[slot] != null)
        .filter(slot => {
            return parkingLot[slot].color.toLowerCase() == color.toLowerCase()
        })

    return slots.length > 0 ? slots : null;
}

const findSlotByRegistration = (regNo) => {
    let parkingLot = getParkingLot()
    let slot = Object.keys(parkingLot)
        .filter(slot => parkingLot[slot] != null)
        .find(slot => {
            return parkingLot[slot].registrationNumber.toLowerCase() == regNo.toLowerCase()
        })
    return typeof slot != "undefined" ? slot : null
}

const isFull = () => {
    let parkingLot = getParkingLot()
    for (let slot of Object.keys(parkingLot)) {
        if (parkingLot[slot] == null)
            return false
    }
    return true
}

const findEmptySlot = (parkingLot) => {
    return Object.keys(parkingLot).find(slot => parkingLot[slot] == null)
}

module.exports = {
    createParkingLot, parkVehicle, leaveParkingLot, status,
    findVehicles, findSlotsByColor, findSlotByRegistration, isFull
}


