var answerContainer = document.getElementById("answer");
      var answer = JSON.parse(sessionStorage.getItem("items"));
      //var secondanswer = JSON.parse(answer);
      //console.log(answer);
      //console.log(answer);
      var rules = [
        "does every contributor have commit",
        "does repository have read_me file ",
        "does every commit has comment ",
        "does every contributor have feature branch ",
      ];

      var reponame = Object.keys(answer);
      var noOfRules = Object.keys(answer[reponame[0]]);
      console.log(answer);
      console.log(reponame)
      console.log(noOfRules)
      var contributers = [];
      var isthererule = [];
      var rulelist = [];
      var arr = [];
      var result = [];

      for (var i = 0; i < reponame.length; i++) {
        var tabstring = "";
        tabstring +=
          "<button class='tablinks' onclick=\"openrepo(event,'" +
          reponame[i] +
          "')\"";
        if (i == 0) {
          tabstring += "id='defaultopen'>";
        } else {
          tabstring += ">";
        }
        tabstring += reponame[i] + "</button>";
        document
          .getElementById("tab")
          .insertAdjacentHTML("beforeend", tabstring);
      }
      console.log(tabstring);
      for (var i = 0; i < reponame.length; i++) {
        for (var j = 1; j < noOfRules.length; j++) {
          if (Object.keys(answer[reponame[i]][noOfRules[j]]).length > 1) {
            console.log(Object.keys(answer[reponame[i]][noOfRules[j]]).length > 1)
            contributers.push(Object.keys(answer[reponame[i]][noOfRules[j]]));
            break;
          } else {
            contributers.push(Object.keys(answer[reponame[i]][noOfRules[j]]));
            break;
          }
        }
      }
      console.log(contributers)
      for (var i = 1; i < noOfRules.length; i++) {
        if (noOfRules[i] == "commit") {
          isthererule.push(rules[0]);
          rulelist.push(noOfRules[i]);
        } else if (noOfRules[i] == "readme") {
          isthererule.push(rules[1]);
          rulelist.push(noOfRules[i]);
        } else if (noOfRules[i] == "commit_comments") {
          isthererule.push(rules[2]);
          rulelist.push(noOfRules[i]);
        } else if (noOfRules[i] == "feature_branch") {
          isthererule.push(rules[3]);
          rulelist.push(noOfRules[i]);
        }
      }
      for (var i = 0; i < reponame.length; i++) {
        var tabcontent = "";
        var tabrule = "";
        tabcontent += "<div id='" + reponame[i] + "' class='tabcontent'></div>";
        document
          .getElementById("tabcontainer")
          .insertAdjacentHTML("beforeend", tabcontent);
        tabrule = createRules(isthererule, i);
        document
          .getElementById(reponame[i])
          .insertAdjacentHTML("beforeend", tabrule);
        console.log(tabcontent);
      }
      for (var i = 0; i < reponame.length; i++) {
        for (var j = 0; j < contributers[i].length; j++) {
          arr.push(contributers[i][j]);
          for (var k = 1; k < noOfRules.length; k++) {
            if (Object.keys(answer[reponame[i]][noOfRules[k]]).length > 1) {
              arr.push(answer[reponame[i]][noOfRules[k]][contributers[i][j]]);
            } else {
              arr.push(answer[reponame[i]][noOfRules[k]]);
            }
          }
        }
      }

      for (var i = 0; i < arr.length; i += noOfRules.length) {
        result.push(arr.slice(i, i + noOfRules.length));
      }
      var resultcopy = [...result];
      for (var i = 0; i < reponame.length; i++) {
        var tabtable = "";
        console.log(resultcopy);
        tabtable += createTable(resultcopy, contributers[i]);
        resultcopy = resultcopy.slice(contributers[i].length);
        console.log(tabtable);
        document
          .getElementById(reponame[i])
          .insertAdjacentHTML("beforeend", tabtable);
      }

      function createTable(array, size) {
        var table = "";
        table += "<div class='table'><table><tr><th>Users</th>";
        for (var i = 1; i < noOfRules.length; i++) {
          table += "<th>Rule-" + i + "</th>";
        }
        table += "</tr>";
        for (var j = 0; j < size.length; j++) {
          table += "<tr>";
          for (var k = 0; k < noOfRules.length; k++) {
            if (array[j][k] == true) {
              table += "<td><span class='tick'>&#10004;</span></td>";
            } else if (array[j][k] == false) {
              table += "<td><span class='cross'>&#10005;</span></td>";
            } else {
              table += "<td>" + array[j][k] + "</td>";
            }
          }
          table += "</tr>";
        }
        table += "</table></div>";
        return table;
      }

      function createRules(array, s) {
        var rule = "";
        rule += "<div class='rule'><ul><span class='rulefont'>Rules</span>";
        for (var i = 0; i < array.length; i++) {
          rule += "<li>" + (i + 1) + "- " + array[i] + "</li>";
        }
        rule += "</ul></div>";
        return rule;
      }
      function openrepo(evt, repoName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        document.getElementById(repoName).style.display = "flex";
        evt.currentTarget.className += " active";
      }
      document.getElementById("defaultopen").click();
      var grades = [];
      var students = [];
      var barColors = [
        "#80CBC4",
        "#4DB6AC",
        "#26A69A",
        "#009688",
        "#A5D6A7",
        "#81C784",
        "#66BB6A",
        "#4CAF50",
        "#C5E1A5",
        "#AED581",
        "#9CCC65",
        "#8BC34A",
        "#E6EE9C",
        "#DCE775",
        "#D4E157",
        "#CDDC39",
        "#FFF59D",
        "#FFF176",
        "#FFEE58",
        "#FFEB3B",
        "#FFE082",
        "#FFD54F",
        "#FFCA28",
        "#FFC107",
        "#FFCC80",
        "#FFB74D",
        "#FFA726",
        "#FF9800",
        "#FFAB91",
        "#FF8A65",
        "#FF7043",
        "#FF5722",
        "#ef9a9a",
        "#e57373",
        "#ef5350",
        "#f44336",
        "#f48fb1",
        "#f06292",
        "#ec407a",
        "#e91e63",
        "#ce93d8",
        "#ba68c8",
        "#ab47bc",
        "#9c27b0",
        "#b39ddb",
        "#9575cd",
        "#7e57c2",
        "#673AB7",
        "#9FA8DA",
        "#7986CB",
        "#5C6BC0",
        "#3F51B5",
        "#90CAF9",
        "#64B5F6",
        "#42A5F5",
        "#2196F3",
        "#81D4FA",
        "#4FC3F7",
        "#29B6F6",
        "#03A9F4",
        "#80DEEA",
        "#4DD0E1",
        "#26C6DA",
        "#00BCD4",
      ];
      for (var i = 0; i < result.length; i++) {
        var grade = 0;
        students.push(result[i][0]);
        for (var j = 1; j < result[i].length; j++) {
          if (result[i][j] == true) {
            grade += 1;
          }
        }
        grades.push(grade);
      }
      for (var i = 0; i < reponame.length; i++) {
        var canvas = "";
        canvas +=
          '<div class="canvas"><canvas id="' +
          (reponame[i] + i) +
          "\" style='width:100%;min-width:600px'></canvas></div>";
        document
          .getElementById(reponame[i])
          .insertAdjacentHTML("beforeend", canvas);
      }
      var studentscopy = [...students];
      var gradescopy = [...grades];
      for (var i = 0; i < reponame.length; i++) {
        var id = reponame[i] + i;
        createChart(id, studentscopy, gradescopy, contributers[i].length);
        studentscopy = studentscopy.slice(contributers[i].length);
        gradescopy = gradescopy.slice(contributers[i].length);
        console.log(studentscopy);
      }
      function createChart(id, students, grades, size) {
        var newstudents = [];
        var newgrades = [];
        for (var i = 0; i < size; i++) {
          newstudents.push(students[i]);
          newgrades.push(grades[i]);
        }
        console.log(newstudents, newgrades);
        new Chart(id, {
          type: "bar",
          data: {
            labels: newstudents,
            datasets: [
              {
                backgroundColor: barColors,
                data: newgrades,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    max: noOfRules.length - 1,
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: id.slice(0, -1),
            },
          },
        });
      }