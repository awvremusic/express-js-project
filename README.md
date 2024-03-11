# People's Favorite Colors

This project is an example Express.js project using the Firebase Firestore database and showing how to make a quick API and serve HTML through the server-side. This project also uses Google App Engine to run a virtually penniless container in the GCP platform.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [License](#license)

## Installation

1. yarn install
2. Create a new GCP project and connect it to Firebase
3. Create a new Web App to get the Firebase App credentials
4. Create a new service account through the project settings in Firebase for the firebase-admin credentials
5. Download the service key file and put it in the root directory of this project. Rename it to firebase_credentials.json
6. Replace the firebase app content in the firebase-config with the Firebase App Credentials from Step 3
7. You should be able to start the project and add some favorite colors for your favorite people!

## Usage

You can add and delete a Person and their favorite color. It is linked to a Firestore database and will update over time (every 10 seconds currently).

## Features

List of features or functionalities of the project.

## License

MIT

