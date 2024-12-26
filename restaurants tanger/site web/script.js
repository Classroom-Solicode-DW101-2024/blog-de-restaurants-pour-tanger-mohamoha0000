let data;
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/restaurants');
        data = await response.json();
        console.log("fetched data", data);
        update();
    } catch (error) {
        console.log('error fetching', error);
    }
}

// استدعاء الدالة
fetchData();
function update(value="",type="Search By name"){
    const boxs=document.querySelector(".boxs");
    boxs.innerHTML="";
    data.forEach((item) => {
        if(condition(item,value,type)){
        const box=document.createElement("div");
        box.classList.add("box");
        box.innerHTML=`<img src="${item.image_url}">
        <p>${item.name}</p>
        <p>${item.cuisine_type}</p>
        <p>${item.rating}</p>
        <button onclick="window.location.href='detaile.html?id=${item.id}'">detaile</button>`;
        boxs.appendChild(box);
        }
    })
}
function condition(mainvalue,value,type){
    if (type=="Search By name"){
        return mainvalue.name.toLowerCase().includes(value.toLowerCase())
    }else{
        return mainvalue.cuisine_type.toLowerCase().includes(value.toLowerCase())
    }
}