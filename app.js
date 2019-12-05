#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const service = require('./service/service');
const Vehicle = require('./models/vehicleModel');
const questions = require('./questions/questions');


const printStatus = (parkingLot) => {
    if (!parkingLot)
        console.log("Parking lot is empty.")
    else {
        console.log("SLOT No.\tREGISTRATION No.\tCOLOR")
        console.log("---------------------------------------------")
        for (let [slot, vehicle] of Object.entries(parkingLot)) {
            console.log(`${slot}\t\t${vehicle.registrationNumber}\t\t${vehicle.color}`)
        }
    }
}

program
    .version('1.0.0')
    .description('Parking management System');

program
    .command('create-parking-lot')
    .description('Create a parking lot with n <slots>')
    .action(() => {
        prompt(questions.createParkingLotQ)
            .then(answer => {
                service.createParkingLot(answer.slots)
                console.log(`Created a parking lot with ${answer.slots} slots`)
            })
    });

program
    .command('park-vehicle')
    .description('Park a vehicle')
    .action(() => {
        if(service.isFull())
            console.log(`Parking lot is full`)
        else
            prompt(questions.parkVehicleQ)
                .then(answer => {
                    let slot = service.parkVehicle(new Vehicle(answer.registrationNumber, answer.color))
                    console.log(`Alloted slot ${slot}`)
                })
    });

program
    .command('leave-parking')
    .description('Leave Parking')
    .action(() => {
        prompt(questions.leaveParkingQ)
            .then(answer => {
                let slot = service.leaveParkingLot(answer.slot)
                if (slot)
                    console.log(`Slot ${slot} is free`)
                else
                    console.log(`Slot is already empty`)
            })
    });

program
    .command('parking-status')
    .description('Current status of Parking')
    .action(() => {
        let parkingLot = service.status()
        printStatus(parkingLot)
    });

program
    .command('find-vehicle-by-color')
    .description('Find a vehicle in parking lot by color')
    .action(() => {
        prompt(questions.findVehicleByColorQ)
            .then(answer => {
                let vehicles = service.findVehicles(answer.color)
                if (vehicles)
                    vehicles.forEach(vehicle => console.log(vehicle))
                else
                    console.log(`Vehicle with color ${answer.color} not found`)
            })
    });

program
    .command('find-slots-by-color')
    .description('Find all the slots by vehicle color')
    .action(() => {
        prompt(questions.findSlotsByColorQ)
            .then(answer => {
                let slots = service.findSlotsByColor(answer.color)
                if (slots)
                    slots.forEach(slot => console.log(slot))
                else
                    console.log(`Slots with vehicle color ${answer.color} not found`)
            })
    });

program
    .command('find-slot-by-registration')
    .description('Find slot by registration number')
    .action(() => {
        prompt(questions.findSlotsByRegistrationQ)
            .then(answer => {
                let slot = service.findSlotByRegistration(answer.regNo)
                if (slot)
                    console.log(slot)
                else
                    console.log(`Slot with vehicle Registration number: ${answer.color} not found`)
            })
    });

program.parse(process.argv);