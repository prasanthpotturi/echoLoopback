# Alexa skill : echo appointment info

#### Description

 This is a simple skill to demonstrate an approach to capture below appointment info
     - location/address, duration, date, time
     - single or multiple utterances
     - these four input attributes can be uttered in any order
     - with or without any pronouns (like at, for, from etc..)

 This demo skill will look for the following information from user
        date
        time
        address or location
        duration
 Note: address implies postal address and location implies civic location/business locations

#### Technical Details
    This Skills demonstrates some technical features such as
    - Session Handling
    - Handling Utterance without pronouns

### Sample Utterance demo
## Example - 1
    User Utterance 1 : open loopback
    Alexa : Welcome to Echo Location skill

    User Utterance 2 : 7th ave today at five p.m. for two hours
    Alexa : received all the required information

## Example - 2
    User Utterance 1 : open loopback
    Alexa : Welcome to Echo Location skill, please provide your appointment info

    User Utterance 2 : 7th ave
    Alexa : thanks, now tell the duration, date, time, to complete your appointment

    User Utterance 3 : two hours
    Alexa : thanks, now tell the date, time, to complete your appointment

    User Utterance 4 : today
    Alexa : thanks, now tell the time, to complete your appointment

    User Utterance 5 : 8 a.m.
    Alexa : thanks, received all the required information for your appointment. Bye!

---

## Additional Resources

### Community
* [Amazon Developer Forums](https://forums.developer.amazon.com/spaces/165/index.html) - Join the conversation!

### Tutorials & Guides
* [Voice Design Guide](https://developer.amazon.com/designing-for-voice/) - A great resource for learning conversational and voice user interface design.

### Documentation
*  [Official Alexa Skills Kit Documentation](https://developer.amazon.com/docs/ask-overviews/build-skills-with-the-alexa-skills-kit.html) - Official Alexa Skills Kit Documentation
