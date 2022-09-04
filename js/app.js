// LOAD CATEGORY 
const loadCategoryes = async() => {
   try{
    const url ="https://openapi.programming-hero.com/api/news/categories"
    const res =await fetch (url)
    const data = await res.json()
    displayCategory(data.data.news_category)
   }
   catch(error){
    console.log(error);
   }
   
}
// LOAD CATEGORY
loadCategoryes()



const displayCategory= async (data)=>{
    
    const categoryContainer =document.getElementById('category-container');
    data.forEach(category => {
        const {category_name,category_id} = category;
        const categorieDiv =document.createElement('li');
        categorieDiv.classList.add("font-semibold");

        categorieDiv.innerHTML=` 
        <a class="font-medium text-gray-900 bg-white rounded-full border hover:bg-gray-100 w-full" onclick="loadCard(${category_id})">${category_name}</a>
        `;
        categoryContainer.appendChild(categorieDiv)
    });
    toggleSpinner(false);
    
};



// CARD SECTION
const loadCard = async(id) => {
    const getSpinner = document.getElementById('spinner');
    getSpinner.classList.remove('hidden');
    
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
loadCard("3")

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
    const getSpinner = document.getElementById('spinner');
    if (cards.length === 0) {
      getSpinner.classList.add('hidden');
    }

    // FIND SORT
    const sortFind = cards.sort((x,y)=>{
        if(x.total_view < y.total_view){
            return 1;
        }
        else{
            return -1;
        }
    });

    cards.forEach(card => {
        
        const {image_url,thumbnail_url,title,details,author,total_view,} = card;
        const {name,published_date,img} = author;

        // SPINNER
        const getSpinner = document.getElementById('spinner');
        getSpinner.classList.add('hidden');

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

                        <div class="flex">
                          <label for="my-modal-3" onclick="loadFullNews('${card._id}')" class="btn text-white bg-green-700 hover:bg-green-800 border-green-700">See More
                          <i class="fa-solid md:pl-2 fa-arrow-right invisible md:visible"></i>
                          </label>                 
                        </div>
                                        
                      </div>
                    </div>
                    
        `
        cardSection.appendChild(cardSectionDiv) 
        
    });
    
}

const loadFullNews = async id => {
    try {
      const url = `https://openapi.programming-hero.com/api/news/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      displayFullNews(data.data);
    }
    catch {
      alert("Data not Found");
    }
  }
  
  const displayFullNews = newsData => {
    console.log(newsData)
    document.getElementById('newsTitle').innerText = newsData[0].title ? newsData[0].title : 'No data found';
    document.getElementById('fullNews').innerText = newsData[0].details ? newsData[0].details : 'No data found';
    document.getElementById('newsAuthor').innerText = newsData[0].author.name ? newsData[0].author.name : 'No data found';
    document.getElementById('newsDate').innerText = newsData[0].author.published_date ? newsData[0].author.published_date : 'No data found';
  }