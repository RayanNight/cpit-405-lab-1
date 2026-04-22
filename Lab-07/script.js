const url = "https://api.unsplash.com/search/photos/";
const apiKey = "eokaTESca6b4XQfcLQrbQ9xtZeQPuAK8Q0qEEkWy6_k"; //this should be hidden somehow
const params = "query=";
const auth = "client_id=";

const btns = document.getElementsByTagName("button");
const area = document.getElementById("images-area");
var searchBar = document.getElementsByTagName("input")[0];

btns[0].addEventListener("click", () => useXHR(searchBar.value));
btns[1].addEventListener("click", () => usePromise(searchBar.value));
btns[2].addEventListener("click", () => useAsyncAwait(searchBar.value));

function useXHR(keyword) {
  if (!keyword.trim()) return;
  console.log(keyword);

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status === 200)
      processResponse(JSON.parse(this.response));
  };
  xhr.open("GET", url + "?" + auth + apiKey + "&" + params + keyword);
  xhr.send();
}
function usePromise(keyword) {
    if (!keyword.trim()) return;
    console.log(keyword);

    fetch(url + "?" + auth + apiKey + "&" + params + keyword)
    .then(response => response.json())
    .then(data => processResponse(data))
    .catch(error => console.error("ERROR: ", error));
}
function useAsyncAwait(keyword) {
    if (!keyword.trim()) return;
    console.log(keyword);

    async function fetchData() {
       try{
        const response = await fetch( url + "?" + auth + apiKey + "&" + params + keyword);
        const data = await response.json();
        processResponse(data);
       }
       catch(error){
        console.error("ERROR: ", error);
       }
    }
    fetchData();
}

function processResponse(resp) {
  console.log(resp);
  area.innerHTML = "";

  if (resp.results && resp.results.length > 0) {
    for (let item of resp.results) {
      let imgElem = document.createElement("img");

      imgElem.src = item.urls.small;
      imgElem.alt = item.description;
      imgElem.style.width = resp.width;
      imgElem.style.height = resp.height;
      area.appendChild(imgElem);
    }
  }
}
