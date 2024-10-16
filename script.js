const button = document.getElementById("bttn");
const videoUrl = document.getElementById("videoURL").value;
const videoId = extractVideoID(videoUrl);

button.onclick = () => {
  const videoUrl = document.getElementById("videoURL").value;
  const videoId = extractVideoID(videoUrl);
  const apiKey = "AIzaSyCT997HqfsSDh5ts_Aim708hQG-zwmqSXM"; 
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
  console.log(apiUrl);

  if (videoUrl && videoId) {
    button.disabled = true; 
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("The response is not ok");
        }
        return response.json();
      })
      .then((data) => displayVideoInfo(data))
      .catch((err) => console.error("Error fetching video info:", err))
      .finally(() => {
        button.disabled = false; 
      });
  } else {
    alert("Invalid link");
  }
};

function extractVideoID(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function displayVideoInfo(data) {
  const videoInfoDiv = document.getElementById("videoInfo");
  videoInfoDiv.style.backgroundColor = "#fff"

  if (data.items && data.items.length > 0) {
    const video = data.items[0];
    console.log(video)

    videoInfoDiv.innerHTML = `
        <div class="video">
                    <img src="${video.snippet.thumbnails.high.url}" alt="Thumbnail" style="width: 100%; ">
        </div>
        <div class="details">
            <h2 class="title">${video.snippet.title}</h2>
            <p>${video.snippet.description}</p>
                    <button id="downloadBttn">Download video</button>

        </div>
        <div>
        </div>
        `;
        document.getElementById("downloadBttn").onclick = download;
  } else {
    videoInfoDiv.innerHTML = "<p class='not-found'>Video not found.</p>";
  }
}

function download () {
    let vidUrl = document.getElementById("videoURL").value.trim(); 

    let vidId = extractVideoID(vidUrl);

    if (vidId) {
        const y2mateLink = `https://www.y2mate.com/youtube/${vidId}`;
        window.open(y2mateLink, '_blank'); 
    } 
    document.getElementById("videoURL").value = ""

};