

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

        const {features, image , name, id, published_in } = ai;
        
        aiDiv.innerHTML=`
        
        <div style="background-color: #ffc6a5;" class="card h-100 shadow-lg overflow-hidden">
          <img src= "${image}" class="card-img-top img-fluid ai-image " alt="AI Image">
          <div class="card-body mb-3">
            <h3 class="card-title text-center pb-2">${name}</h3>
            <h5>Features</h5>
            <ul class="list-group">
            ${ (features.map(val => `<li class="features-list" >${val}</li>`)).join(' ') }
            </ul>
          </div>
          <div style="background-color: #e6324b;" class="card-footer py-3">
              <small class="text-light"> <i class="fa-regular fa-calendar-days"></i> Published: ${published_in}</small>
              <button onclick="modalDetails('${id}')" class="arrow-btn" data-bs-toggle="modal" data-bs-target="#showModalDetails" ><i class="fa-solid fa-location-arrow"></i></button>
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

    isLoadingToggle(true)
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    const ai = data.data;
    const features = Object.values(ai.features);


    document.getElementById('showModalDetailsLabel').innerText = ai.tool_name;

    const aiDetails = document.getElementById('ai-details');

    aiDetails.innerHTML=`

            <div class="row gap-4 p-lg-5 p-md-2 modal-div">
            <div style="background-color: #ffdcc7; border: 1px solid #e6324b;" class="col p-3 rounded">
                <h6>${ ai.description ? ai.description : "No Description" }</h6>

                <div class="mt-3 d-flex flex-column gap-2">
                   <div class="price-btn bg-success">
                   <p class="plans"> ${ai.pricing==null? 'Free of Cost' : ai.pricing[0].price? (ai.pricing[0].price!=0? 'Basic - ' + ai.pricing[0].price : "Free of cost") : 'Free of cost' }  </p>
                   </div>
                   <div class="price-btn bg-warning">
                   <p class="plans"> ${ai.pricing==null? 'Free of Cost' :  ai.pricing[1].price? (ai.pricing[1].price!=0? 'Pro - '+ ai.pricing[1].price : "Free of cost") : 'Free of cost' }  </p>
                   </div>
                   <div class="price-btn bg-danger">
                   <p class="plans"> ${ai.pricing==null? 'Free of Cost' :  ai.pricing[2].price? (ai.pricing[2].price!=0? 'Enterprise - '+ ai.pricing[2].price : "Free of cost") : 'Free of cost' }  </p>
                     
                </div>
                </div>

                <div class=" d-flex justify-content-around mt-3">
                    <div>
                        <h6>Features</h6>
                        <ul>
                        ${ features? features.map(val => `<li class="" >${val.feature_name}</li>`).join(' ') : "Not Found" }
                        </ul> 
                    </div> 
                    <div>
                        <h6>Integration</h6>
                        <ul>
                        ${ ai.integrations? ai.integrations.map(val => `<li class="" >${val}</li>`).join(' ') : "Not Found" }
                        </ul>
                    </div>
                </div>
            </div>

            <div class=" p-1 col">
                <div class="d-flex justify-content-center">
                ${ai.accuracy.score? `<span class="badge bg-danger btn-badge">  ${ai.accuracy.score*100}% Accuracy </span>`: ""}
                    <img style="height: 15rem;" class="img-fluid rounded" src="${ai.image_link[0]}" alt="Ai Image">
                </div>
                <div class="mt-3 text-center">
                     ${ ai.input_output_examples==null? `<p>No! Not Yet! Take a break!!!</p>` : (`<h6>${ai.input_output_examples[0].input ? ai.input_output_examples[0].input : "Can you give any example?" }</h6><p style="font-size: 16px;">${ai.input_output_examples[0].output? ai.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>`)} 

                </div>
            </div>
        </div>

    `;
}



loadData(6);


