var liked = false
liked = getCookie("like")
if(liked=="true") liked = true; else liked=false

var disliked = false
disliked = getCookie("dislike")
if(disliked=="true") disliked = true; else disliked=false

var comments = [];
comments = getCookie("comments").split(",")
if(comments == "") comments = [];

refreshCounters()
refreshComments()

function addLike() {
    if(disliked) addDislike()
    liked=!liked
    setCookie("like", liked)
    refreshCounters()
}
function addDislike() {
    if(liked) addLike()
    disliked=!disliked
    setCookie("dislike", disliked)
    refreshCounters()
}
function refreshCounters() {
    document.getElementById("likeBtn").value = "👍 " + (liked? 1: 0)
    document.getElementById("dislikeBtn").value = "👎 " + (disliked? 1: 0)
}

function refreshComments() {
    var displayedComment = ""
    for(i=0; i < comments.length; i++){
        displayedComment += comments[i]
        displayedComment += '\n'
    }
    document.getElementById("commentSection").innerText = displayedComment
}

function addComment(){
    const cmnt = document.getElementById("comment").value
    if(cmnt.trim() == "") return
    comments.push(cmnt)
    setCookie("comments", comments)
    refreshComments()
    document.getElementById("comment").value = ""
}

function reset(){
    
    if(!confirm("Are you sure you want to reset all fields?")) return

    if(liked) addLike();
    if(disliked) addDislike()
    document.getElementById("comment").value = ""
    comments = []
    document.getElementById("commentSection").innerText = ""

    setCookie("like", false);
    setCookie("dislike", false);
    setCookie("comments", []);

    refreshCounters()
    refreshComments()

    document.getElementById("commentSection").innerText = "All fields has been cleared"

    
}

function debugbtn(){
    alert(document.cookie)
}

function setCookie(name, value){
    document.cookie = name + "=" + value + ";"
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}