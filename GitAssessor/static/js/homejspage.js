function valueSender() {
    var ourLink = "https://l5n5ve.deta.dev/git_assessor/?";
    var boxLink = document.getElementsByClassName("linkbox");
    var chklist = document.getElementsByClassName("cbx");
    console.log(chklist);
    var ii;
    var j;
    var text = "";
    var ruletext = "rules=";

    for (j = 0; j < chklist.length; j++) {
      if (chklist.length == 1) {
        if (chklist[j].checked) {
          console.log(chklist[j].value);
          ruletext += chklist[j].value;
        }
      } else {
        if (chklist[j].checked) {
          console.log(chklist[j].value);
          ruletext += chklist[j].value + "%2C";
        }
      }
    }
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
        renderHTML(ourData);
      }
    };

    ourRequest.send();
  }

  function renderHTML(data) {
    sessionStorage.setItem("items", JSON.stringify(data));
    console.log(sessionStorage);

    window.location.href = "assess";
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
