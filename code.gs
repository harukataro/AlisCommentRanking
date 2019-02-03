function getAlisPopularArticle2(){
  var str;
  var url_base ="https://alis.to/api/articles/recent?limit=100&page="
  var sheetidx ="GOOGLE SPREAD SHEET ID"; //データ保存用google Spreadsheet
  var mySpread = SpreadsheetApp.openById(sheetidx); 　//Sheet entitiy
  var mySheets = mySpread.getSheetByName("Ranking"); //Ranking用設定
  var pages = 1;
  
  //Clear target Sheet
  mySheets.clear(); 
  
  // Creat fetch api for popular articles
  var response = UrlFetchApp.fetch(url_base + "1").getContentText();
  var results = JSON.parse(response); 
    
  var count = results["Items"].length;
  var username = count;
  var rownum;
  for (i=0;i<count;i++){  
  str = mySheets.getRange(i+1, 1).setValue(i+1);
  str = mySheets.getRange(i+1, 2).setValue(results["Items"][i]["article_id"]);
  str = mySheets.getRange(i+1, 3).setValue(results["Items"][i]["user_id"]);  
  str = mySheets.getRange(i+1, 4).setValue(results["Items"][i]["title"]);  
  str = getCommentUser2(results["Items"][i]["article_id"],i);
  str = mySheets.getRange(i+1, 7).setValue(results["Items"][i]["topic"]);
  str = mySheets.getRange(i+1, 8).setValue(results["Items"][i]["eye_catch_url"]);  
  }  
  rownum =i;
  
  for (s=2;s<=pages;s++){
  response = UrlFetchApp.fetch(url_base + s.toString()).getContentText();
  results =JSON.parse(response);
  count = results["Items"].length;
  username = count;
  
  for (i=rownum;i<rownum+count;i++){  
  str = mySheets.getRange(i+1, 1).setValue(i+1);
  str = mySheets.getRange(i+1, 2).setValue(results["Items"][i-rownum]["article_id"]);
  str = mySheets.getRange(i+1, 3).setValue(results["Items"][i-rownum]["user_id"]);  
  str = mySheets.getRange(i+1, 4).setValue(results["Items"][i-rownum]["title"]);  
  str = getCommentUser2(results["Items"][i-rownum]["article_id"],i);
  str = mySheets.getRange(i+1, 7).setValue(results["Items"][i-rownum]["topic"]);
  str = mySheets.getRange(i+1, 8).setValue(results["Items"][i-rownum]["eye_catch_url"]); 
  }  
  rownum = i;
  
  }
  mySheets.sort(5,false);
}

// Fetch user commnets write number of comments and user name into spread sheet


function getCommentUser2(articleid,row){
  var srt
  var username ="";
  var sheetidx ="GOOGLE SPREAD SHEET ID";
  
  var mySpread = SpreadsheetApp.openById(sheetidx);
  var mySheets = mySpread.getSheetByName("Ranking");
  
  var response = UrlFetchApp.fetch("https://alis.to/api/articles/" + articleid + "/comments?limit=100").getContentText();
  var results = JSON.parse(response); 
  var count = results["Items"].length;
  
  str = mySheets.getRange(row+1, 5).setValue(count);
  
  if (count == 0) {
    return(0);
  }
   
  username =results["Items"][0]["user_id"];
  
  for (x=1;x<count;x++){   
     username = username + "," + results["Items"][x]["user_id"]  ;
   }
  
  //write to spreadsheet comment user info
  str = mySheets.getRange(row+1, 6).setValue(username);
  
  return(1);
}



// main for background fetch
function fetchAlisCommentInfo2(){
  var getdata
  getdata = getAlisPopularArticle2();

}  

//main for user website display
function doGet() {
  var html = HtmlService.createTemplateFromFile("alis_comment_ranking");   
  return html.evaluate().setTitle("ALISコメントランキング");
}
 
function getData(alg){
  if(alg == "title"){
    return "Hello!";
  }else if(alg == "body"){
    return "これはHTMLページの本文に表示するテキストです";
  }
}


