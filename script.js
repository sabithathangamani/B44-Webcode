
let container = document.getElementById("container")
let previous = document.getElementById("previous")
let next = document.getElementById("next")
let movedata = document.getElementById("movedata")
let btn = document.getElementById("btn")
let offsetvalue = 0;


getPokemonData();
async function getPokemonData() {
    try {
        let url = "https://pokeapi.co/api/v2/pokemon/?limit=4&offset=" + offsetvalue
        let data = await fetch(url)
        let res = await data.json()
        res.results.forEach((ele) => {
            getUrlData(ele.url)
        });
    }
    catch (err) {
        console.log(err)
    }
}

//move to next page
next.addEventListener("click", () => {
    if (offsetvalue == 48) {
        mainDivelement.innerHTML = ""
        offsetvalue=offsetvalue+0;
        getPokemonData();
    }
    else {
        offsetvalue = offsetvalue + 4;
        mainDivelement.innerHTML = ""
        getPokemonData();
    }
})

//move to previous page
previous.addEventListener("click", () => {
    if (offsetvalue == 0) {
        mainDivelement.innerHTML = ""
        getPokemonData();
    }
    else {
        offsetvalue = offsetvalue - 4;
        mainDivelement.innerHTML = ""
        getPokemonData();
    }


})

//display pokemon data
let mainDivelement = document.getElementById("mainDivelement")
async function getUrlData(details) {
    let data1 = await fetch(details)
    let res1 = await data1.json()
    console.log(res1.id)
    let newmove = res1.moves.map(ele => ele.move.name)
    newmove = (newmove.map(ele => ele.charAt(0).toUpperCase() + ele.substr(1)))
    newmove = newmove.toString().split(",").join(" , ");
    var mainDiv = document.createElement('div')
    mainDiv.classList.add("col", "mb-5")
    mainDiv.innerHTML = `  <div class="card cardbg ">
                <img src=${res1.sprites.front_default} class="card-img-top" alt="...">
               <div class="card-body text-body ">
                 <h5 class="card-title text-center name">${res1.name.toUpperCase()}</h5>
                 <div class="container text-center p-2 text-white">
                 <div class="row border-bottom ">
                   <div class="col "> Weight</div>
                   <div class="col">${res1.weight / 10} Kg</div>
                 </div>
                 <div class="row border-bottom">
                   <div class="col"> Height</div>
                   <div class="col">${((res1.height / 10) + 0.01).toFixed(2)} m</div>
                 </div>
                 <div class="row border-bottom">
                   <div class="col"> Ability</div>
                   <div class="col">${(res1.abilities[0].ability.name).replace(/^./, (res1.abilities[0].ability.name)[0].toUpperCase())}</div>
                 </div>
                 <div class="row border-bottom">
                   <div class="col">Type</div>
                   <div class="col">${(res1.types[0].type.name).replace(/^./, (res1.types[0].type.name)[0].toUpperCase())}</div>
                 </div>
                 <div class="row  border-bottom ">
                 <div class="col h-25" id="btn"> Moves</div> </div> 
                 <div class="row">
                 <div class="col" id="movedata">${newmove}</div><div> `

    mainDivelement.append(mainDiv)
}

