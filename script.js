/* Menu */
((d) => {
    const $btnMenu = d.querySelector(".menu-btn"),
          $menu = d.querySelector(".menu");

    $btnMenu.addEventListener("click", (e) => {
        $btnMenu.firstElementChild.classList.toggle("none");
        $btnMenu.lastElementChild.classList.toggle("none");
        $menu.classList.toggle("is-active");
    });

    d.addEventListener("click", e => {
        if (!e.target.matches(".menu a")) return false;

        $btnMenu.firstElementChild.classList.remove("none");
        $btnMenu.lastElementChild.classList.add("none");
        $menu.classList.remove("is-active");
    });
})(document);

/* ContactForm */
((d) => {
    const $form = d.querySelector(".contact-form"),
          $loader = d.querySelector(".contact-form-loader"),
          $response = d.querySelector(".contact-form-response");

    $form.addEventListener("submit", (e) => {
        e.preventDefault();
        $loader.classList.remove("none");
        fetch("https://formsubmit.co/ajax/luismiguel.2205@hotmail.com", {
            method: "POST",
            body: new FormData(e.target)
        })
            .then( (resp) => (resp.ok ? resp.json() : Promise.reject(resp)) )
            .then( json => {
                console.log(json);
                location.hash = "#thanks";
                $form.reset();
            })
            .catch( (err) => {
                console.log(err);
                let message = err.statusText || "An error occurred while sending, please try again.";
                $response.querySelector("h3").innerHTML = `Error ${ err.status }: ${ message }`;
            }).finally( () => {
                $loader.classList.add("none");
                setTimeout( () => {
                    location.hash = "#close";
                }, 3000);
            });
    });

})(document);