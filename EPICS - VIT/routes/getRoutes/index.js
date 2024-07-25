let mongoose = require("mongoose");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/home", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("home");
  } else {
    res.redirect("/");
  }
});

router.get("/add", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("add");
  } else {
    res.redirect("/");
  }
});

router.get("/find", (req, res) => {
  res.render("search");
});

router.get("/update", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("search", {
      option: "Upadte",
      buttonName: "Search",
      url: "update",
    });
  } else {
    res.redirect("/");
  }
});

router.get("/search", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("search", {
      option: "search",
      buttonName: "Search",
      url: "search",
    });
  } else {
    res.redirect("/");
  }
});

router.get("/delete", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("search", {
      option: "Delete",
      buttonName: "Delete",
      url: "delete",
    });
  } else {
    res.redirect("/");
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Dash Board func!

router.get("/dashboard", (req, res) => {
  if (req.isAuthenticated()) {  // note
    const db = mongoose.connection.db;
   db.collection("dailyReports")
      .find()
      .toArray((err, result) => {
        // YesterDay data
        let yesterday = result.slice(-1)[0];

        const highDisease = (arr) =>
          [...new Set(arr)]
            .map((value) => [value, arr.filter((v) => v === value).length])
            .sort((a, b) => a[1] - b[1])
            .reverse()
            .filter((value, i, a) => a.indexOf(value) === i)
            .filter((v, i, a) => v[1] === a[0][1])
            .map((v) => v[0]);

        let highestArr = highDisease(yesterday.diseaseArr);

        // last 7 days data from db...

        function lastDays(result, field, days) {
          return result.map((data)=>data[field]).slice(0).slice(days);  
        }
        function lastSevenDays(result, field) {
          return lastDays(result, field, -7)
        }
        
        let last7Days = lastSevenDays(result, "_id")
        let last7daysIncome = lastSevenDays(result, "totalIncomeAmount")
        let last7daysAvgIncome  =lastSevenDays(result, "avrageIncome")
        let last7daysPatientionsCount  = lastSevenDays(result, "PatientionsCount")

        // let last7daysIncome = result.map((data) =>  data.totalIncomeAmount).slice(0).slice(-7)

        // render page
        res.render("dashboard", {
          date: yesterday._id,
          totalIncomeAmount: yesterday.totalIncomeAmount,
          avrageIncome: yesterday.avrageIncome,
          PatientionsCount: yesterday.PatientionsCount,
          Over_reported_disease: highestArr,
          allDisease: yesterday.allDisease,
          // ----- last 7 day's
          last7Days : last7Days,
          last7daysIncome:last7daysIncome,
          last7daysAvgIncome:last7daysAvgIncome,
          last7daysPatientionsCount:last7daysPatientionsCount,
        });
      });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
