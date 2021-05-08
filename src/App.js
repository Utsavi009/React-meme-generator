import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import domtoimage from 'dom-to-image';


const App = () => {

  const [infos, setInfos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [randomImage, setRandomImage] = useState('https:\/\/i.imgflip.com\/30b1gx.jpg');

  
  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    setLoading(true)
    await axios.get(`https://api.imgflip.com/get_memes`)
    .then(response => setInfos(response.data.data.memes))
    .catch(error => setError(error))
    setLoading(false)
  }

  const node = document.getElementById('my-meme-image');
  const savedPlace = document.querySelector(".save-image");

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

    <div className="app container">
      <div className='app-header'><h1 className='header-text'> Meme Generator</h1> </div>
      <div className='main-container'>
      <div className='input-form'>
        <div className = 'input-container'>
          <input name='topText' placeholder='Enter Top Text' value={topText} onChange={handleChangeTop} />
          <input name='bottomText' placeholder='Enter Bottom Text' value={bottomText} onChange={handleChangeBottom}/> 
        </div>
        <div className='btn-container'> 
            <button onClick={chooseRandomImage}>Change</button>
            <button onClick={handleSaveImage}>Generate</button>
            <button onClick={resetSavedImage}>Reset</button>
        </div>
        <div className='file-container'>
          <label for="input-file" class="custom-file-upload">
            Custom Upload
          </label>
          <input type="file"  id="input-file" size="60"  accept=".jpg, .jpeg, .png" onChange = {handleImageInputChange}></input>
        </div>
      </div>
      <hr className='hr-style' />
      <div className='image-container'>
      <div className='meme-image' id='my-meme-image'>
        <img src={randomImage} alt='mage' />
        <h2 className='top'>{topText}</h2>
        <h2 className='bottom'>{bottomText}</h2>
      </div>
      <div className='save-image'></div>
      </div>
      </div>
    </div>
    
  );
}

export default App;
