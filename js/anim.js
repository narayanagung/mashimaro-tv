const homeObserver=new IntersectionObserver((e=>{e.forEach((e=>{e.isIntersecting&&e.target.classList.add("show")}))})),hiddenHomeElement=document.querySelectorAll(".hidden");hiddenHomeElement.forEach((e=>homeObserver.observe(e)));