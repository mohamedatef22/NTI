let word = prompt("enter Ur word");
correct =0 
incorrect = 0
inserted = ''
status = 'playing'
wordLetters = {}
hiddenWord = []

let getWordLetters = function(){
    for(let i =0;i<word.length;i++){
        hiddenWord.push('-')
        if(word[i] in wordLetters){
            wordLetters[word[i]][0] +=1
            wordLetters[word[i]].push(i)
            continue
        }
        wordLetters[word[i]] = [1,i]
    }
}

function checkChar(letter){
    if(inserted.includes(letter)) {
        alert('used before')
        return
    }
    if(!(letter in wordLetters)){ 
        incorrect++
        inserted+=letter
        if(incorrect==word.length+2) status= "lose"
        return
    }
    else {
        inserted+=letter
        correct += wordLetters[letter][0]
        for(let i=1;i<wordLetters[letter].length;i++){
            hiddenWord[wordLetters[letter][i]] = letter
        }
        if(correct==word.length) status="win"
    }
}
function getTrial(){
    letter = prompt('enter character')
    if(letter.length>1){
        alert('you must enter single character')
        getTrial();
    }
    checkChar(letter)
    console.log(`
    word: ${hiddenWord.join('')}
    letter: ${letter}
    correct: ${correct}
    incorrect: ${incorrect}
    status: ${status}
    `)
}

getWordLetters()
while(status=='playing'){
    getTrial()
}