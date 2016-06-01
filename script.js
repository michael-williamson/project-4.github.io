var $overlay = $('<div id="overlay"></div>');
var $imageGalleryDiv = $('<div id=imgGalleryDiv></div>')
var $image = $("<img>");
var $captionDiv = $("<div id='captionTextDiv'></div>")
var $caption = $("<p id='captionText'></p>");
var $btnPrev = $('<button id="btnPrev"><</button>');
var $btnNext = $('<button id="btnNext">></button>');
var $btnExit = $('<button id ="btnExit">X</button>');
var $exitText = $('<p class="directionText escTxt">Exit [Esc]</p>');


$imageGalleryDiv.append($image);
$captionDiv.append($caption);
$imageGalleryDiv.append($captionDiv);
$imageGalleryDiv.append($btnPrev);
$imageGalleryDiv.append($btnNext);
$imageGalleryDiv.append($btnExit);
$imageGalleryDiv.append($exitText);
$overlay.append($imageGalleryDiv);


$("body").append($overlay);

var $currentImage; 

/*********************************************************
This function is the pathway into the javascript code for the
image gallery.  When on the page an image is clicked its <a>
element channels through its href.  To prevent the default we 
attach the preventDefault() function to click event so the 
javascript presentation can do its work.  the $currentImage
stores the clicked list item and the currentImageText varible 
stores the text of the alt value of the <img> element. Then the 
other functions are called to display the correct image and text
to the screen.  
*************************************************************/  

  $("#image-gallery li").click(function(event){
  
    event.preventDefault();
    
    $currentImage = $(this);
    
    var $currentImageText = $(this).children("img").attr("alt");
    $caption.text($currentImageText);
    
    loadImage(); 
    
    $overlay.show();
    
  });
  
/*********************************************************
When this function is called the $currentImage variable will 
contain the values in order to display the current text and
image that corresponds to all other functions and actions.
*************************************************************/  

function loadImage () {

  $image.attr("src", $currentImage.children("a").attr("href"));
  
  var $newImageText = $currentImage.children("a").children("img").attr("alt");
  $caption.text($newImageText);
}

/*********************************************************
These two functions cycle through the li items giving the 
$currentImage variable those values.  Then the cycling functions
are activated only if a condition is met in their parameters.
Whatever happens up to that point the loadimage() function 
will take the $currrentImage and plug its <a> href into the src
value for the <img> element appended in javascript code.
*************************************************************/


function nextImage() {

  $currentImage = $currentImage.next(); 
  
  imageRecycleForward();
  
  loadImage(); 
}

function prevImage() {
    
    $currentImage = $currentImage.prev(); 
    
    imageRecycleBackward();
  
    loadImage(); 
}

/*********************************************************
These two functions allow the image gallery to loop through
the images without any dead-ends.  Once the prev() or 
next() function traverses to the end of the line for the 
elements the length returns a value of 0,  and the 
conditional clause activates giving the $currentImage varible 
either the first sibling or last sibling depending on which end 
was reached.  The gallery repeats backward or forward without
interruption.  
*************************************************************/

function imageRecycleForward () {
   
  if ($currentImage.length === 0) {
      $currentImage = $("li").first();
    }else{}
}

function imageRecycleBackward () {

    if ($currentImage.length === 0) {
      $currentImage = $("li").last();
    }else{}
}

/*********************************************************
These functions allow the prev and next arrows to be clicked
and activate the nextImage() and prevImage() functions for 
the traversal of DOM and image cycling.  
*************************************************************/


  $("#btnNext").click(function(){
  
        nextImage(); 
   });
  
  
  
  $("#btnPrev").click(function(){
  
        prevImage();
    });



$overlay.click(function(event){

    $target = $(event.target);
   
    if ( $target.is("#btnExit")) { $overlay.slideUp();}
  
    else {};
});


/*********************************************************
These functions allow the prev and next arrows to be clicked
and activate the nextImage() and prevImage() functions for 
the traversal of DOM and image cycling.  
*************************************************************/

function animate() {
  
  if ( $(window).width() >= 1024) {     
  $("#captionTextDiv").animate({width:'620'}).animate({width:'700'})
}
 
  }



 $(window).resize(function(){
	if ($(window).width() >= 1024){	
		 $("#captionTextDiv").width("700"); 
	}	
   else if  ($(window).width() >= 480){	
		 $("#captionTextDiv").width("80%"); 
	}	
  else if  ($(window).width() >= 0){	
		 $("#captionTextDiv").width("80%"); 
	}	
   
});


$("#btnPrev").click(function(event){
   
   animate(); 
});

$("#btnNext").click(function(event){
    
  animate(); 

});

/*********************************************************
These functions allow the prev and next arrows to be clicked
and activate the nextImage() and prevImage() functions for 
the traversal of DOM and image cycling.  
*************************************************************/

function bootArrowKeys() {
$(document).keydown(function(event) {
  
		if (event.which === 37) {
			prevImage(); 
      
      animate(); 
	
    } else if (event.which === 39) {
			nextImage(); 
     
      animate(); 
    }  
      else if (event.which === 27) { $overlay.slideUp("slow") ;
             }
	});
}

bootArrowKeys(); 

animate(); 
  
/*********************************************************
Image search function that takes the text entered in search 
field and matches it with the image in the image gallery
*************************************************************/

  
(function() {                             
  var $imgs = $('#image-gallery img');          
  var $search = $('#searchBox');      
  var cache = [];                         

  $imgs.each(function() {                
    cache.push({                         
      element: $(this),                      
      text: this.alt.trim().toLowerCase() 
    });
  });

  function filter() {                    
    var query = this.value.trim().toLowerCase();  
    cache.forEach(function(img) {         
      var index = 0;                      

      if (query) {                        
        index = img.text.indexOf(query);  
      }
      
    

      $(img.element).parent().parent().toggle(index != -1);
    });
  }

  if ('oninput' in $search[0]) {          
    $search.on('input', filter);          
  } else {                              
    $search.on('keyup', filter);          
  }              

}());




   
  









