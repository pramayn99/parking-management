const assert = require('assert');
const Vehicle = require('./models/vehicleModel')
const parkingService = require('./service/service')

describe('Parking Service Test', function () {

    describe('Create a Parking Lot', function () {
        it('Should return null if slot size is 0', function () {
            assert.equal(parkingService.createParkingLot(0), null);
        });
    });

    describe('Park a vehicle', function () {
        it('Should return null if parking is full', function () {
            parkingService.createParkingLot(3)
            parkingService.parkVehicle(new Vehicle("KA-03-HY-3786","Red"))
            parkingService.parkVehicle(new Vehicle("KA-03-HY-3785","Red"))
            parkingService.parkVehicle(new Vehicle("KA-03-HY-3784","Red"))
            assert.equal(parkingService.parkVehicle(new Vehicle("KA-03-HY-3234","Red")), null);
        });
    });

    describe('Leave Parking', function () {
        it('Should return null if slot is already empty', function () {
            parkingService.createParkingLot(2)
            parkingService.parkVehicle(new Vehicle("KA-03-HY-3786","Red"))
            assert.equal(parkingService.leaveParkingLot(2), null);
        });
    });

    describe('Parking Status', function () {
        it('Should return null if parking lot is not created', function () {
            parkingService.createParkingLot(0)
            assert.equal(parkingService.status(), null);
        });
    });

    describe('Find a vehicle in parking lot by color', function () {
        it('Should return null if no vehicles with given color are found', function () {
            parkingService.createParkingLot(3)
            parkingService.parkVehicle(new Vehicle("KA-03-HY-3786","Red"))
            parkingService.parkVehicle(new Vehicle("KA-03-HY-3785","Blue"))
            parkingService.parkVehicle(new Vehicle("KA-03-HY-3784","Red"))
            assert.equal(parkingService.findVehicles("Black"), null);
        });
    });

    describe('Find all the slots by vehicle color', function () {
        it('Should return null if no slots with given vehicle color are found', function () {
            parkingService.createParkingLot(3)
            parkingService.parkVehicle(new Vehicle("KA-03-HY-3786","Red"))
            parkingService.parkVehicle(new Vehicle("KA-03-HY-3785","Blue"))
            parkingService.parkVehicle(new Vehicle("KA-03-HY-3784","Red"))
            assert.equal(parkingService.findVehicles("Black"), null);
        });
    });

    describe('Find slot by registration number', function () {
        it('Should return null if queried vehicle is not present in lot', function () {
            parkingService.createParkingLot(3)
            parkingService.parkVehicle(new Vehicle("KA-03-HY-3786","Red"))
            parkingService.parkVehicle(new Vehicle("KA-03-HY-3785","Blue"))
            parkingService.parkVehicle(new Vehicle("KA-03-HY-3784","Red"))
            assert.equal(parkingService.findSlotByRegistration("KA-03-HY-3789"), null);
        });
    });

});