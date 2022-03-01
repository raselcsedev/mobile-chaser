const allPhones = () => {
    const searchField = document.getElementById('search-box');
    const searchValue = searchField.value;
    searchField.value='';
    // console.log(searchValue);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showPhones(data.data));
}

const showPhones = (phones) =>{
    console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
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