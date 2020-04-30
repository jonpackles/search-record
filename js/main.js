let locations = [];
let cleanedData = [];
let currentPlacement = 0;
let marginX = 60;
let marginY = 60;
let spacing = 200;
let searches = ['why is', 'where do', 'how are', 'how many', 'what is', 'should i', 'why is', 'where do', 'how are', 'how many', 'what is', 'should i', 'why is', 'where do', 'how are', 'how many', 'what is', 'should i', 'why is', 'where do', 'how are', 'how many', 'what is', 'should i', 'why is', 'where do', 'how are', 'how many', 'what is', 'should i', 'why is', 'where do', 'how are', 'how many', 'what is', 'should i', 'why is', 'where do', 'how are', 'how many', 'what is', 'should i', 'why is', 'where do', 'how are', 'how many', 'what is', 'should i', 'why is', 'where do', 'how are', 'how many', 'what is', 'should i', 'why is', 'where do', 'how are', 'how many', 'what is', 'should i', 'why is', 'where do', 'how are', 'how many', 'what is', 'should i', 'why is', 'where do', 'how are', 'how many', 'what is', 'should i', 'why is', 'where do', 'how are', 'how many', 'what is', 'should i', 'why is', 'where do', 'how are', 'how many', 'what is', 'should i', 'why is', 'where do', 'how are', 'how many', 'what is', 'should i', 'why is', 'where do', 'how are', 'how many', 'what is', 'should i', 'why is', 'where do', 'how are', 'how many', 'what is', 'should i', 'why is', 'where do', 'how are', 'how many', 'what is', 'should i']
let searches1 = ['search', 'record', 'search', 'record', 'search', 'record', 'search', 'record', 'search', 'record', 'search', 'record', 'search', 'record', 'search', 'record', 'search', 'record', 'search', 'record', 'search', 'record', 'search', 'record', 'search', 'record', 'search', 'record', 'search', 'record']
let cleanedSearches = [];
let who = [];
let what = [];
let when = [];
let where = [];
let why = [];
let how = [];
let ws = ['who', 'what', 'when', 'where', 'why', 'how'];
let currentW = 1;
let fadeLength = 1500;

myDropZone = $('#dropzoneArea');



Dropzone.options.dropzoneArea = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 100, // MB
    dictDefaultMessage: 'Drop MyActivity.json file here.',
    maxFiles: 1,

    init: function () {
        this.on("success", function (file, data) { 
            console.log(file);
            console.log(data);
            this.removeFile(file);
        });
    },

    accept: function (file, done) {
        if (file.name == "justinbieber.jpg") {
            done("Naha, you don't.");
        }
        else { done(); }
    }
};






function setup(){
    let mainCanvas = createCanvas(windowWidth, windowHeight);
    mainCanvas.addClass('mainCanvas');
    textFont('Roboto');
    textSize(18);
    background(22);
    fill(255);
    textAlign(LEFT);

    for(let s = 0; s<=searches.length-1; s++){
        searches[s]=' ' + searches[s];
    }
    
    setLocations();
    typeSearches();
    // textAlign(CENTER);
    // textSize(70);
   

    


    // locations.forEach(element => {

    //     typeWriter('hello', 0, element.x, element.y, 100);

    // });


    

}

function setLocations(){
    for(let x = marginX; x <= width-marginX; x+= spacing){
        
        for(let y = marginY; y <= height - marginY; y+=spacing-100){
            storeCoordinate(x,y,locations);
        }
    }

    
}

function storeCoordinate(xVal, yVal, array) {
    array.push({ x: xVal, y: yVal });
}

// function keyPressed() {
//     // n = noise(x , y * slider.value(), millis() * .0003);
//     background(22);
//     textAlign(CENTER);
//     textSize(190);
//     textFont('Bookmania');
//     text('SEARCH', width / 2, height / 2 - 90);
//     text('RECORD', width / 2, height / 2 + 90);
// }

function typeSearches(){
    for (let i = 0; i <= locations.length - 1; i++) {
        let typeSpeed= random(120,300);
        typeWriter(searches[i], 0, locations[i].x, locations[i].y, typeSpeed);
    }
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function typeWriter(sentence, n, x, y, speed) {
    if (n < (sentence.length)) {
        text(sentence.substring(0, n + 1), x, y);
        n++;
        setTimeout(function () {
            typeWriter(sentence, n, x, y, speed)
        }, speed);
    }

  
}



$(document).on('scroll', function () {

    if ($('#title').visible(true) === true) {
     
        $('.mainCanvas').fadeOut('slow');
    } 

    if ($('#prologueSection').visible(true) === true) {

        $('body').addClass('whiteBG');
    }
});



$(document).ready(function () {

   

   
});



var input = document.getElementById("fileInput");

input.addEventListener('change', function (event) {
    var files = input.files;
    readFile(files[0]);
}, false);

function readFile(source) {
   

    var fileReader = new FileReader();
    fileReader.onload = function (e) {
        dataString = fileReader.result;
        data = JSON.parse(dataString);
      
        cleanData();
        loadSomeSearches(currentPlacement, currentPlacement + loadIncrement)
    }

    fileReader.readAsText(source);



}

const cleanData = function () {

    // data is the array we wanna clean up
    // then we're going to put it into cleanedData[]

    console.log("cleanData() is running");


    data.forEach(function (search) {

        if (search.title.indexOf("Searched for") !== -1) {

            cleanedData.push(search);
            loadIncrement = cleanedData.length;


        }
    })

   

}



const loadSomeSearches = function (startVal, endVal) {


    for (let i = startVal; i < endVal; i++) {
        

        let search = cleanedData[i];
        var cleanedSearch = search.title.replace("Searched for ", "")

        $('#searches').append(`<span class="search" data-date="${search.time}">${cleanedSearch} </span>`)

        cleanedSearches.push(search);
        let firstFiveCharacters = cleanedSearch.substring(0, cleanedSearch.indexOf(' ')+1);

        if((firstFiveCharacters.includes('who ')) === true){
            who.push(cleanedSearch);

        } else if((firstFiveCharacters.includes('what ')) === true){
            what.push(cleanedSearch);
        } else if((firstFiveCharacters.includes('when ')) === true){
            when.push(cleanedSearch);
        } else if ((firstFiveCharacters === ('where '))){
            where.push(cleanedSearch);
        } else if ((firstFiveCharacters.includes('why '))===true){
            why.push(cleanedSearch);
        } else if ((firstFiveCharacters===('how '))){
            how.push(cleanedSearch);
        }


    }

    $('#qs').html(`${ws[currentW]}<span class="blinking-cursor">|</span>`);
    // what.forEach(element => $('#searchBlockWhat').append(`<span class="search">${element} </span>`))
   
    
    
    

    

    console.log("loadSomeSearches() is running");




    // (function theLoop(i) {
    //     setTimeout(function () {
    //         let search = cleanedData[i];
    //         var cleanedSearch = search.title.replace("Searched for ", "");

            
    //         $('#searchBlock').append(`<span class="searchQuery">${cleanedSearch}<span>`)
    //         // $("#mainSearch").replaceWith(`<h2 id = "mainSearch" data-date="${search.time}">${cleanedSearch} </h2>`);


    //         cleanedSearches.push(search);
    //         if (--i) {          // If i > 0, keep going
    //             theLoop(i);       // Call the loop again, and pass it the current value of i
    //         }
    //     }, speed);
    // })(endVal - 1);

    for (let i = startVal; i < endVal; i++) {

        let search = cleanedData[i];
        var cleanedSearch = search.title.replace("Searched for ", "");


        // $('#searchBlock').append(`<span class="searchQuery">${cleanedSearch}<span> `)



    }


    currentPlacement += loadIncrement;

    everythingElse();

}

const everythingElse = function () {

  


    $('body').on('click', function (e) {

        e.preventDefault();


    })




   

    $('.search').on('click', function (e) {
        e.preventDefault();
        var txt = $(e.target).text();
        $(this).toggleClass('searchSelected');
        poem.push(txt);
        console.log(poem);

    })

  

}




$("#qs").click(function () {

    if (currentW === 5) {
        currentW = 0
    } else {
        currentW++;
    }
    console.log(currentW)
    $('#searchBlockWhat').empty();

    console.log('qs clicked')
    $('#qs').html(`${ws[currentW]}<span class="blinking-cursor">|</span>`);
    

    if ($('#qs:contains("who")').length > 0) {
        $('#searchBlockWhat').hide();
        
        // for each element, grab characters before space and put that inside a span
        who.forEach(element => {
            let pronoun = element.substr(0, element.indexOf(' '));
            let nonpronoun = element.substr(element.indexOf(pronoun)+pronoun.length, element.length);
            console.log(nonpronoun);
            element = element.replace(pronoun, `<span class="pronoun">${pronoun}</span>`);
            element = element.replace(nonpronoun, `<span class="nonpronoun">${nonpronoun}</span>`)
            $('#searchBlockWhat').append(`<span class="search">${element} </span>`);
        }
            
            );
            
        $('#searchBlockWhat').slideDown(fadeLength, function () {
            $('.nonpronoun').fadeTo(1000, 1);
            
        });
        
    } else if ($('#qs:contains("what")').length > 0){
        $('#searchBlockWhat').hide();
        
        what.forEach(element => {
            let pronoun = element.substr(0, element.indexOf(' '));
            let nonpronoun = element.substr(element.indexOf(pronoun) + pronoun.length, element.length);
            console.log(nonpronoun);
            element = element.replace(pronoun, `<span class="pronoun">${pronoun}</span>`);
            element = element.replace(nonpronoun, `<span class="nonpronoun">${nonpronoun}</span>`);
            $('#searchBlockWhat').append(`<span class="search">${element} </span>`);
        }
        );
        
        $('#searchBlockWhat').slideDown(fadeLength, function () {
            $('.nonpronoun').fadeTo(1000, 1);
        });

    } else if ($('#qs:contains("when")').length > 0) {
        $('#searchBlockWhat').hide();
       
        when.forEach(element => {
            let pronoun = element.substr(0, element.indexOf(' '));
            let nonpronoun = element.substr(element.indexOf(pronoun) + pronoun.length, element.length);
            console.log(nonpronoun);
            element = element.replace(pronoun, `<span class="pronoun">${pronoun}</span>`);
            element = element.replace(nonpronoun, `<span class="nonpronoun">${nonpronoun}</span>`);
            $('#searchBlockWhat').append(`<span class="search">${element} </span>`);
        }
        );
        $('#searchBlockWhat').slideDown(fadeLength, function () {
            $('.nonpronoun').fadeTo(1000, 1);
        });
    } else if ($('#qs:contains("where")').length > 0) {
        $('#searchBlockWhat').hide();
        where.forEach(element => {
            let pronoun = element.substr(0, element.indexOf(' '));
            let nonpronoun = element.substr(element.indexOf(pronoun) + pronoun.length, element.length);
            console.log(nonpronoun);
            element = element.replace(pronoun, `<span class="pronoun">${pronoun}</span>`);
            element = element.replace(nonpronoun, `<span class="nonpronoun">${nonpronoun}</span>`);
            $('#searchBlockWhat').append(`<span class="search">${element} </span>`);
        }
        );
        $('#searchBlockWhat').slideDown(fadeLength, function () {
            $('.nonpronoun').fadeTo(1000, 1);
        });

    } else if ($('#qs:contains("why")').length > 0) {
        $('#searchBlockWhat').hide();
        why.forEach(element => {
            let pronoun = element.substr(0, element.indexOf(' '));
            let nonpronoun = element.substr(element.indexOf(pronoun) + pronoun.length, element.length);
            console.log(nonpronoun);
            element = element.replace(pronoun, `<span class="pronoun">${pronoun}</span>`);
            element = element.replace(nonpronoun, `<span class="nonpronoun">${nonpronoun}</span>`);
            $('#searchBlockWhat').append(`<span class="search">${element} </span>`);
        }
        );
        $('#searchBlockWhat').slideDown(fadeLength, function () {
            $('.nonpronoun').fadeTo(1000, 1);
        });
    } else if ($('#qs:contains("how")').length > 0) {
        $('#searchBlockWhat').hide();
        how.forEach(element => {
            let pronoun = element.substr(0, element.indexOf(' '));
            let nonpronoun = element.substr(element.indexOf(pronoun) + pronoun.length, element.length);
            console.log(nonpronoun);
            element = element.replace(pronoun, `<span class="pronoun">${pronoun}</span>`);
            element = element.replace(nonpronoun, `<span class="nonpronoun">${nonpronoun}</span>`);
            $('#searchBlockWhat').append(`<span class="search">${element} </span>`);
        }
        );
        $('#searchBlockWhat').slideDown(fadeLength, function(){
            $('.nonpronoun').fadeTo(1000,1);
        });
    }


    
});