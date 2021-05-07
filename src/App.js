import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import domtoimage from 'dom-to-image';


function App() {

  const [infos, setInfos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [randomImage, setRandomImage] = useState('https:\/\/i.imgflip.com\/30b1gx.jpg');

  const node = document.getElementById('my-meme-image');
  const savedPlace = document.querySelector(".save-image");

  console.log(node);

  const handleSaveImage = () => {
    domtoimage.toPng(node)
    .then(function (dataUrl) {
      let img = new Image();
      img.src = dataUrl;
      savedPlace.appendChild(img);
    }).catch(function (error) {
      console.error('oops, something went wrong!', error);
    });
  }

  const resetSavedImage = () => {
    savedPlace.innerHTML = "";
  }
    
  useEffect(() => {
    fetchData();
  },[])  

  const fetchData = async () => {
    setLoading(true)
    await axios.get(`https://api.imgflip.com/get_memes`)
    .then(response => setInfos(response.data.data.memes))
    .catch(error => setError(error))
    setLoading(false)
  }
  

  const chooseRandomImage = () => {
    let length = infos.length;
    let imageIndex = Math.floor(Math.random() * length);
    setRandomImage(infos[imageIndex].url) 
  }

  const handleChangeTop = (e) => {
    setTopText(e.target.value)
  }

  const handleChangeBottom = (e) => {
    setBottomText(e.target.value)
  }

  const handleImageInputChange = ({ target }) => {
    setRandomImage(window.URL.createObjectURL(target.files[0]));
    target.value = "";
  };

  return (
    <div className="app">
      <div className='app-header'><h1> Meme Generator</h1> </div>
      <div className='input-form'>
            <input name='topText' placeholder='Enter Top Text' value={topText} onChange={handleChangeTop} />
            <input name='bottomText' placeholder='Enter Bottom Text' value={bottomText} onChange={handleChangeBottom}/>  
            <button onClick={chooseRandomImage}>Change</button>
            <button onClick={handleSaveImage}>Generate</button>
            <button onClick={resetSavedImage}>Reset</button>
            <input type="file"  id="input-file" accept=".jpg, .jpeg, .png" onChange = {handleImageInputChange}></input>
      </div>
      <div className='meme-image' id='my-meme-image'>
        <img src={randomImage} alt='mage' />
        <h2 className='top'>{topText}</h2>
        <h2 className='bottom'>{bottomText}</h2>
      </div>
      <div className='save-image'></div>
    </div>
  );
}
/* https://imgflip.com/api */
export default App;
