![Jest test](https://github.com/icecoldgold773/connecting-dots/actions/workflows/jest.yml/badge.svg?event=push) ![ES Lint](https://github.com/icecoldgold773/connecting-dots/actions/workflows/lint.yml/badge.svg?event=push) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<img src="https://github.com/icecoldgold773/connecting-dots/blob/main/node/public/img/NN.png" alt="Connecting Dots Logo" width="250">

# Connecting Dots 

This repository contains a 2. semester project made by a group of computer science students from Aalborg University. The project's main objective is to enhance the understanding of non-domain experts in supervised machine learning. 

To achieve this, the group has developed a website that visualizes feature maps, loss, and accuracy metrics from various pre-trained convolutional neural network models. The user can choose from a set of models trained on the MNIST dataset, and the metrics for the selected model will then be shown. Additionally, users can choose a random image from the MNIST test set or draw their own. Selecting or drawing a digit will display the first layer of feature maps along the model's prediction. Displaying the feature maps and predictions enables the user to compare different models and evaluate their performances, facilitating a better understanding of the underlying concepts.

## Live Demo

A live demo of this project is currently hosted at: https://cs-23-dat-2-04.p2datsw.cs.aau.dk/node0/

## Install and Run Locally

### Dependencies

- ```Node.js v18+```
- ```npm 9.x```

### Steps

When the dependencies are met, the project can be set up in a local environment with the following steps:

1) Install the zip archive from the main branch.
2) Cd into the "`src` "folder.
3) Install libraries using: "`npm i'. "
4) Start the local server using: "`node server.js` ".
5) Open a browser and go to "`localhost:3040` ".

## Training New Models

### Steps

Training new models using the trainer program takes quite a long time, even on a good CPU. However, if one would like to experiment with training new models, it can be done with the following steps:

1) Cd into the "`trainer` "folder.
2) Edit the model's parameters in "`model_settings.json` ".
3) Run the ```node generate_model.js``` command.
4) When done, the model will be saved in the "`models/` "folder.

### Model Settings

Inputting invalid settings could lead to "`undefined behavior` "since there is no validation on most settings.

 - The ```"activation"``` key has three different settings available: ```sigmoid```, ```tanh```, and ```relu```.

 - The ``` "trainingMethod" ``` and the training-related settings: "`l2Decay` ", "`l1Decay` ", "`learningRate` ", and "`momentum` "should generally not be changed unless you are already fairly acquainted with different machine learning training methods. The supported training methods are: "`adadelta` ", "`adagrad` ", and "`sgd` ".
 - The max ```"trainingSize"``` is 60000, and the max ```testSize``` is 10000.
 - The ``` "augment" ``` key determines if the training data should be augmented to improve generalization. Setting the augment key to true means that the images will be cropped to a "`24x24` "image with a random offset from "`-2` "to "`+2` "pixels. Additionally, there is a "`50%` "chance that the input image will be flipped horizontally. However, in our tests, this has yet to have any meaningful improvements. It has only caused the accuracy of models to go down.
 - Keeping the ``` "logInterval" ``` to "`trainingSize / 100` "is recommended since logging the accuracy is very expensive, taking polynomial time. To turn logging of completely one could set the ```"logInterval"``` to ```false```
 - The ``` "hiddenLayers" ``` key determines an array that determines how many neurons there will be in the given layer. The length of the array tells us how many layers there are in total, e.g. ``` "hiddenLayers": [10]` "will make one hidden layer of size ten neurons.
 - Setting the ``` "formattedOutput" ``` key to true is useful for experimenting since it makes the "`JSON` "easy to read.

### Usage
To actually use a new model, one of the buttons that load the model in the ```index.html``` would have to be changed to the appropriate model name. This is something that could be made more user-friendly in the future. 
