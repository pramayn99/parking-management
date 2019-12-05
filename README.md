# parking-management

*parking-management* is an interactive CLI application that helps you manage the parking. It provide features like alloting a parking slot to vehicle, find vehicles by color, find parking slots by vehicle color, check current status of parking etc. It was made using Commmander and Inquirer npm libraries.

## Installation

Clone the repository and install dependencies.

```bash
git clone https://github.com/pramayn99/parking-management.git
npm install
```
## Make the module global

Make the module global by running this command.

```bash
npm link
```

## Usage

```bash
> parking-management --help

 Usage: app [options] [command]

Parking management System

Options:
  -V, --version              output the version number
  -h, --help                 output usage information

Commands:
  create-parking-lot         Create a parking lot with n <slots>
  park-vehicle               Park a vehicle
  leave-parking              Leave Parking
  parking-status             Current status of Parking
  find-vehicle-by-color      Find a vehicle in parking lot by color
  find-slots-by-color        Find all the slots by vehicle color
  find-slot-by-registration  Find slot by registration number
```