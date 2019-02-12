"use strict"

var axios = require('axios');

var scoresToCalculate = [], // The score which will be calculated
    calculatedScore = [], // The score after it has ben calculated
    totalOfScores = 0, // the total sum of all scores
    token = ""; // Token to send back the final score


// If there is no score to be calculated, get the scores and initiate the calculate function
if (scoresToCalculate.length == 0) {
    getScores(() => {
        calculate(scoresToCalculate);
    });
}

// Iterate through the frames and calculates the score
function calculate(arr) {
    calculatedScore = [];
    totalOfScores = 0;
    scoresToCalculate = arr;

    for (let i = 0; i < arr.length; i++) {
        if (i == 10) {
            break;
        }
        if (isSpare(arr[i])) {
            totalOfScores += addSpare(i)
            calculatedScore.push(totalOfScores)
        } else if (isStrike(arr[i])) {
            totalOfScores += addStrike(i)
            calculatedScore.push(totalOfScores)
        } else {
            totalOfScores += arr[i][0] + arr[i][1]
            calculatedScore.push(totalOfScores)
        };
    };

    sendScores();
    return calculatedScore;
}

// Get the scores and token from API
function getScores(callback) {
    axios.get('http://13.74.31.101/api/points')
    .then(function (response) {
      scoresToCalculate = response.data.points
      token = response.data.token
      callback();
    })
    .catch(function (error) {
      console.log(error)
    });
};

// Sends back the calculated score and outputs the response
function sendScores() {
  axios.post('http://13.74.31.101/api/points', {
    token: token,
    points: calculatedScore
  })
  .then(res => {
    console.log(res.data)
  })
  .catch(err => {
    console.log(err)
  });
};

// Adds the bonus to the spare
function addSpare(i) {
    if(scoresToCalculate[i+1] != null) {
        return 10 + scoresToCalculate[i+1][0]
    };
    return 10
};

// Adds the bonus to the strike
function addStrike(i) {

    // Check if the current frame is the last and only adds the next two number in the next frame
    // [[10,0], [n,m]]
    //           ^ ^
    if (i == 9) {
        return 10 + scoresToCalculate[i+1][0] + scoresToCalculate[i+1][1];
    };

    // Checks if next frame has valid numbers and add them up
    // [[10,0], [n,m], ...]
    //           ^ ^
    if (scoresToCalculate[i+1] != null && scoresToCalculate[i+1][0] != 10) {
        return 10 + scoresToCalculate[i+1][0] + scoresToCalculate[i+1][1];
    };

    // Checks if next frame is a strike and add the number from the next frame again
    // [[10,0], [10, 0] [n, m], ...]
    //           ^^      ^        
    if (scoresToCalculate[i+1] != null && scoresToCalculate[i+1][0] == 10 && scoresToCalculate[i+2] != null) {
        return 10 + scoresToCalculate[i+1][0] + scoresToCalculate[i+2][0];
    };

    // Checks if next frame is a strike and if the next frame is the last
    //[[10,0], [10,0]]
    //  ^^      ^^
    if (scoresToCalculate[i+1] != null && scoresToCalculate[i+1][0] == 10 && scoresToCalculate[i+2] == null) {
        return 10 + scoresToCalculate[i+1][0];
    };

    // When all other if-statement are false, return 10 points
    return 10;
}

// Checks if the current frame is a strike
function isStrike(a) {
    if (a[0] == 10) {
        return true;
    };
    return false;
};

// Checks if the current frame is a spare
function isSpare(a) {
    if (a[0] != 10 && a[0] + a[1] == 10) {
        return true;
    };
    return false;
};

module.exports = calculate;