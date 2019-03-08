const firePixelArray = [];
const fireHight = 40;
const fireWidth = 40;
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}];
const debug = false;
function start(){
    creatFireDataStructure();
    creatFireSource();
    renderFire();
    setInterval(calculeteFirePropagation,50);
}
function creatFireDataStructure(){
    const numberOfPixes = fireHight * fireWidth;
    for(let i = 0; i<numberOfPixes; i++){
        firePixelArray[i] = 0;
    }
}
function calculeteFirePropagation(){
    for (let column = 0; column < fireWidth; column++) {
        for(let row = 0; row < fireHight; row++) {
            let pixelIndex = column + (fireWidth * row);
            updateFireIntensityPerPixel(pixelIndex);
        }     
    }
    renderFire();
}
function updateFireIntensityPerPixel(currentPixelIndex) {
    let belowPixelIndex = currentPixelIndex + fireWidth;
    if (belowPixelIndex >= fireHight * fireWidth) {
        return;
    }
    let decay = Math.floor(Math.random()*3);
    let decayIndex =Math.floor(Math.random()*3);
    let belowPixelFireIntensity = firePixelArray[belowPixelIndex];
    let newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay: 0;
    firePixelArray[currentPixelIndex - decayIndex] = newFireIntensity;
}
function decreaseFireIntensity(clikedPixelIndex) {
    let decay = Math.floor(Math.random()*36);
    let PixelFireIntensity = firePixelArray[clikedPixelIndex];
    let newFireIntensity = PixelFireIntensity - decay >= 0 ? PixelFireIntensity - decay: 0;
    console.log(newFireIntensity);
    firePixelArray[clikedPixelIndex] = 0;
    renderFire();

}
function renderFire(){
    let html = "<table cellpadding=0 cellspacing=0>";
    for(let row =0; row < fireHight; row++){
        html += "<tr>";
        for(let column = 0; column < fireWidth; column++){
            let pixelIndex = column + (fireWidth * row);
            let fireIntensity =firePixelArray[pixelIndex];
            if (debug == true) {
                html += "<td>";
                html += "<div class ='pixel-index'>"+pixelIndex+"</div>";
                html +=  fireIntensity;
                html += "</td>";
            }
            else{
                let color = fireColorsPalette[fireIntensity];
                let colorString = `${color.r},${color.g},${color.b}`;
                html +=`<td  class="pixel" style="background-color: rgb(${colorString})">`;
                //html +=`<td  onmouseover="decreaseFireIntensity(${pixelIndex})" class="pixel" style="background-color: rgb(${colorString})">`;
                html += "</td>";
            }
        }
        html += "</tr>";
    }
    html += "</table>"
    document.querySelector('#fireCanvas').innerHTML = html;
}
function creatFireSource(){   
    let overflowPixelIndex = fireWidth * fireHight;
    for (let column = 0; column <= fireWidth; column++) {
        let pixelIndex = (overflowPixelIndex - fireWidth) + column;

        firePixelArray[pixelIndex]= 36;
    }
}