import {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';


const Home = ()=>{
const [articles, setArticles] = useState([]);
const [count,setCount]= useState(0)
const  fetchData = async ()=>{
      const url ="https://newsdata.io/api/1/latest?apikey=pub_82cca6454fb54bf5bb4fc11d72a0947c";
 
      try {
      let response = await fetch(url);
      let data = await response.json(); // Convert response stream into readable JSON
      //console.log(data);
      setArticles(data.results || []); // Store the articles array in state
    } catch (error) {
      console.error("Error fetching news:", error);
    }
}

useEffect(()=> {
    alert("Welcome to your own NewsApp...");
    fetchData();
},[])
   

  return(
    <>
    

     {/* 1. Main Outer Layout Wrapper */}
      <div className="container my-4 overflow-hidden vh-100 pt-5 d-flex flex-column">
        <h1 style={{marginBottom: '30px', textAlign:'center'}}>Latest News.............</h1>
        {/* 2. Main Row Engine (No width locks, no instant closing tags) */}
        <div className="row flex-grow-1 overflow-hidden">
         {/* Used .slice(0, 6) to automatically map only the first 6 items safely */} 
          {articles && articles.slice(0, 6).map((article, index) => (
            
            // 3. Columns take up 4 grid slots on medium screens (12 units total / 4 = 3 per row)
            // Added index fallback to key loop to prevent crashes on empty article IDs
            <div className="col-md-4 h-50 " key={article.article_id || index}>  
              
              {/* Card will automatically scale to 100% of the dynamic column width */}
              <div className="card" style={{ width: "100%" }}>
                <img 
                  src={article.image_url || "https://unsplash.com"} 
                  className="card-img-top" 
                  alt="News illustration thumbnail"
                  style={{ height: "200px", objectFit: "cover" }} // Keeps all card image ratios uniform in your rows
                />
                <div className="card-body">
                  <p className="card-text">
                    {article.description ? article.description.slice(0, 100) + "..." : "No article description available."}
                  </p>
                </div>
              </div>

            </div>
          ))}

        </div> {/* End of row */}
      </div> {/* End of container */}
    </>
  );
}
export default Home;