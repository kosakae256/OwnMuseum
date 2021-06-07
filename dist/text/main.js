$(function(){

  // 画面読込時に実行する。
  // 初期表示で隠しておく
  $("#home_content").show();
  $("#intro_content").hide();
  $("#act_content").hide();
  $("#hobby_content").hide();


});
const allhide = () =>{
  $("#home_content").hide();
  $("#intro_content").hide();
  $("#act_content").hide();
  $("#hobby_content").hide();
  $("#play_content").hide();
  $(".sidecheckbox").prop("checked", false);
}

const changeIntro = () => {
    allhide()
    $("#intro_content").show();
    $("#intro,sidecheckbox").prop("checked", true);
}
const changeAct = () => {
    allhide()
    $("#act_content").show();
    $("#act,sidecheckbox").prop("checked", true);
}

const changeHome = () => {
    allhide()
    $("#home_content").show();
    $("#home,sidecheckbox").prop("checked", true);
}

const changeHobby = () => {
    allhide()
    $("#hobby_content").show();
    $("#hobby,sidecheckbox").prop("checked", true);
}

const changePlay = () => {
    allhide()
    $("#play_content").show();
    $("#play,sidecheckbox").prop("checked", true);
}
