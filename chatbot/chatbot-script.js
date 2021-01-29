fetch("../chatbot/index.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("footer").innerHTML = data;
  });

let modelPromise = {};

async function answer_questions(question) {
    model = await modelPromise;
    //config = {modelUrl: 'https://yourown-server/qna/model.json'};
    //customModel = await qna.load(config);
    if(question.toLowerCase().includes("keysight")) {
      passage = document.getElementById("keysight-story").innerHTML;
    } else if(question.toLowerCase().includes("intel")) {
      passage = document.getElementById("intel-story").innerHTML;
    } else {
      addReply("Sorry, please specific the name of company.");
      return;
    }
    //const passage = await fetch("passage.txt").then($ => $.text())

    const answers = await model.findAnswers(question, passage);
    //alert(answers)
    if(answers[0].text){
      addReply(answers[0].text);
    } else {
      addReply("Sorry, I don't know the answer to your question.");
    }
};

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

window.onload = function() {
  modelPromise = qna.load();
  document.getElementById("sendMsg").addEventListener("click", function(event){
    userInput = document.getElementById("userInput");
    addMessage(userInput.value);
    answer_questions(userInput.value);
    userInput.value='';
  });
}

function addReply(msg) {
  var sysMsg = document.createElement("p");
  sysMsg.className = "container left-chat";
  var text = document.createTextNode(msg);
  sysMsg.appendChild(text);
  document.getElementById("conversation").appendChild(sysMsg);
}

function addMessage(msg) {
  var userMsg = document.createElement("p");
  userMsg.className = "container right-chat";
  var text = document.createTextNode(msg);
  userMsg.appendChild(text);
  document.getElementById("conversation").appendChild(userMsg);
}
