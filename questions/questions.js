
// Questions to be asked by user for parking-management

exports.createParkingLotQ = [
    {
        type: 'input',
        name: 'slots',
        message: 'Enter slots: '
    }
];

exports.parkVehicleQ = [
    {
        type: 'input',
        name: 'registrationNumber',
        message: 'Enter registration number: '
    },
    {
        type: 'input',
        name: 'color',
        message: 'Enter color: '
    }
];

exports.leaveParkingQ = [
    {
        type: 'input',
        name: 'slot',
        message: 'Enter slot: '
    }
];

exports.findVehicleByColorQ = [
    {
        type: 'input',
        name: 'color',
        message: 'Enter color: '
    }
];

exports.findSlotsByColorQ = [
    {
        type: 'input',
        name: 'color',
        message: 'Enter color: '
    }
];

exports.findSlotsByRegistrationQ = [
    {
        type: 'input',
        name: 'regNo',
        message: 'Enter registration no.: '
    }
];




