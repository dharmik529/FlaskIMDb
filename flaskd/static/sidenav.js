function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("borger").onclick = function() { closeNav();};
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("borger").onclick = function() { openNav();};
  }

  document.querySelector('.wrapper').addEventListener(
    'click', (e) => {
      e.currentTarget.classList.toggle('is-active');
    });


