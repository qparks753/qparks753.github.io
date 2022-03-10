$(document).ready(function () {
    $("#keyboard-upper-container").hide();

    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];

    // sets initial variables to be used.
    let sentenceNum = 0;
    let charNum = 0;
    let currentSentence = sentences[0];
    let currentChar = currentSentence[0];
    let begin = 0;
    let end = 0;
    let mistakes = 0;
    
    //displays current letter and sentence
    $("#target-letter").text(currentChar);
    $("#sentence").append(currentSentence);
    

    //Keydown and Keyup causes the keyboard to toggle between upper and lower case.
    
    $(document).on("keydown", function (e) {
        if ((e.which) === 16) {
            $("#keyboard-upper-container").css("display", "block");
            $("#keyboard-lower-container").css("display", "none");
        };
    });

    $(document).on("keyup", function (e) {
        if (e.which === 16) {
            $("#keyboard-upper-container").css("display", "none");
            $("#keyboard-lower-container").css("display", "block");
        }
    });

    //for any keypress, the following procedure will take place.

    $(document).on("keypress", function (e) {
        const keys = ("#" + e.which);
        $(keys).css("background-color", "#ADD8E6");
        //alternates between bg color and original color with push of key.
        $(document).on("keyup", function (e) {
            $(keys).css("background-color", "#FAFAFA");
        });
        //sets variables to a new value .
        let currentSentence = sentences[sentenceNum];
        let currentChar = currentSentence[charNum];
        // sets time to begin if no previous value present.
        if (begin == undefined) {
            begin = e.timeStamp;
        }
        //moves yellow block 
        $('#yellow-block').css("left", "+=1.8rem"); 

        charNum = charNum + 1;
        let nextLetter = currentSentence[charNum];
         $('#target-letter').text(nextLetter);
           //checks if letter pressed is right or wrong. Also, highlights the results with a check or X icon.
         if (charNum < (currentSentence.length - 1)) { 
            if (e.which === currentChar.charCodeAt()) { 
                $("#feedback").append("<span class = 'glyphicon glyphicon-ok'></span>"); 
            } else {
                $("#feedback").append("<span class = 'glyphicon glyphicon-remove'></span>"); 
                mistakes = mistakes + 1; // if a mistake is made, mistakes is incremented by 1.
            }
        }

        // Detects if the sentence has reached the end and if so, clear previous sentence and  displays the new sentence.
        if (charNum == currentSentence.length) { 
            $("#sentence").empty(); 
            sentenceNum = sentenceNum + 1; 
            currentSentence = sentences[sentenceNum];  

            $("#sentence").append(sentences[sentenceNum]); 
            charNum = 0; 
            if (sentenceNum < sentences.length - 1) {
                let nextLetter = currentSentence[sentenceNum];
            }
         // set content in id ="target-letter" and moves yellow block back to the beginning of sentence.
            $("#target-letter").text(nextLetter); 
            $("#yellow-block").css({ left: 17 }); 
            $("#feedback").empty(); 
        }

 
         // determines if you are done with the sentences, calculates the time since beginning, and delivers a score. 
        if (sentenceNum > (sentences.length - 1)) { 
            end = e.timeStamp; 
            let minutes = (end - begin); 
            minutes = (minutes / 60000); 
            /*let wpm = Math.round((54 / time) - (mistakes * 2));*/ // calculates how fast the user types.
            let wpm = Math.round((54 / minutes) - (2 * mistakes));
            // sets content of id = "target letter" div depending on the wpm or speed of the user.
            if(wpm > 40){
                $("#target-letter").text(" WOW, I could barely count your score!! Your score is " + wpm + " words per minute");
            }
            if( wpm >= 30 && wpm <= 40){
            $("#target-letter").text(" Congrats Your Fast !! Your score is " + wpm + " words per minute"); 
            }
             if(wpm < 30){
                $("#target-letter").text(" Your score is " + wpm + " words per minute"); 
            }
            // gives the user an prompt and then resets page.
            setTimeout(function () {
                let playAnotherRound = confirm("Would you like to try again and play another round?");
                if (playAnotherRound == true) {
                    window.location.reload(); // reload the page
                } else {
                    return;
                };
            }, 3000); // 3seconds
        };
    })

});