export function selectRandomOptions(fullListArray, optionsAmountToGenerate, randomIndex, correctIndex, arrayTopic) {
    for(i = 0; i < optionsAmountToGenerate - 1; i++){
        return fullListArray[randomIndex].arrayTopic;
    };
    return fullListArray[correctIndex].arrayTopic
};