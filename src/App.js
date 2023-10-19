import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageModal from './Modal';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

function App() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch photos from Unsplash API when the component mounts
    const fetchData = async () => {
      const response = await axios.get(
        'https://api.unsplash.com/photos?page=2&per_page=30&client_id=56bMNI5mvGl9QqdzAaNIrh3CHCszgxcPEKAAdNcKRq0'
      );
      setImages(response.data);
    };
    fetchData();
  }, []);

  // Handle search input change
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${search}`,
        {
          params: {
            page: 2,
            per_page:20,
          },
          headers: {
            Authorization:
              'Client-ID 56bMNI5mvGl9QqdzAaNIrh3CHCszgxcPEKAAdNcKRq0', // Replace with your actual API key
          },
        }
      );
      console.log(response);

      if (response) {
        setImages(response.data.results);
      } else {
        window.alert('No results found');
      }
    } catch (error) {
      console.error('API request error:', error);
      window.alert('An error occurred while fetching data');
    }
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="py-4 py-lg-5 container">
      <div className="upper">
      <input
      className='shadow'
        type="text"
        placeholder="Search for images"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className='shadow' onClick={handleSearch}>Search</button>
      </div>
      

      <div className="parent" style={{ padding: '10px' }}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}>
          <Masonry gutter="20px">
            {images.map((image) => (
              <div className="child" style={{ width: '100%', display: 'block' }} key={image.id} onClick={() => openImageModal(image)}>
                <div className="card shadow">
                  <img src={image.urls.thumb} className="card-img-top" alt={image.alt_description}/>
                  <div className="card-body">
                    
                    <p>{image.user.username}</p>
                    <p><i class="zmdi zmdi-thumb-up"></i> {image.likes}</p>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      <ImageModal image={selectedImage} onHide={closeImageModal} />
    </section>
  );
}

export default App;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Modal from './Modal';
// import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"


// function App() {
//   const [images, setImages] = useState([]);
//   const [search, setSearch] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     // Fetch photos from Unsplash API when the component mounts
//     const fetchData = async () => {
//       const response = await axios.get('https://api.unsplash.com/photos?page=1&per_page=35&client_id=56bMNI5mvGl9QqdzAaNIrh3CHCszgxcPEKAAdNcKRq0');
//       setImages(response.data);
//     };
//     fetchData();
//   }, []);

//   // Handle search input change
//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`https://api.unsplash.com/search/photos?query=${search}`, {
//         params: {
//           page: 1,
//           per_page: 10,
//         },
//         headers: {
//           Authorization: 'Client-ID 56bMNI5mvGl9QqdzAaNIrh3CHCszgxcPEKAAdNcKRq0', // Replace with your actual API key
//         },
//       });
//       console.log(response)
  
//       if (response) {
//         setImages(response.data.results);
//       } else {
//         window.alert("No results found");
//       }
//     } catch (error) {
//       console.error("API request error:", error);
//       window.alert("An error occurred while fetching data");
//     }
//   };

//   return (
//     <section className='py-4 py-lg-5 container'>
//       <input type="text" placeholder="Search for images" onChange={(e) => setSearch(e.target.value)} />
//       <button onClick={handleSearch}>Search</button>
      
//       <div className="parent" style={{padding: "10px"}} >

//       <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
//                 <Masonry gutter='20px'>
                   
//             {images.map((image) => (
//             <div className='child' style={{width: "100%", display: "block"}} key={image.id}>
//             <div className="card shadow">
//                 <img src={image.urls.thumb}  className="card-img-top" alt={image.alt_description}/>
//               <div className="card-body">
//                   <p>{image.user.username}</p>
//                   <p>Likes: {image.likes}</p>
//               </div>
//             </div>
//             </div>
//             ))}
//                 </Masonry>
//             </ResponsiveMasonry>


//       </div>
//     </section>
//   );
  
// }
// export default App;
