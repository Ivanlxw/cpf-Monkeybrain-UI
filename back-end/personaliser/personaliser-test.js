'use strict';

// <Dependencies>
const uuidv1 = require('uuid/v1');
const Personalizer = require('@azure/cognitiveservices-personalizer');
const CognitiveServicesCredentials = require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;
const readline = require('readline-sync');
const azure_secrets = require('../azure-secrets');
// </Dependencies>

const PERSONALIZER_KEY = azure_secrets.API_KEY;
const PERSONALIZER_ENDPOINT = azure_secrets.ENDPOINT;

/**
 * TODO: Train personaliser using the input as well as modify profile
 * Loop has been removed as it will be called each time user clicks
 * @param {req} selectedService the service that the user clicks on
 */
exports.trainer = async (req, res) => {

  // <AuthorizationVariables>
  // The key specific to your personalization service instance; e.g. "0123456789abcdef0123456789ABCDEF"
  let serviceKey = PERSONALIZER_KEY;

  // The endpoint specific to your personalization service instance; 
  // e.g. https://westus2.api.cognitive.microsoft.com
  let baseUri = PERSONALIZER_ENDPOINT;
  // </AuthorizationVariables>

  // <Client>
  let credentials = new CognitiveServicesCredentials(serviceKey);

  // Initialize Personalization client.
  let personalizerClient = new Personalizer.PersonalizerClient(credentials, baseUri);
  // </Client>

  try {
    // <JSON>
    let fs = require('fs');
    let data = fs.readFileSync('./Profile_Arun.json', 'utf8');
    let profile = JSON.parse(data);
    //console.log(words.Age);
    // </JSON>


    // <mainLoop>
    let runLoop = true;


    // <rank>
    let rankRequest = {};

    // Generate an ID to associate with the request.
    rankRequest.eventId = uuidv1();

    // Get context information from the user.
    rankRequest.contextFeatures = getContextFeaturesList(profile);

    // Get the actions list to choose from personalization with their features.
    rankRequest.actions = getActionsList();

    // Exclude an action for personalization ranking. This action will be held at its current position.
    rankRequest.excludedActions = getExcludedActionsList();

    rankRequest.deferActivation = false;

    // Rank the actions
    let rankResponse = await personalizerClient.rank(rankRequest);
    // </rank>

    // console.log("\nPersonalization service thinks you would like to have:\n")
    // console.log(rankResponse.rewardActionId);

    // Display top choice to user, user agrees or disagrees with top choice
    let reward = getReward(rankResponse.rewardActionId, req.body.selectedService);

    // console.log("\nPersonalization service ranked the actions with the probabilities as below:\n");
    // for (var i = 0; i < rankResponse.ranking.length; i++) {
    //   console.log(JSON.stringify(rankResponse.ranking[i]) + "\n");
    // }

    // Send the reward for the action based on user response.

    // <reward>
    let rewardRequest = {
      value: reward
    };

    await personalizerClient.events.reward(rankRequest.eventId, rewardRequest);

    return res.json({ status: 200 })
  } catch (err) {
    return res.status(400).json({ error: err })
  }
  // </reward>

  // </mainLoop>
}

/** Front end calls this to load the initial personalised services */
exports.initialRun = async (req, res) => {
  // <AuthorizationVariables>
  // The key specific to your personalization service instance; e.g. "0123456789abcdef0123456789ABCDEF"
  let serviceKey = PERSONALIZER_KEY;

  // The endpoint specific to your personalization service instance; 
  // e.g. https://westus2.api.cognitive.microsoft.com
  let baseUri = PERSONALIZER_ENDPOINT;
  // </AuthorizationVariables>

  // <Client>
  let credentials = new CognitiveServicesCredentials(serviceKey);

  // Initialize Personalization client.
  let personalizerClient = new Personalizer.PersonalizerClient(credentials, baseUri);
  // </Client>

  // <JSON>
  let fs = require('fs');
  let data = fs.readFileSync('./Profile_Arun.json', 'utf8');
  let profile = JSON.parse(data);
  //console.log(words.Age);
  // </JSON>

  // <rank>
  let rankRequest = {};

  // Generate an ID to associate with the request.
  rankRequest.eventId = uuidv1();

  // Get context information from the user.
  rankRequest.contextFeatures = getContextFeaturesList(profile);

  // Get the actions list to choose from personalization with their features.
  rankRequest.actions = getActionsList();

  // Exclude an action for personalization ranking. This action will be held at its current position.
  rankRequest.excludedActions = getExcludedActionsList();

  rankRequest.deferActivation = false;

  // Rank the actions
  let rankResponse = await personalizerClient.rank(rankRequest);

  return res.json({ data: rankResponse })
}

// <continueLoop>
function continueLoop() {
  var answer = readline.question("\nPress q to break, any other key to continue.\n")
  if (answer.toLowerCase() === 'q') {
    return false;
  }
  return true;
}
// </continueLoop>

/** Change this */
// <getReward>
function getReward_Old() {
  var answer = readline.question("\nIs this correct (y/n)\n");
  if (answer.toLowerCase() === 'y') {
    console.log("\nGreat| Enjoy your service.");
    return 1;
  }
  console.log("\nYou didn't like the recommended choice.");
  return 0;
}

function getReward(guessedAnswer, correctAnswer) {
  if (guessedAnswer === correctAnswer) {
    return 1;
  }
  return 0;
}
// </getReward>


// <createUserFeatureTimeOfDay>
function getContextFeaturesList_Original() {
  var timeOfDayFeatures = ['morning', 'afternoon', 'evening', 'night'];
  var tasteFeatures = ['salty', 'sweet'];

  var answer = readline.question("\nWhat time of day is it (enter number)? 1. morning 2. afternoon 3. evening 4. night\n");
  var selection = parseInt(answer);
  var timeOfDay = selection >= 1 && selection <= 4 ? timeOfDayFeatures[selection - 1] : timeOfDayFeatures[0];

  answer = readline.question("\nWhat type of food would you prefer (enter number)? 1. salty 2. sweet\n");
  selection = parseInt(answer);
  var taste = selection >= 1 && selection <= 2 ? tasteFeatures[selection - 1] : tasteFeatures[0];

  console.log("Selected features:\n");
  console.log("Time of day: " + timeOfDay + "\n");
  console.log("Taste: " + taste + "\n");

  return [
    {
      "time": timeOfDay
    },
    {
      "taste": taste
    }
  ];
}
// </createUserFeatureTimeOfDay>

// <createUserFeatureTimeOfDay>
function getContextFeaturesList(profile) {
  //var timeOfDayFeatures = ['morning', 'afternoon', 'evening', 'night'];
  //var tasteFeatures = ['salty', 'sweet'];
  //var answer = readline.question("\nWhat time of day is it (enter number)? 1. morning 2. afternoon 3. evening 4. night\n");
  //var selection = parseInt(answer);
  //var timeOfDay = selection >= 1 && selection <= 4 ? timeOfDayFeatures[selection - 1] : timeOfDayFeatures[0];
  //answer = readline.question("\nWhat type of food would you prefer (enter number)? 1. salty 2. sweet\n");
  //selection = parseInt(answer);
  //var taste = selection >= 1 && selection <= 2 ? tasteFeatures[selection - 1] : tasteFeatures[0];

  //console.log("Selected features:\n");
  //console.log("Time of day: " + timeOfDay + "\n");
  //console.log("Taste: " + taste + "\n");

  let my_Name = profile.Name;
  let my_Age = parseInt(profile.Age);
  let my_Gender = parseInt(profile.Gender);
  let my_Race = profile.Race;
  let my_Children = parseInt(profile.Children);
  let my_Married = parseInt(profile.Married);
  let my_Income = parseInt(profile.Income);
  let my_Employment_status = parseInt(profile.Employment_Status);
  let my_Sickness_urgency = parseInt(profile.Sickness_Urgency);
  let my_Investment_interest = parseInt(profile.Investment_interest);
  let my_Generosity = parseInt(profile.Generosity);

  return [
    {
      "Age": my_Age
    },
    {
      "Gender": my_Gender
    },
    {
      "Race": my_Race
    },
    {
      "Children": my_Children
    },
    {
      "Married": my_Married
    },
    {
      "Income": my_Income
    },
    {
      "Employment_Status": my_Employment_status
    },
    {
      "Sickness_urgency": my_Sickness_urgency
    },
    {
      "Investment_interest": my_Investment_interest
    },
    {
      "Generosity": my_Generosity
    }
  ];
}
// </createUserFeatureTimeOfDay>

function getExcludedActionsList() {
  return [
    "Name"
  ];
}

// <getActions>
function getActionsList_Original() {
  return [
    {
      "id": "pasta",
      "features": [
        {
          "taste": "salty",
          "spiceLevel": "medium"
        },
        {
          "nutritionLevel": 5,
          "cuisine": "italian"
        }
      ]
    },
    {
      "id": "ice cream",
      "features": [
        {
          "taste": "sweet",
          "spiceLevel": "none"
        },
        {
          "nutritionalLevel": 2
        }
      ]
    },
    {
      "id": "juice",
      "features": [
        {
          "taste": "sweet",
          "spiceLevel": "none"
        },
        {
          "nutritionLevel": 5
        },
        {
          "drink": true
        }
      ]
    },
    {
      "id": "salad",
      "features": [
        {
          "taste": "salty",
          "spiceLevel": "low"
        },
        {
          "nutritionLevel": 8
        }
      ]
    }
  ];
}
// </getActions>

// <getActions>
function getActionsList() {
  return [
    {
      "id": "Apply HDB",
      "features": [
        {
          "Married": 1,
          "Children": 1,
          "Employment Status": 1
        }
      ]
    },
    {
      "id": "Withdraw from CPF",
      "features": [
        {
          "Age": 65,
          "Sickness_Urgency": 1,
          "Employment_Status": 0
        }
      ]
    },
    {
      "id": "Invest Money",
      "features": [
        {
          "Age": 30,
          "Children": 1,
          "Income":
              {
                "minimum": 5000,
                "maximum": 1000000
              }
        }
      ]
    },
    {
      "id": "Contribute CPF for employees",
      "features": [
        {
          "Investment_interest": 1,
          "Generosity": 2,
          "Income":
              {
                "Minimum": 10000,
                "Maximum": 10000000
              }
        }
      ]
    },
    {
      "id": "Claim Medisave",
      "features": [
        {
          "Sickness_urgency": 1,
          "Generosity": 1
        }
      ]
    },
    {
      "id": "Claim Eldershield",
      "features": [
        {
          "Sickness_urgency": 1,
          "Age": 60,
          "Married": 1,
          "Income": 2000
        }
      ]
    },
    {
      "id": "Apply Private Medical Insurance",
      "features": [
        {
          "Employment_Status": 2
        }
      ]
    },
    {
      "id": "Check Medishield",
      "features": [
        {
          "Age": 40,
          "Income": 1500,
          "Sickness_urgency": 1
        }
      ]
    }
  ];
}
// </getActions>

// <callMain>
// var program = main()
// .then(result => console.log("done"))
// .catch(err=> console.log(err));
// </callMain>
