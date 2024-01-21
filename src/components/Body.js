import { useContext, useEffect, useState } from "react";
import RestaurantCard,{withPromotedLabel} from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";



  
const Body=()=>{
    const [listofRestaurant,setList]=useState([]);
    const [filteredRestaurant,setFilteredRestaurant]=useState([]);
    const [searchText,setSearchText]= useState("");
    const {setUserName,loggedInUser}=useContext(UserContext);

    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
    useEffect(()=>{
      fetchData();
       },[]);

       const fetchData= async()=>{
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING");
        const jsonData = await data?.json();
         console.log(jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
         const ResData = jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        
    setList(ResData);
    setFilteredRestaurant(ResData);
       }
       const status= useOnlineStatus();

       if(status===false){
        return <h1>Looks Like You are OFFline!! Rn</h1>
       }
       
      
       
    return listofRestaurant?.length==0?<Shimmer/>:(
      <div className='body'>
        <div className="filter flex ">
        <div className='search m-4 p-4 '>
          <input type="text" className="border border-solid border-black" value={searchText}
          onChange={(e)=>{
            setSearchText(e.target.value);

          }}/>
          {/* <input>Logged in User</input> */}
          <button className="px-4 py-2 bg-green-100 m-4 rounded-lg" onClick={()=>{
           const filteredRestaurant=  listofRestaurant.filter((res)=>res.info.name.toLowerCase().includes(searchText.toLowerCase()));
           
           setFilteredRestaurant(filteredRestaurant);

          }} >Search</button>
          </div>
          <div className="m-4 p-2 flex items-center">
          <button className="px-4 py-2 bg-gray-100" onClick={()=>{
              const filteredList= listofRestaurant.filter((res)=> res.info.avgRating>=4);
              setFilteredRestaurant(filteredList);
              

               

            }}>Top Rated Restaurants</button>
          </div>
          <div className="m-4 p-4 flex items-center">
           <label className="p-4">UserName:</label>
           <input 
           value={loggedInUser} className="border border-black p-2" onChange={(e)=>setUserName(e.target.value)}></input>
          </div>

            

        </div>
        
        <div className='flex flex-wrap'>
     {
        filteredRestaurant.map((restaurant)=>(
        
           <Link key={restaurant.info.id} to={"/restaurants/"+restaurant.info.id}>
        {
          restaurant.info.promoted ? (<RestaurantCardPromoted resData={restaurant}/>):(<RestaurantCard resData={restaurant}/>)
        }
        </Link>
        ))
     }
          
    
           
              
     
  
        </div>
        
      </div>
  
    );
  
  }
  export default Body;