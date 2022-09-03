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
// LOAD CATEGORY
loadCategory()


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
const loadCard = async(id) =>{

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

// CARD LOAD
loadCard("1")


// sort 






const displayCard =(cards) =>{
    const cardSection = document.getElementById('card-section');
    cardSection.textContent =""

    // CATEGORY ITEM MESSAGE
    const foundedMessege = document.getElementById('catefory-item-message');
    foundedMessege.classList.remove('hidden')

    // FIND SORT
    const sortFind = cards.sort((x,y)=>{
        if(x.total_view < y.total_view){
            return 1;
        }
        else{
            return -1;
        }
    });

    
    // CATEGORY ITEM TEXT
    const fountText = document.getElementById('catefory-item-text')
    fountText.innerText = cards.length;

    cards.forEach(card => {
        
        const {image_url,thumbnail_url,title,details,author,total_view,} = card;
        const {name,published_date,img} = author;

        const cardSectionDiv =document.createElement("div");
         
   

        cardSectionDiv.classList.add("card", "lg:card-side", "bg-white", "shadow-xl", "lg:p-4", "mb-15" ,"w-11/12","lg:w-full","mx-auto")
        cardSectionDiv.innerHTML =`
                    <figure class="lg:w-1/4"><img src="${thumbnail_url}" alt="Movie"></figure>
                    <div class="card-body text-black">
                      <h2 class="card-title">${title}</h2>
                      <p>${details.length > 400 ? details.slice(0,400) + "..." : details}</p>
                      <div class="card-actions justify-between items-center">                   
                        <div class="flex">
                            <div class="mr-4">
                                <img class="w-[50px] rounded-full" src="${img ? img : "Image not found"}" alt="">
                            </div>
                            <div >
                            <h4 class="font-bold text-xl">${name ? name : "Name Not Found"}</h4>
                            <h5>${published_date ? published_date : "Published Date Not Found"}</h5>
                            </div>
                        </div>
                
                        

                        <div class="flex" >
                            <div class="flex ml-3 items-center">
                                <i class="fa-solid fa-eye md:text-black text-sm px-2"></i>
                                <h1><span>${total_view ? total_view : "no views"}</span></h1> 
                            </div>                                                      
                        </div>

                         <div class="card-actions justify-end">
                         <label for="my-modal-4" class="btn btn-primary modal-button" onclick="modal('${card._id}')"><i class="fa-solid fa-arrow-right"><button></button></i></label>
                       </div>
                                        
                      </div>
                    </div>
                    
        `
        cardSection.appendChild(cardSectionDiv) 
        
    });
    
}

// MODAL
const modal =async id =>{
    const url =`https://openapi.programming-hero.com/api/news/${id}`
    let data ={};
   try{
    const res = await fetch (url)
    data = await res.json()

   }
   catch(error){
    console.log(error);
   }  
   const {name,published_date,img} = data.data[0].author;
      console.log(img);
      
    // MODAL BODY
    const modalBody =document.getElementById('modal-body');
    modalBody.textContent = "";
    modalBody.innerHTML =`
    <p>Author Name :${name ? name : 'Name not found'}</p>
    <p class="my-3">Published Date :${published_date ? published_date : 'Published date not found'}</p>
    <img src="${img ? img: 'image not found'}"/>
    
    `
}


