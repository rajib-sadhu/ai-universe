

// Load API Data
const loadData = async (dataLimit) =>{

    
    isLoadingToggle(true);

    const url = `https://openapi.programming-hero.com/api/ai/tools`;

   try{
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data.tools)
    displayData(data.data.tools, dataLimit);
   }
   catch(error){
    console.error(error);
   }
}

// Display API Data to HTML file
const displayData = (data, dataLimit) =>{
    // console.log(data)

    const aiElementsContainer = document.getElementById('ai-container');
    aiElementsContainer.innerHTML=``;


    // Display Limited data or All Data
    const showAll = document.getElementById('show-all');
    if(dataLimit && data.length > 6){
        data = data.slice(0,6);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none')
    }
    

    // Display data on HTML file
    for(const ai of data){

        const aiDiv = document.createElement('div');
        aiDiv.classList.add('col');

        const features = ai.features;
        
        aiDiv.innerHTML=`
        
        <div style="background-color: #ffc6a5;" class="card h-100 shadow-lg overflow-hidden">
          <img src= "${ai.image}" class="card-img-top img-fluid ai-image " alt="AI Image">
          <div class="card-body mb-3">
            <h3 class="card-title text-center pb-2">${ai.name}</h3>
            <h5>Features</h5>
            <ul class="list-group">
            ${ features.map(val => `<li class="features-list" >${val.slice(0,-1)}</li>`) }
            </ul>
          </div>
          <div style="background-color: #e6324b;" class="card-footer py-3">
              <small class="text-light"> <i class="fa-regular fa-calendar-days"></i> Published: ${ai.published_in}</small>
              <button onclick="modalDetails('${ai.id}')" class="arrow-btn" data-bs-toggle="modal" data-bs-target="#showModalDetails" ><i class="fa-solid fa-location-arrow"></i></button>
            </div>
        </div>
        `;
        aiElementsContainer.appendChild(aiDiv);
    }

    isLoadingToggle(false)
}
// 

// show all data btn
document.getElementById('btn-show-all').addEventListener('click', ()=>{
    loadData()
});


// API data Loading
function isLoadingToggle (isLoad){
    
    const load = document.getElementById('isLoading');

    if(isLoad){
        load.classList.remove('d-none');
    }
    else{
        load.classList.add('d-none');

    }
}

// Show Modal Details
async function modalDetails(id){

    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    const ai = data.data;

    document.getElementById('showModalDetailsLabel').innerText = ai.tool_name;

    const aiDetails = document.getElementById('ai-details');
    // phoneDetails.innerHTML=`
    //         <div class="d-flex gap-4">
    //             <div class="w-50">
    //             <img src="${phone.image}" class="img-fluid">
    //             </div>
    //             <div>
    //                 <p> Release Date : ${ phone.releaseDate? phone.releaseDate : 'Release date not found' } </p>
    //                 <p> Brand : ${ phone.brand? phone.brand : 'Brand name not found' } </p>
    //                 <p> Memory : ${ phone.mainFeatures.memory? phone.mainFeatures.memory : 'Not found' } </p>
    //                 <p> Display size : ${ phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'Not found' } </p>
    //                 <p> Storage : ${ phone.mainFeatures.storage ? phone.mainFeatures.storage : 'Not found' } </p>
    //             </div>
    //         </div>
            
    // `;

}



loadData(6);