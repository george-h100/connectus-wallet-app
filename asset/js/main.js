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
  let box = select(".blockchain-item", true);
  let boxImg = select(".blockchain .img", true);
  let boxTitle = select(".blockchain h4", true);

 
  // Open modalbox
  box.forEach((e, index) => {
    e.addEventListener("click", function () {
      openModal();

      //  set wallet technology
      let walletName = select(".modal .modal-block-deet h4");
      let walletImage = select(".modal .modal-block-deet .block-img img");

      [...boxTitle].forEach((a, ai) => {
        if(index === ai){
          walletName.textContent = a.textContent;
        }
      });

      boxImg.forEach((a,ai)=>{
        if(index === ai){
          walletImage.src = a.src;
        }
      })
    });
  });

  //  close Modalbox
  on(
    "click",
    ".modal .modal-head .close",
    function (e) {
      let modalContainer = select(".modal", true);
      //  show modalbox
      [...modalContainer].forEach((e) => {
        e.classList.remove("show");
      });
    },
    true
  );

  function openModal() {
    let modalContainer = select(".modal", true);
    //  show modalbox
    [...modalContainer].forEach((e) => {
      e.classList.add("show");
    });
  }
})();
