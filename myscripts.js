const textarea = document.querySelector("textarea");
const lineNumbers = document.querySelector(".line-numbers");
let DataToFindSentence
let sentenceFinder
var clipboardData
let neeArr = []

textarea.addEventListener("paste", (event) => {
  let pastedData = "",pastedText=""
    result = "";
  event.preventDefault();
  clipboardData = event.clipboardData || window.clipboardData;
  pastedData = clipboardData.getData("Text");
  //Here i take the pasted data from clipboard in pastedData
  // console.log("pasteData", pastedData);
  for (a = 0; a < pastedData.length; a++) {
    if (pastedData.length > 0) {
      // console.log(pastedData.charAt(30));
      if (pastedData.length < 30) {
        result += pastedData.substring(0, pastedData.length) + "\n";
        pastedData = pastedData.substring(pastedData.length);
      } else if (pastedData.charAt(30) == " ") {
        // console.log(pastedData.charAt(30));
        result += pastedData.substring(0, textarea.cols) + "\n";
        pastedData = pastedData.substring(textarea.cols);
      } else {
        // console.log(pastedData.charAt(30));
        let loopCounter = pastedData.length >= 30 ? 30 : pastedData.length;
        for (let i = loopCounter; i >= 0; i--) {
          // console.log(pastedData.charAt(i));
          if (pastedData.charAt(i) == " ") {
            result += pastedData.substring(0, i) + "\n";
            pastedData = pastedData.substring(i);
            break;
          }
        }
      }
    }
  }
  //this loop will make sure that no word is divided.
  textarea.value = "";
  textarea.value = result;
  textarea.setSelectionRange(0, 0);

  DataToFindSentence = pastedData.replaceAll("?", ".")
  DataToFindSentence = textarea.value.replaceAll("?", ".")
  DataToFindSentence = DataToFindSentence.replaceAll("।", ".")
  // console.log("!!!!!!!!!!!!!!!!!!!!", DataToFindSentence)
  //here  in English and hindi "?" and "।" is replaces by "." So that to count the number of hindi and enlgish text we get easy
  sentenceFinder = DataToFindSentence.split(".")
  //here array of all sentences is created
  // console.log("~~~~~~~~~~~~~~~~~~~~~~", sentenceFinder)
  // console.log(sentenceFinder.length)
  debugger;
  while (neeArr.length > 0) {
    neeArr.pop();
  }
  for (let i = 0; i < sentenceFinder.length ; i++) {
    len = 0
    for (let j = 0; j <= i; j++) {
      if (i == j) {
        len = sentenceFinder[j].length + len + 1
        neeArr.push(len)
        break;
      }
      else {
        len = sentenceFinder[j].length + len + 1
        continue;
      }
    }
  }
  // console.log("Hshshshhs", neeArr)
  //this newArr is created to check the position of all sentences and further we will check it with cursor position
});
function getLine() {
  let location = textarea.selectionStart
  // console.log("Location is ", location)
  for (let i = 0; i < neeArr.length; i++) {
    if (location <= neeArr[i]) {
      document.getElementById("Responce").innerHTML = `you are on line no ${i + 1}`
      let string = sentenceFinder[i]
      //Here we will find the sentence number
      // console.log("MMMMMMMMMMMMMM",string)
      let position = DataToFindSentence.search(string)
      // console.log(position)
      // console.log(neeArr[i])
      textarea.setSelectionRange(position, neeArr[i]);
      //setSelectionRange will select that specific sentence.
      
      break;
    }
    else {
      continue;
    }
  }


}
