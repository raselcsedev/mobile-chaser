const allPhones = () => {
    document.getElementById("spinner").style.display = "block";
    const searchField = document.getElementById('search-box');
    const searchValue = searchField.value;

    // clear search field
    searchField.value='';
    // clear phones details
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent='';

    // show search error message
    if(searchValue==''){
        document.getElementById('search-error').style.display='block'; 
        document.getElementById('text-error').style.display='none'; 
        document.getElementById("spinner").style.display = "none"; 
    }
    else{
        // search error message display none
        document.getElementById('search-error').style.display='none';

        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
        fetch(url)
        .then(res => res.json())
        .then(data =>{
            if(data.data==null){
                document.getElementById("spinner").style.display = "block";
                document.getElementById('text-error').style.display='none'; 
            }
            else{
                showPhones(data.data);
                document.getElementById("spinner").style.display = "none";

            }
        }
             );
    }
}
const showPhones = (phones) =>{
    console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent='';
    // 
    if(phones.length ==0){
        document.getElementById('text-error').style.display='block'; 
    }
    else{
        document.getElementById('text-error').style.display='none'; 
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML=`
                    <div class="card h-100">
                        <img src="${phone.image}" class="card-img-top p-2" alt="...">
                        <div class="card-body">
                              <h3 class="phone-name text-center">${phone.phone_name}</h3>
                              <h5 class="brand text-info text-center">${phone.brand}</h5>    
                        </div>
                        <div class="d-flex justify-content-center all-button">
                            <button class="btn btn-danger mx-2 mb-2">Delete</button>
                            <button onclick="details('${phone.slug}')" class="btn btn-success mx-2 mb-2">Details</button>
                        </div>
                    </div>`;
            phoneContainer.appendChild(div);
            })
    }
}

const details = phoneId => {
    console.log(phoneId);
    const url =` https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res=> res.json())
    .then(data=> displayPhone(data.data));
}

const displayPhone = phone => {
    console.log(phone);

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent='';
    document.getElementById('search-error').style.display='none';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML=`
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body ">
            <h5 class="card-text text-warning"> Name : ${phone.name}</h5>
            <div>
            <h5>Features :</h5>
                <ul>
                    <li>Memory : ${phone.mainFeatures.memory}</li>
                    <li>Display Size : ${phone.mainFeatures.displaySize}</li>
                    <li>Sensor : ${phone.mainFeatures.sensors[0]}</li>
                </ul>
            </div>
            <h5 class="card-text">Release : ${phone.releaseDate}</h5>
        </div>
    `;
    phoneDetails.appendChild(div);
}