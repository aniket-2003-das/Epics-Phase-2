exports = function () {
  const mongodb = context.services.get("mongodb-atlas");
  const myDB = mongodb.db("test");
  const patientCollection = myDB.collection("patients");
  const reports = myDB.collection("dailyReports");

  function reportData() {
    const pipeline = [
      // set your, custom pipline / needs custom data from db

      {
        $match: { // it's provide yesterday data's only...
          // apply the filters
          createdAt: {
            $gte: makeYesterdayMorningDate(),
            $lt: makeThisMorningDate(),
          },
        },
      },
      {
        $group: {
          // it's return custom data
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalIncomeAmount: { $sum: "$fees" },
          avrageIncome: { $avg: "$fees" },
          PatientionsCount: { $sum: 1 },
          // ==========>
          diseaseArr: { $push: "$disease" },
          allDisease: { $addToSet: "$disease" },
        },
      },
    ];

    return new Promise.resolve(patientCollection.aggregate(pipeline).next());
  }

  reportData()
    .then((dailyReport) => {
      console.log(dailyReport);
      reports.insertMany([dailyReport]);
    })
    .catch((err) => console.error("Sorry, Failed to generate report:", err));
};

//  ------------- > filters:

function makeThisMorningDate() {
  return setTimeToMorning(new Date());
}
function makeYesterdayMorningDate() {
  const thisMorning = makeThisMorningDate();
  const yesterdayMorning = new Date(thisMorning);
  yesterdayMorning.setDate(thisMorning.getDate() - 1);
  return yesterdayMorning;
}

function setTimeToMorning(date) {
date.setHours(0); //this india time zone based( 7 am ), so you set your time zone... :)
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}
