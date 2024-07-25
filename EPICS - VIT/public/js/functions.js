let i = 0;

$("#eye").click(() => {
  i += 1;
  if (i % 2 != 0) {
    $(".password").attr("type", "text");
    $("#eye").attr("class", "fas fa-eye");
  } else {
    $(".password").attr("type", "password");
    $("#eye").attr("class", "fas fa-eye-slash");
  }
});

$(".drop_").click(() => {
  i += 1;
  let screen_ = screen.width;

  if (i % 2 != 0) {
    if (screen_ < 546) {
      $(".drop").css({ cssText: "top: 100px " });
    } else {
      $(".drop").css({ cssText: "top: 40px " });
    }
  } else {
    setTimeout(() => {
      $(".drop").css({ cssText: "top: -200px " });
    }, 10);
  }
});

window.addEventListener("load", () => {
  let screen_ = screen.width;
  if (screen_ < 546) {
    $(".sideNav").css({
      height: "110px",
    });
    $(".icons").hide();
  } else {
    $(".icons h4").hide();
  }
});

$(".arrow_R").click(() => {
  $("#elem").addClass("importantRule");
  i += 1;
  let screen_ = screen.width;
  if (i % 2 != 0) {
    $(".arrow_R").css({ marginLeft: "100px" });
    $("#bar").attr("class", "fas fa-times");
    // $(".container > #form").css({  cssText: "marginLeft: 500px !important"})
    if (screen_ < 781) {
      $(".topNav").css({ width: "90vw", marginLeft: "40px" });
    }
    if (screen_ < 546) {
      $(".sideNav").css({ cssText: "height: 110vh !important; width: 160px " });
      $(".icons").show();
    } else {
      $(".topNav").css({ width: "92.3vw", marginLeft: "105px" });
      $(".sideNav").css({ cssText: "height: 110vh" });
      $(".sideNav").css({ width: "160px" });
      $(".icons  h4").show();
    }
  }
  //
  else {
    $(".topNav").css({ width: "100vw", marginLeft: "0px" });
    $(".arrow_R").css({ marginLeft: "0" });
    $("#bar").attr("class", "fas fa-bars");
    if (screen_ < 546) {
      $(".sideNav").css({ cssText: "height: 110px !important; width: 60px " });
      $(".icons").hide();
    } else {
      $(".sideNav").css({ width: "60px" });
      $(".icons  h4").hide();
    }
  }
});

active();
$(".icons").click(active());

function active() {
  let path = window.location.pathname;
  if (path === "/home") {
    $(".icons:eq(0)").css({
      color: "#86e624",
      background: "white",
      opacity: "1",
    });
  }
  if (path === "/add") {
    $(".icons:eq(1)").css({
      color: " #86e624",
      background: "white",
      opacity: "1",
    });
  }
  if (path === "/search") {
    $(".icons:eq(2)").css({
      color: " #86e624",
      background: "white",
      opacity: "1",
    });
  }
  if (path === "/update") {
    $(".icons:eq(3)").css({
      color: " #86e624",
      background: "white",
      opacity: "1",
    });
  }
  if (path === "/delete") {
    $(".icons:eq(4)").css({
      color: "tomato",
      background: "white",
      opacity: "1",
    });
  }
}

// home page

function Today() {
  let time = new Date();
  let today =
    time.getDate() + " " + time.toLocaleString("default", { month: "long" });
  $("#time_").text(today);

  var curHr = time.getHours();

  if (curHr < 12) {
    $("#greeting").text("Good Morning");
  } else if (curHr < 18) {
    $("#greeting").text("Good Afternoon");
  } else {
    $("#greeting").text("Dood Evening");
  }
}

Time();
function Time() {
  let time = new Date();

  $("#time").text(time.toLocaleTimeString());
  setInterval(() => {
    Time(), Today();
  }, 1000);
}
