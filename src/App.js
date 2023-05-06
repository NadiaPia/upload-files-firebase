import './App.css';
import { useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage"; //ref function will make the referance to where (in which folder)
//we gonna store images in the firebase
//this function will make the referance to where (in which folder)
import { v4 } from "uuid"; //to randomise letters





function App() {

  const [imageUpload, setImageUpload] = useState(null);

  const uploadImage = () => {
    if(imageUpload === null) return;
    //console.log(imageUpload) //File {name: 'water.jpg', lastModified: 1683187623304, lastModifiedDate: Thu May 04 2023 01:07:03 GMT-0700 (Тихоокеанское летнее время), webkitRelativePath: '', size: 133362, …}
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`); //put image with the name "${imageUpload.name + v4()}" to the images folder in the storage of the firebase
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Image Uploaded")
    })

  }
  
  return (
    <div className="App">
      <input type="file" onChange={(event) => {setImageUpload(event.target.files[0])}}/>
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
}

export default App;
