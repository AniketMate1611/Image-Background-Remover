const upload = document.getElementById("uploadButton");
let imageUrl;
const handleUpload = () => {
  const inputFile = document.getElementById("filepicker");
  const image = inputFile.files[0];

  const formData = new FormData();
  formData.append("image_file", image);
  formData.append("size", "auto");

  const loadingScreen = document.createElement("div");
  loadingScreen.style.position = "fixed";
  loadingScreen.style.top = "0";
  loadingScreen.style.left = "0";
  loadingScreen.style.width = "100%";
  loadingScreen.style.height = "100%";
  loadingScreen.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  loadingScreen.style.display = "flex";
  loadingScreen.style.justifyContent = "center";
  loadingScreen.style.alignItems = "center";
  const loadingText = document.createElement("p");
  loadingText.textContent = "Uploading...";
  loadingScreen.appendChild(loadingText);
  document.body.appendChild(loadingScreen);


  const apiUrl = "https://api.remove.bg/v1.0/removebg";
  const apiKey = "fF94WJKScGpRXMTkET2hLFxT";
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey,
    },
    body: formData,
  })
    .then((response) => {
      return response.blob();
    })
    .then((data) => {
        document.body.removeChild(loadingScreen);


      const url = URL.createObjectURL(data);
      imageUrl=url;
      const container = document.createElement("div");
      container.style.display = "flex";
      container.style.justifyContent = "center";
      container.style.alignItems = "center";
      
      const img = document.createElement("img");
      img.src = url;
      img.style.border="2px solid #113f67"
      img.style.borderRadius="5px"
      container.appendChild(img);
      document.body.appendChild(container);
    })
    .catch((err)=>{
        console.log("Error Fetching URL " + err)
    });
};
const handleDownload=()=>{
    if (!imageUrl) {
        alert("Upload an image first");
        return;
    }
    const anchor=document.createElement('a')
    anchor.href=imageUrl;
    anchor.download='bgremoved-image.png'
    document.body.appendChild(anchor)
    anchor.click();
    document.body.removeChild(anchor)
}
const download=document.getElementById('downloadButton')

upload.onclick = handleUpload;
download.onclick=handleDownload

