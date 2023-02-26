const loadPhones = async(searchText , dataLimit)=>{
    const URL= `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res= await fetch(URL);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}

const displayPhone= (phones, dataLimit)=>{
    const phoneContainer = document.getElementById("phone-container");

phoneContainer.innerHTML="";

// display 10 Phone
const showAll =document.getElementById("show-all");
if(dataLimit && phones.length > 10){
  phones = phones.slice(0,10);
  showAll.classList.remove("d-none");
} else{
showAll.classList.add("d-none");
}

  
// display no Phone
const noPhone =document.getElementById("no-found-message")
if(phones.length===0){
  // alert("No phones found");
noPhone.classList.remove("d-none");
}else{
  noPhone.classList.add("d-none");
}

// display all phone 
phones.forEach(phone => {
    // console.log(phone);

    const phoneDiv= document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML=`
    
    <div class="card h-100 text-warning-emphasis">
                <img src="${phone.image}" class="card-img-top img-fluid p-3" alt="...">
                <div class="card-body">
                  <h2 class="card-title">Brand : ${phone.brand}</h2>
                  <h3 class="card-title">
                   ${phone.phone_name
                  }</h3>
                  <h5 class="card-title">slug: ${phone.slug}</h5>
                  <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
                </div>
              </div>
    
    `
    phoneContainer.appendChild(phoneDiv)
});
// stop spinner 
toggleSpinner(false);

}

const processSearch=(dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText,dataLimit);
}

document.getElementById("search-btn").addEventListener("click",function(){
  // start loader 
  processSearch(10);
  
})

document.getElementById('search-field').addEventListener('keypress', function (e) {
  // console.log(e.key);
  
    if (e.key === 'Enter') {
      processSearch(10);
    }
  });
  

const toggleSpinner = isLoading=>{
  const loaderSections = document.getElementById("loader");
  if(isLoading){
    loaderSections.classList.remove("d-none")
  }
  else{
    loaderSections.classList.add("d-none")
  }
}

// not the best way to load show all 
document.getElementById("btn-show-all").addEventListener("click",function(){
processSearch();
})

const loadPhoneDetails= async id =>{
  const URL = `https://openapi.programming-hero.com/api/phone/${id}`
  const res = await fetch(URL);
  const data = await res.json();
  displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
  console.log(phone);
  const modalTitle = document.getElementById("phoneDetailsModalLabel");
  modalTitle.innerText= phone.name;
  const modalBody = document.getElementById("modal-body-show");
  modalBody.innerHTML=`
  <p>Release Date : ${phone.releaseDate ? phone.releaseDate: "No Release Date"}</p>
  <p>Storage : ${phone.mainFeatures.storage ? phone.mainFeatures.storage: "No Storage" }</p>
  <p>Display : ${phone.mainFeatures.displaySize}</p>
  `
}

loadPhones("iphone");