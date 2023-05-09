
import './App.css';
import { useState, useEffect } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"; //ref function will make the referance to where (in which folder)
//we gonna store images in the firebase
//this function will make the referance to where (in which folder)
import { v4 } from "uuid"; //to randomise letters


function App() {

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/"); //it is the referense to the path in oue storage


  const uploadImage = () => {
    if (imageUpload === null) return;
    //console.log(imageUpload) //File {name: 'water.jpg', lastModified: 1683187623304, lastModifiedDate: Thu May 04 2023 01:07:03 GMT-0700 (Тихоокеанское летнее время), webkitRelativePath: '', size: 133362, …}
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`); //put image with the name "${imageUpload.name + v4()}" to the images folder in the storage of the firebase
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      //alert("Image Uploaded")
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [url, ...prev])
      })
    });

  }

  useEffect(() => {
    listAll(imageListRef).then((response) => { //listAll is a firebase function that list all files in the argument's path 
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [url, ...prev]);
        })
      })
    })
  }, []);



  return (
    <div className="App" lang="en">
      <div className="form">
        <input type="file" onChange={(event) => { setImageUpload(event.target.files[0]) }} />
        <button onClick={uploadImage}>Upload Image</button>
      </div>
      <div className="list">
        {imageList.map((url, key) => {
          return <img src={url} style={{ width: 200 }} key={`img-${key}`} />
        })}
      </div>
    </div>
  );
}

export default App;

