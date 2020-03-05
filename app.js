function startApp() {
    document.querySelector('.background').classList.add('hide');
    document.getElementById('questions').classList.remove('hide');
    timeUp();
}



////// gentrating random values //////
// var randomQuestion = []
// var counter = 0

// while (randomQuestion.length < db.length) {
//     var r = Math.floor(Math.random() * db.length);
//     if (randomQuestion.indexOf(r) === -1) {
//         randomQuestion.push(r);
//     }
// }

// var ques = db[randomQuestion[counter]].question;
// if (counter < db.length) {
//     counter++;
// }
///////////////////////////////////////




//Data 
var DataController = (function () {
    var quest = function (question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
    //private
    var correctAnswers = [];
    var randomArray = [];
    var score = 0;
    var quests = [];
    var Q1 = new quest("I'm very happy _____ in India. I really miss being there. ", ["to live", "to have lived", "to be lived", "to be living"], "to live");
    var Q2 = new quest("They didn't reach an agreement ______ their differences. ", ["on account of", "due", "because", "owing"], "because");
    var Q3 = new quest("I wish I _____ those words. But now it's too late.", ["not having said", "have never said", "never said", "had never said"], "have never said");
    var Q4 = new quest("The woman, who has been missing for 10 days, is believed _____. ", ["to be abducted", "to be abducting", "to have been abducted", "to have been abducting"], "to be abducted");
    var Q5 = new quest("She was working on her computer with her baby next to _____. ", ["herself", "her", "her own", "hers"], "her");
    var Q6 = new quest("_____ to offend anyone, she said both cakes were equally good.", ["Not wanting", "As not wanting", "She didn't want", "Because not wanting"], "She didn't want");
    var Q7 = new quest("_____ in trying to solve this problem. It's clearly unsolvable.", ["There's no point", "It's no point", "There isn't point", "It's no need"], "There's no point");
    var Q8 = new quest("Last year, when I last met her, she told me she _____ a letter every day for the last two months.", ["had written", "has written", "had been writing", "wrote"], "had been writing");
    var Q9 = new quest("He _____ robbed as he was walking out of the bank.", ["had", "did", "got", "were"], "got");
    var Q10 = new quest("____ forced to do anything. He acted of his own free will.", ["In no way was he", "No way he was", "In any way he was", "In any way was he"], "No way he was");
    quests.push(Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10);
    var checkedAnswers = [];
    var checkedAnswersValues = [];

    // console.log(quests);
    // console.log(quests.length);


    //public
    return {
        popQuest: function (i) {
            // debugger;
            return {
                question: quests[i].question,
                answers: quests[i].answers,
                correctAnswer: quests[i].correctAnswer
            }

        },
        checkScore: function (i, answer) {
            ca = quests[i].correctAnswer;

            if (ca == answer) {
                return score += 1;
            } else {
                return score;
            }
        },
        randomArray: function (length) {

            while (randomArray.length < length) {
                var r = Math.floor(Math.random() * length);
                if (randomArray.indexOf(r) === -1) {
                    randomArray.push(r);
                }
            }
            for (let index = 0; index < randomArray.length; index++) {
                correctAnswers[index] = quests[randomArray[index]].correctAnswer;
                console.log(correctAnswers)


            }

            return randomArray;

        },
        checkedAnswers: function (answer, index) {
            checkedAnswers[index] = answer.id;
            checkedAnswersValues[index] = answer.value;
            console.log(checkedAnswersValues);

        },

        getCheckedAns: function (index) {
            return checkedAnswers[index];

        },
        getScore: function () {
            // console.log((10 - (_.difference(checkedAnswersValues, correctAnswers)).length));
            return (10 - (_.difference(correctAnswers, checkedAnswersValues)).length);
        },
        //  getScoreTime: function () {
        //     //  console.log((10 - (_.difference(checkedAnswersValues, correctAnswers)).length));
        //      return (_.difference(correctAnswers,checkedAnswersValues)).length;
        //  }


    }

})();


//UI
var UIController = (function () {
    //private


    //public
    return {
        showQuest: function (question) {
            var htmlQ, htmlA;
            if (document.querySelector('.quest') != null) {
                document.querySelector('.Ques').removeChild(document.querySelector('.quest'));
                while (document.querySelector('.quteform').firstChild) {
                    document.querySelector('.quteform').removeChild(document.querySelector('.quteform').firstChild);
                }
                // document.querySelector('.quteform').removeChild(document.querySelector('.radiobtn'));
            }

            htmlQ = ' <p class="h3 mb-5 mt-5 quest"> %quest% </p> ';
            htmlQ = htmlQ.replace('%quest%', question.question);
            document.querySelector('.Ques').insertAdjacentHTML('afterbegin', htmlQ);
            for (let index = 0; index < question.answers.length; index++) {
                htmlA = ' <div class="radiobtn"> <input type = "radio" id = "%ansID%" name = "drone" value = "%ansValue%" /> <label for = "%ansLbl%" > %ansValueTxt% </label> </div>';

                htmlA = htmlA.replace('%ansID%', "ans" + index);
                htmlA = htmlA.replace('%ansValue%', question.answers[index]);
                htmlA = htmlA.replace('%ansLbl%', "ans" + index);
                htmlA = htmlA.replace('%ansValueTxt%', question.answers[index]);
                document.querySelector('.quteform').insertAdjacentHTML('beforeend', htmlA);
                // console.log(question.answers[index]);
            }

        }
    }

})();



//APP
var AppController = (function (DataCtrl, UICtrl) {
    var index = 0;
    var choosenValue;
    var ranArr = DataCtrl.randomArray(10);
    console.log(ranArr);
    var current_page = 0;
    console.log(ranArr[0]);

    document.querySelector('#btn_next').addEventListener('click', function () {
        // debugger;

        if (current_page < numPages()) {
            document.querySelectorAll('input').forEach(function (cur) {
                // debugger;
                if (cur.checked) {
                    DataCtrl.checkedAnswers(document.querySelector('input:checked'), current_page);
                }
            });
            current_page++;
            changePage(current_page);
            if (DataCtrl.getCheckedAns(current_page)) {
                id = DataCtrl.getCheckedAns(current_page);
                document.querySelector('#' + id).setAttribute('checked', '');
            }


        }
        document.querySelector('.page-item').classList.remove('disabled');
        document.querySelector('.num').textContent = current_page + 1;
    })
    document.querySelector('#btn_prev').addEventListener('click', function () {
        if (current_page > 0) {
            document.querySelectorAll('input').forEach(function (cur) {
                // debugger;
                if (cur.checked) {
                    DataCtrl.checkedAnswers(document.querySelector('input:checked'), current_page);
                }
            });
            current_page--;
            id = DataCtrl.getCheckedAns(current_page);
            console.log(id);
            // debugger;
            // document.getElementById(DataCtrl.getCheckedAns(current_page)).setAttribute('checked','');
            changePage(current_page);
            console.log(document.querySelector('#' + id));
            document.querySelector('#' + id).setAttribute('checked', '');
        }
        document.querySelector('.num').textContent = current_page + 1;

    })




    function changePage(page) {
        var btn_next = document.getElementById("btn_next");
        var btn_prev = document.getElementById("btn_prev");

        // Validate page
        if (page < 1) page = 0;
        if (page >= numPages()) page = 9;


        // debugger;
        console.log(ranArr[page]);
        question = DataCtrl.popQuest(ranArr[page]);
        UICtrl.showQuest(question);
        DataCtrl.checkScore(ranArr[page], choosenValue);

        if (page == 0) {
            btn_prev.style.visibility = "hidden";
        } else {
            btn_prev.style.visibility = "visible";
        }

        if (page == numPages() - 1) {
            btn_next.style.visibility = "hidden";
        } else {
            btn_next.style.visibility = "visible";
        }
    }

    function numPages() {
        return 10;
    }

    window.onload = function () {
        // debugger;
        changePage(current_page);
    };


    document.querySelector('.markbtn').addEventListener('click', function () {
        var html = '<div class="markedQ p-2 m-2" data-value="%val%">mrk-Qustion %Q%</div>';
        html = html.replace('%Q%', current_page + 1);
        html = html.replace('%val%', current_page);
        document.querySelector('.markDiv').insertAdjacentHTML('beforeend', html);
        document.querySelectorAll('input').forEach(function (cur) {
            // debugger;
            if (cur.checked) {
                DataCtrl.checkedAnswers(document.querySelector('input:checked').id, current_page);
            }
        });
    })


    document.querySelector('.markDiv').addEventListener('click', function (e) {
        id = DataCtrl.getCheckedAns(e.target.dataset.value);
        changePage(e.target.dataset.value);
        document.querySelector('#' + id).setAttribute('checked', '');
        document.querySelector('.markDiv').removeChild(e.target);

    })




    //private

    // var question = DataCtrl.popQuest(index);

    // document.querySelector('#nextQ').addEventListener('click', function name() {
    //     index = ranArr[i];
    //     question = DataCtrl.popQuest(index);
    //     UICtrl.showQuest(question);
    //     DataCtrl.checkScore(index, choosenValue);
    // console.log(i);
    //     i++;
    // })
    document.querySelector('.quteform').addEventListener('click', function (e) {
        if (e.target.value !== null) {
            choosenValue = e.target.value;
        }
        console.log(e.target.value);
    })

    document.querySelector('.sub').addEventListener('click', function () {
        document.querySelectorAll('input').forEach(function (cur) {
            // debugger;
            if (cur.checked) {
                DataCtrl.checkedAnswers(document.querySelector('input:checked'), current_page);
            }
        });
        document.getElementById('questions').classList.add('hide');
        document.querySelector('.bestLuck').classList.remove('hide');
        var finalScore = DataCtrl.getScore();
        console.log(finalScore);
        html = '<h5 class="display-6 text-center align-middle text-light"> you Got : %score%/10</h5> ';
        html = html.replace('%score%', finalScore);
        document.querySelector('.fscor').insertAdjacentHTML('beforeend', html);



        clearTimeout(timer);
    })



    //public
    return {

    }

})(DataController, UIController);

function timeUp() {
    timer = setTimeout(() => {
        document.querySelector('.timeUp').classList.remove('hide');
        document.getElementById('questions').classList.add('hide');
        var finalScore = DataController.getScore();
        console.log(finalScore)
        html = '<h5 class="display-6 text-center align-middle text-light"> you Got : %score%/10</h5> ';
        html = html.replace('%score%', finalScore);
        document.querySelector('.scor').insertAdjacentHTML('beforeend', html);
    }, 60000);

};