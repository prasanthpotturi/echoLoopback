// This sample demonstrates getting location,date,time,duration from an Alexa skill in single or multiple utterances.

const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
    console.log("-----LaunchRequestHandler-----",JSON.stringify(handlerInput.requestEnvelope));
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak("Welcome to Echo Location skill")
            .reprompt("What would you like to ask?")
            .getResponse();
    }
};
const EchoLocationIntentHandler = {
    canHandle(handlerInput) {
       return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EchoLocationIntent';
    },
    handle(handlerInput) {
    try{
       const slotValues = getSlotValues(handlerInput.requestEnvelope.request.intent.slots,handlerInput);
       console.log("-----EchoLocationIntentHandler-----",JSON.stringify(handlerInput.requestEnvelope));
       console.log("slotValues: ",JSON.stringify(slotValues));
       if (slotValues.reprompt === "NA") {
          return handlerInput.responseBuilder
             .speak(slotValues.voice)
             .getResponse();
       }
       else {
         return handlerInput.responseBuilder
            .speak(slotValues.voice)
            .reprompt(slotValues.reprompt)
            .getResponse();
       }
    }
    catch (error) {
             console.log("EchoLocationIntentHandler  error",error);
             if (error.name !== 'ServiceError') {
               console.log('error',error);
               return handlerInput.responseBuilder.speak('error in Echo Location Handler').getResponse();
             }
           throw error;
          }
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
     console.log("-----SessionEndedRequestHandler-----",JSON.stringify(handlerInput.requestEnvelope));
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};
const NavigateHomeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getRequestType(handlerInput.requestEnvelope) === 'AMAZON.NavigateHomeIntent';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        const speakOutput = 'Hi, How can I help you today!';
        return handlerInput.responseBuilder
        .speak(speakOutput)
        .getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        console.log("-----IntentReflectorHandler-----",JSON.stringify(handlerInput.requestEnvelope));
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak('you are in reflector')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
    console.log("-----ErrorHandler-----",JSON.stringify(handlerInput.requestEnvelope));
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

function getSlotValues(filledSlots,handlerInput) {
  const slotValues = {};
  var voice = '';
  var reprompt = '';
  var filledSlots = persistSlotInSession(filledSlots,handlerInput);
  console.log(`The filled slots: ${JSON.stringify(filledSlots)}`);
  Object.keys(filledSlots).forEach((item) => {
    if (filledSlots[item] && filledSlots[item].value) {
        slotValues[item] = filledSlots[item].value;
        if (item === 'address' || item === 'location'){
            voice  = voice + filledSlots[item].value +'';
       }
    }
    else{
        slotValues[item] = "NA";
        if (item === 'address' && slotValues.location ==='NA'){
            reprompt = reprompt + 'location ';
        }
        if (item !== 'location' && item !== 'address'){
            reprompt = reprompt + item + ', ';
        }
    }
  }, this);

  if (reprompt === '') {
        slotValues["voice"] = `finding parking near ${voice} `;
        slotValues["reprompt"] = 'NA';
  }else {
        slotValues["voice"] = `thanks, now tell the ${reprompt}to find you a parking spot`;
        slotValues["reprompt"] = `Are you there ?`;
  }
  return slotValues;
}

function persistSlotInSession(filledSlots,handlerInput){
 const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
   if (sessionAttributes['parking'])
   {
      Object.keys(filledSlots).forEach((item) => {
         if (filledSlots[item] && filledSlots[item].value) {
               sessionAttributes['parking'][item].value = filledSlots[item].value;
         }
      }, this);
   }
   else
   {
   sessionAttributes['parking'] = filledSlots;
   }
   handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
   return sessionAttributes['parking'];
}


// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        EchoLocationIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
        ) 
    .addErrorHandlers(
        ErrorHandler,
        )
    .lambda();
