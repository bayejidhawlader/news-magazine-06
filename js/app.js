// loadCategory 
const loadCategory = async() => {
    const url ="https://openapi.programming-hero.com/api/news/categories"
   try{
    const res =await fetch (url)
    const data = await res.json()
    displayCategory(data.data.news_category)
   }
   catch(error){
    console.log(error);
   }   
}


const displayCategory= async (data)=>{
    const categoryContainer =document.getElementById('category-container');
    data.forEach(category => {
        const {category_name,category_id} =category;
        const categorieDiv =document.createElement('li');
        categorieDiv.classList.add("font-semibold");

        categorieDiv.innerHTML=` 
        <a class="font-medium text-gray-900 bg-white rounded-full border hover:bg-gray-100 w-full" onclick="loadCard(${category_id})">${category_name}</a>
        `;

        categoryContainer.appendChild(categorieDiv)
        
    });
};

// card section 
const loadCard =async(id) =>{

    const url =`https://openapi.programming-hero.com/api/news/category/0${id}`
   try{
    const res =await fetch (url)
    const data = await res.json()
    displayCard(data.data)
   }
   catch(error){
    console.log(error);
   }   
}




const displayCard =(cards) =>{
    const cardSection = document.getElementById('card-section');
    cardSection.textContent =""

    // CATEGORY ITEM MESSAGE
    const foundedMessege = document.getElementById('catefory-item-message');
    foundedMessege.classList.remove('hidden')

    
    // CATEGORY ITEM TEXT
    const fountText = document.getElementById('catefory-item-text')
    fountText.innerText = cards.length;



    // SPINNER 
    const speenerContainer = document.getElementById('spinner');
    speenerContainer.classList.remove('hidden');
    // console.log(speenerContainer);
    
    // sort 

    const sortFind = cards.sort((x,y)=>{
        if(x.total_view < y.total_view){
            return 1;
        }
        else{
            return -1;
        }
    })
    // console.log(sortFind);

    cards.forEach(card => {
        
        const {image_url,thumbnail_url,title,details,author,total_view,} = card;
        const {name,published_date,img} =author;
        
        
      // sort 
       
        // card section html 

        const cardSectionDiv =document.createElement("div");

            // speener 
        const speenerContainer = document.getElementById('spinner');
        speenerContainer.classList.add('hidden');
         
   

        cardSectionDiv.classList.add("card", "lg:card-side", "bg-white", "shadow-xl", "lg:p-4", "mb-5" ,"w-11/12","lg:w-full","mx-auto")
        cardSectionDiv.innerHTML =`
                    <figure class="lg:w-1/4"><img src="${thumbnail_url}" alt="Movie"></figure>
                    <div class="card-body lg:w-3/4">
                      <h2 class="card-title">${title}</h2>
                      <p>${details.length > 400 ? details.slice(0,400) + " ....." : details}</p>
                      <div class="card-actions justify-between items-center">                   
                        <div class="flex">
                            <div class="mr-3">
                                <img class="w-[40px] rounded-full" src="${img ? img : "img not found"}" alt="">
                            </div>
                            <div >
                                <h4 class="font-bold text-xl">${name ? name : "Name Not Found"}</h4>
                            <h5>${published_date ? published_date : "Published Date Not Found"}</h5>
                            </div>
                        </div>
                
                        <div class="flex" >
                           <div>
                            <img src="img/icons8-eye-24.png" alt="">
                           </div>
                                <div class="flex ml-3 items-center">
                                <i class="fa-solid fa-eye text-[#515151] md:text-base text-sm px-1"></i>
                                    <h1><span>${total_view ? total_view : "no views"}</span></h1> 
                                </div>                                                      
                        </div>

                         <div class="card-actions justify-end">
                         <label for="my-modal-4" class="btn btn-primary modal-button" onclick="modal('${card._id}')"><button>See More <i class="fa-solid fa-arrow-right"></i></button></label>
                       </div>
                                        
                      </div>
                    </div>
                  
        `
        cardSection.appendChild(cardSectionDiv)
        
    });
    
}
const modal =async id =>{
    const url =`https://openapi.programming-hero.com/api/news/${id}`
    let data ={};
   try{
    const res =await fetch (url)
    data = await res.json()
    // displayCard(data.data)
   }
   catch(error){
    console.log(error);
   }  
   const {name,published_date,img} = data.data[0].author;
    //   console.log( data.data[0].author);
      console.log(img);
      
    
    const modalBody =document.getElementById('modal-body');
    modalBody.textContent = "";
    modalBody.innerHTML =`
    <p class="mb-3">Author Name :${name? name  : "name not found"}</p>
    <p class="mb-3">Published Date :${published_date ? published_date : 'published date not found'}</p>
    <img src="${img ? img: 'image not found'}"/>
    
    `
}




// card section call 
loadCard("1")


// loadCategory call 
loadCategory()