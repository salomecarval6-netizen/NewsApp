
const NewsItem = (props) => {

/*
The NewsItem component is a dumb, presentation card. It does not manage its own shifting data. 
It simply sits there and waits for the News component to pass down data via props (like a title or an image link).
Because it has no local state to initialize, delete the constructor here. It just needs a standard render() method:

*/

    // It directly reads what it was given by its parent
    let {title,description,imgUrl, moreInfo, author,date,source}=props;//destructing 
//here title,description..are passed as props and not as state since we wont dynamically
//want to change it instead want it to keep constant.Props cant be changed


    return (
      <div className='my-3'>
        <div className="card" /*style={{width: '18rem'}}*/>

         <div style={{display:'flex', justifyContent:'flex-end',position:'absolute',right:'0'}}>
          <span className=" badge rounded-pill bg-danger" >{source}
                <span className="visually-hidden">unread messages</span>
            </span> 
         </div>
          
          <img src={imgUrl} className="card-img-top" alt="..." 
            style={{ height: '200px', objectFit: 'cover' }} />
            {/*Style is added to img to display uniform img */}
            
           
           <div className="card-body"> 
              <h5 className="card-title text-dark">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p class="card-text"><small class="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
              <a rel="noreferrer" href={moreInfo} target="_blank" className="btn btn-sm btn-primary">Read More..</a>
           </div> 
        </div>
      </div>
    )
  
}
//The curly braces {moreInfo} inside your JSX layout tell React: "Stop reading this code as regular
//HTML text, drop into JavaScript mode, and find the value stored inside the moreInfo variable."
export default NewsItem