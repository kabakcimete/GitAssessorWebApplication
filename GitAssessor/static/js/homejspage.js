// var checked_rules={user}
// console.log(a.checked);

function savechk(){
  var chkboxlist = document.getElementById("chkbox");
  var chklist = document.getElementsByClassName("cbx");
  var chktext = ""
  for (j = 0; j < chklist.length; j++) {
    if (chklist.length == 1) {
      if (chklist[j].checked) {
        chktext+=chklist[j].value
        
      }
    } else {
      if (chklist[j].checked) {
        chktext+=chklist[j].value
        chktext+=","
      }
    }
  }
  chktext = chktext.slice(0,-1)
  console.log(chktext)
  chkboxlist.value = chktext
  console.log(chkboxlist)
}

function valueSender() {
    var ourLink = "https://tvfqrp.deta.dev/git_assessor/?";
    var boxLink = document.getElementsByClassName("linkbox");
    var chklist = document.getElementsByClassName("cbx");
    var grades = document.getElementsByClassName("grade");
    

    console.log(chklist);
    var ii;
    var j;
    var text = "";
    var ruletext = "rules=";
    var gradeArr=[];


    for (j = 0; j < chklist.length; j++) {
      if (chklist.length == 1) {
        if (chklist[j].checked) {
          console.log(chklist[j].value);
          ruletext += chklist[j].value;
          if(grades.length!=0){

            if (grades[j].value==""){
              gradeArr.push("10");
            }
            else{
              gradeArr.push(grades[j].value);
  
            }
          }
          
        }
      } else {
        if (chklist[j].checked) {
          console.log(chklist[j].value);
          ruletext += chklist[j].value + "%2C";
          if(grades.length!=0){

            if (grades[j].value==""){
              gradeArr.push("10");
            }
            else{
              gradeArr.push(grades[j].value);
  
            }
          }

        }
      }
    }
    console.log(gradeArr);
    console.log(ruletext)
    if (ruletext.slice(-3) == "%2C") {
      ruletext = ruletext.slice(0, -3);
    }
    ruletext += "&";
    text += ruletext;

    counter = 1;
    //text += "rules=1%2C2%2C3&";

    console.log(boxLink);

    const mapObj = {
      ":": "%3A",
      "/": "%2F",
    };
    console.log(boxLink.length);
    for (ii = 0; ii < boxLink.length; ii++) {
      text += "link" + counter + "=";
      text += boxLink[ii].value;
      text = text.replace(/[/:]/g, (c) => mapObj[c]);

      console.log(text);
      text += "&";
      counter += 1;
    }
    text = text.slice(0, -1);
    ourLink = ourLink + text;
    console.log(text);
    console.log(ourLink);

    var ourRequest = new XMLHttpRequest();
    ourRequest.open("GET", ourLink, true);

    ourRequest.onload = function () {
      if (ourRequest.readyState == 4 && ourRequest.status == 200) {
        var ourData = JSON.parse(ourRequest.responseText);
        console.log(ourData);
        renderHTML(ourData,gradeArr);
      }
    };

    ourRequest.send();
  }

  function renderHTML(data,grade) {
    sessionStorage.setItem("items", JSON.stringify(data));
    sessionStorage.setItem("grades",JSON.stringify(grade))
    console.log(sessionStorage);

    window.location.href = "../assess";
  }

  var i = 1;
  function addToList() {
    if (document.getElementById("addrepo").value !== "") {
      var newCheckbox = document.createElement("input");
      newCheckbox.classList.add("linkbox");
      newCheckbox.type = "checkbox";
      newCheckbox.id = i;
      newCheckbox.value = document.getElementById("addrepo").value;
      document.getElementById("links").appendChild(newCheckbox);

      var label = document.createElement("label");
      label.setAttribute("for", i);
      label.setAttribute("id", i);
      label.appendChild(
        document.createTextNode(document.getElementById("addrepo").value)
      );

      document.getElementById("links").appendChild(label);
      document
        .getElementById("links")
        .appendChild(document.createElement("br"));

      document.getElementById("addrepo").value = "";

      document.getElementById("removerepolink").style.display = "inline";

      i = i + 1;
    }
  }

  function removeRepo() {
    var chk = document.getElementById("links").children;

    for (var j = 0; j < chk.length; j++) {
      if (chk[j].tagName == "INPUT" && chk[j].type == "checkbox") {
        if (chk[j].checked) {
          chk[j + 2].remove();
          chk[j + 1].remove();
          chk[j].remove();
        }
      }
    }
  }
