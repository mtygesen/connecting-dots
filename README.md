
![Jest test](https://github.com/icecoldgold773/p2-project/actions/workflows/jest.yml/badge.svg?event=push) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Connecting Dots 

This repository houses a 2. semester project created by a group of computer science students from Aalborg University. The project's main objective is to enhance the understanding of non-domain experts in supervised machine learning. To achieve this, the group has developed a website that visualizes feature maps, loss, and accuracy metrics from various pre-trained convolutional neural network models. The user can choose from a set of models trained on the MNIST dataset, and the metrics for the selected model will then be shown. Additionally, users can choose a random image from the MNIST test set or draw their own. This will then display the first layer of feature maps along the model's prediction. This enables the user to compare different models and evaluate their performances, facilitating a better understanding of the underlying concepts.

## Install

### Dependencies

- ```Node.js v18+```
- ```npm 9.x```

### Steps

When the dependencies are met, you can setup the project in a local environment with the following steps:

1) Install the zip archive from the main branch.
2) Cd into the ```src``` folder using a terminal.
3) Install libraries using: ```npm i```.
4) Now start the local server using: ```node server.js```.
5) Open a browser and go to ```localhost:3040```.

## Training new Models

### Steps

Training new models using the trainer program takes quite a long time, even on a good CPU. However, if you would like to experiment with training your own models, it can be done with the following steps:

1) Cd into the ```trainer``` folder using a terminal.
2) Edit the parameters of the model in ```model_settings.json```.
3) Run the ```node generate_model.js``` command.
4) The model will be saved in the ```models/``` folder when done.
