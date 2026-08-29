/*V.V.V IMP:
each API have its own rules values nmaes pagination rules so refer to specific docs only */

//The functions at the top gather and manage the data, while the return statements decide
// what actually shows up on your screen

import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem';
//thus newsItem component is added inside news component
//this single newsItem component can be used multiple time into other component
//also just changing the base structure inside newsItem component changes will be replicated 
// inside multiple newsItem component created in new component
import Spinner from './Spinner';
import PropTypes from 'prop-types'  //impt
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props)=> {

const { setProgress } = props;


//Method 1->direct Method 2->using fetch api
//here we write-> results=[copy entire results object from sampleData]
//In JavaScript and React, you must always call super() inside a child class constructor
// because a child component cannot create its own context for the this keyword.


/*
In React class components, the constructor is the very first thing that runs when your component 
is being born (instantiated). It runs completely automatically behind the scenes before your component is even rendered onto the browser screen.

When React loads your web page and sees <News />, it creates an instance of that class. The order of execution looks like this:
constructor() runs: Sets up the initial state and configures settings.
render() runs: Inspects the state and outputs the HTML layout to the screen.
componentDidMount() runs: Runs immediately after the HTML hits the screen (used for fetching API data)


The News component is your app's brain. It needs to hold a changing list of results, keep track of whether the page is loading, and manage pagination.
 Because it manages shifting data over time, it must have a constructor to initialize that state


If you use regular JavaScript variables (like let results = []), changing the data inside that variable will not trigger any update on your web browser screen. Your UI will stay frozen.
By placing that same data inside this.state, you are telling React: "Keep an eye on this data.
 The moment it changes, refresh the screen immediately so the user can see the updates."

whenever the data inside this.state changes, React automatically re-renders the component to update the UI on the screen.
 */

const capitalize = (text) => {
  if (!text) return ""; // Handles empty strings safely
  return text.charAt(0).toUpperCase() + text.slice(1);
};


const[results,setResults]=useState([])
const[loading,setLoading]=useState(false)
const[currentPageToken,setCurrentPageToken]=useState(null)
const[nextPageToken,setNextPageToken]=useState(null)
const[tokenHistory,setTokenHistory]=useState([])
const[totalResults,setTotalResults]=useState(0)


//document.title=`${this.capitalize(props.category)} - News`;   //to change title of webPage dynamically
   
//pageSize is property in doc of news api which tells no of news on single page
//totalResults is avaiable in sampleData

    
  //results is passed into this.state because the list of news results 
  // is dynamic and will change constantly while using the app.
  


//If you want to pull live data dynamically instead of using a static array, you need to configure an initial
//empty array state inside your constructor(), and then update it asynchronously within the lifecycle method componentDidMount()


  // 1. You DEFINE the custom method here
  const fetchNewsData=async (pageToken) =>{
    // 1. Save the key clearly as a text string first
    setProgress(10)
    let url=`https://newsdata.io/api/1/latest?country=${props.country}&category=${props.category}&apikey=${props.myAPIkey}${pageToken ? `&page=${pageToken}` : ""}`;
    //always first run and check url in browser then copy here

    //console.log("Fetching token:", pageToken);
    //console.log("URL:", url);

    // 1. Start the spinner before fetching
    setLoading(true)

    let data= await fetch(url);
    setProgress(30)
    let parsedData= await data.json();
    setProgress(70)
    //console.log(parsedData)
    //console.log(parsedData.nextPage)
    //check that parsedData.results exists and is an array
    setResults(parsedData.results || [])
    setTotalResults(parsedData.totalResults)
    setCurrentPageToken(pageToken)
    setNextPageToken(parsedData.nextPage || null)
    setLoading(false)
    setProgress(100)
    //imp inside our json we have results not results so imp to write results
  }


  useEffect(()=>{
    document.title=`${capitalize(props.category)} - News`; 
      fetchNewsData(null);
  },[])

  

/*A)
// 3. Your button triggers this custom handler click event
//your current API request will retrieve 10 articles/page
  handlePrevClick = async () => {

  let history = [...this.state.tokenHistory];

  if (history.length === 0) {
    return;
  }

  history.pop();

  let previousToken = history.length > 0
    ? history[history.length - 1]
    : "";

  this.setState({
    tokenHistory: history
  });

  this.fetchNewsData(previousToken);
}
   

handleNextClick = async () => {
  if (this.state.nextPageToken) {

    this.setState(prevState => ({
      tokenHistory: [...prevState.tokenHistory, this.state.currentPageToken]
    }));

    this.fetchNewsData(this.state.nextPageToken);
  }
}
  
A)*/
const fetchMoreData = async (pageToken) => {
    // 1. If there's no nextPageToken string stored in your state, stop instantly
  if (!nextPageToken) return
  let url=`https://newsdata.io/api/1/latest?country=${props.country}&category=${props.category}&apikey=${props.myAPIkey}${pageToken ? `&page=${nextPageToken}` : ""}`;
    //always first run and check url in browser then copy here

    //console.log("Fetching token:", pageToken);
    //console.log("URL:", url);

    // 1. Start the spinner before fetching
    setLoading(true)

    let data= await fetch(url);
    let parsedData= await data.json();
    //console.log(parsedData)
    //console.log(parsedData.nextPage)
    //check that parsedData.results exists and is an array
    setResults((prevResults) => prevResults.concat(parsedData.results))


    setTotalResults(parsedData.totalResults)
    setCurrentPageToken(pageToken)
    setNextPageToken(parsedData.nextPage || null)
    setLoading(false)

  };

//Inside the main return, you are writing JSX (JavaScript XML). JSX looks exactly like HTML, 
//but it allows you to inject live JavaScript logic directly into your layout . 
//console.log("state",this.state)
//React components are written in a mix of JavaScript and HTML layout tags called JSX. The return statement acts as the bridge. 
// Everything you put inside the return is what React converts into real, visible HTML elements on your web page.
//defines the global page layout.

//The return keyword is the explicit command that says: "Take this layout code and paint it onto the user's screen right now."
return (
  <>
      
  <h1 className='text-center' style={{color:'black',margin:'35px 0px', marginTop:'100px'}}>NewsMonkey-Top {capitalize(props.category)} HeadLines</h1>
{/*In React, every element inside an iterating loop (.map()) must have a unique key prop.
.map() is specifically used to take an array of data objects and transform it into an array 
of JSX code blocks (HTML elements) that React can render straight onto the browser screen.

 it loops through each article object and returns a new array of customized <NewsItem /> components
*/}

{/*1. Main Spinner centers perfectly in the dead middle of the screen during the very first load. */}
    {loading && <Spinner/>}

    <InfiniteScroll dataLength={results.length}  next={fetchMoreData}  hasMore={nextPageToken !== null && nextPageToken !== undefined && nextPageToken !== ""}
//results.length!==totalResults
      loader={<Spinner/>} > 
{/*Inside the loader prop, you should write a React element that represents a loading animation or message.
render whatever you pass into the loader prop directly below your list items(default behaviour) */}

{/*2. Scroll Spinner appends neatly at the very bottom, right below the last video card. */}
    

    <div className="container">
      <div className="row">
        {/*!this.state.loading will only display content when data is fetched*/}     
        {/*!this.state.loading &&*/} 
        
        { results && Array.isArray(results) && results.map((element)=>(
/*Your data array (results) contains a raw list of articles, but raw text data cannot be directly displayed on a screen .map()  .filter()  .find() uses return since it modifies array
   modern JavaScript allows you to skip the inner return keyword entirely by using parentheses () instead of curly braces {} in your loop.
          
            With explicit return:
            results.map((element) => {
              return <NewsItem title={element.title} />
            })

            With Implicit return:
            results.map((element) => (
              <NewsItem title={element.title} />
            )) 
          */
            
          <div className="col-md-4" key={element.link} >  {/*Unique key*/}
            <NewsItem 
                  /* 1. If element.title exists, slice it. If it is null, use a backup string */
              title={element.title ? element.title.slice(0, 45) : "Breaking News"} 
                  /* .slice() is used so that uniform length of each news is displayedS */
            
                  /* 2. If element.description exists, slice it. If it is null, use a backup string */
              description={element.description ? element.description.slice(0, 88) : "Click below to read the full summary of this article."}
            

                  /* 3.If element.image_url is not null, use it. Otherwise, fall back to a placeholder image link */
                  /*imgUrl={element.image_url ? element.image_url : "https://placeholder.com"}*/

              imgUrl={element.image_url ? element.image_url : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg "}
            
              author={element.creator ? element.creator : "unknown"}

              date={element.pubDate ?element.pubDate:"" }

              source={element.source_name? element.source_name: "" }
              moreInfo={element.source_url}
            /> 
          </div>
          ))}
        </div>
      </div>
    </InfiniteScroll>
  </>
    )
 
    
  
}
{/*Just search->"Bootstrap-flex class" and get required class as per need
*/}

{/*A)
          <div className="container d-flex justify-content-between">
            //Buttons to load news api from other pages. Disabled imp
            <button disabled={this.state.tokenHistory.length===0}  type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.nextPageToken===null} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>  
A)*/}

{/*Literally 2 hrs to do with pagination error the tutorial had fetch another api.
So basically each api have their own doc data keys and pagination values so refer to that and do */}         
      
        




export default News


News.defaultProps={
      country:'in',
      category:'general'
}

News.propTypes={
      country: PropTypes.string,
      category: PropTypes.string
}
//In Bootstrap, every row is divided into exactly 12 equal grid units of width
//md (Medium Screens)This is a responsive breakpoint. It targets medium-sized devices like 
// tablets and small laptops (screens that are 768 pixels wide or larger).
//12 units per row / column width = 3 cards per row



/*
V.V.V IMP:
1.IS API RETURNING DATA?
Always verify API response at eachstep in fetch() in console
if API doesnt return values correctly no react code can fix it.

2.IS STATE CHANGING?
Console the this.state 

3. IS UI RECIEVING DATA?
console.log(this.state.nextPageToken)
that is values stored in this.state actually reaching JSX that react is using 

3.Is THE FUNCTION RUNNING?
onClick event handler

4.Async time issue due to setstate()



*/