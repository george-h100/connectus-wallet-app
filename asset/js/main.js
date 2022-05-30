(function () {
    ("use strict");
  
    let select = (el, all = false) => {
      el = el.trim();
      if (all) {
        return [...document.querySelectorAll(el)];
      } else {
        return document.querySelector(el);
      }
    };
  
    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      if (all) {
        select(el, all).forEach((e) => e.addEventListener(type, listener));
      } else {
        select(el, all).addEventListener(type, listener);
      }
    };
  
    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
      el.addEventListener("scroll", listener);
    };

    // get img
    let box = select('.blockchain-item', true);
    let boxImg = select('.blockchain .img', true);
    let boxTitle = select('.blockchain h4', true);

    boxImg.forEach((e,index)=>{
        box.forEach((a, i)=>{
            if(index === i){
                a.dataset.img = e.src
            }
        })
    })
    boxTitle.forEach((e,index)=>{
        box.forEach((a, i)=>{
            if(index === i){
                a.dataset.name = e.textContent
            }
        })
    })

   on('click', '.box', ()=>{
      //  modalbox
       let modalContainer = select('.modal', true);
       let closeBtn = select('.close', true);
      //  show modalbox
       [...modalContainer].forEach((e)=>{
         e.classList.add('show');
       });

      //  close
      [...closeBtn].forEach((e)=>{
        e.classList.remove('show');
      });

   }, true);

  
   
})();