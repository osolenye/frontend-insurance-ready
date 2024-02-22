window.addEventListener('resize', function() {
    var w = window.innerWidth;
    var h = window.innerHeight; 
  
    var wrapper = document.getElementById("wrapper");
  
    var coef = 0;
    coef = (h/wrapper.offsetHeight + w/wrapper.offsetWidth)/2;
    console.log(coef);
  
    wrapper.style.transform = "scale(" + coef + ")";
    console.log("scale(" + coef + ")");
  });

  var w = window.innerWidth;
  var h = window.innerHeight; 

  var wrapper = document.getElementById("wrapper");

  var coef = 0;
  coef = (h/wrapper.offsetHeight + w/wrapper.offsetWidth)/2;
  console.log(coef);

  wrapper.style.transform = "scale(" + coef + ")";
  console.log("scale(" + coef + ")");