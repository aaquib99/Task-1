const textarea = document.querySelector("textarea");
const lineNumbers = document.querySelector(".line-numbers");
let DataToFindSentence
let sentenceFinder
var clipboardData
let neeArr = []
//This Event Listener is counting the number of lines and row counter is displayed on rigth pane.
textarea.addEventListener("keyup", (event) => {
  const numberOfLines = event.target.value.split("\n").length;
  //To calculate the lines of ro counter i splitted the text by line change.
  lineNumbers.innerHTML = Array(numberOfLines).fill("<span></span>").join("");
  //created thr
  var lineIndex =
    textarea.value.substr(0, textarea.selectionStart).split("\n").length - 1;
  console.log(lineIndex);
  var colsValue = textarea.cols;
  var lineCharacterCount = textarea.value.substr(0, textarea.selectionStart).split("\n")[lineIndex].length;
  if (lineCharacterCount >= colsValue) {
    textarea.value = textarea.value + "\n";
  }
});

textarea.addEventListener("paste", (event) => {
  let pastedData = "",pastedText=""
    result = "";
  event.preventDefault();
  clipboardData = event.clipboardData || window.clipboardData;
  pastedData = clipboardData.getData("Text");
  
  console.log("pasteData", pastedData);
  for (a = 0; a < pastedData.length; a++) {
    if (pastedData.length > 0) {
      console.log(pastedData.charAt(30));
      if (pastedData.length < 30) {
        result += pastedData.substring(0, pastedData.length) + "\n";
        pastedData = pastedData.substring(pastedData.length);
      } else if (pastedData.charAt(30) == " ") {
        console.log(pastedData.charAt(30));
        result += pastedData.substring(0, textarea.cols) + "\n";
        pastedData = pastedData.substring(textarea.cols);
      } else {
        console.log(pastedData.charAt(30));
        let loopCounter = pastedData.length >= 30 ? 30 : pastedData.length;
        for (let i = loopCounter; i >= 0; i--) {
          console.log(pastedData.charAt(i));
          if (pastedData.charAt(i) == " ") {
            result += pastedData.substring(0, i) + "\n";
            pastedData = pastedData.substring(i);
            break;
          }
        }
      }
    }
  }
  textarea.value = "";
  textarea.value = result;
  textarea.setSelectionRange(0, 0);

  DataToFindSentence = pastedData.replaceAll("?", ".")
  DataToFindSentence = textarea.value.replaceAll("?", ".")
  DataToFindSentence = DataToFindSentence.replaceAll("।", ".")
  console.log("!!!!!!!!!!!!!!!!!!!!", DataToFindSentence)
  
  sentenceFinder = DataToFindSentence.split(".")
  console.log("~~~~~~~~~~~~~~~~~~~~~~", sentenceFinder)
  console.log(sentenceFinder.length)
  debugger;
  while (neeArr.length > 0) {
    neeArr.pop();
  }
  for (let i = 0; i < sentenceFinder.length - 1; i++) {
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
  console.log("Hshshshhs", neeArr)

});
function getLine() {
  let location = textarea.selectionStart
  console.log("Location is ", location)
  for (let i = 0; i < neeArr.length; i++) {
    if (location <= neeArr[i]) {
      document.getElementById("Responce").innerHTML = `you are on line no ${i + 1}`
      let string = sentenceFinder[i]
      console.log("MMMMMMMMMMMMMM",string)
      let position = DataToFindSentence.search(string)
      console.log(position)
      console.log(neeArr[i])
      textarea.setSelectionRange(position, neeArr[i]);
      
      break;
    }
    else {
      continue;
    }
  }


}
