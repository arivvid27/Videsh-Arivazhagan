document.addEventListener("click", (e) => {
    const { target } = e;
    if (!target.matches("nav a")) {
        return;
    }
    e.preventDefault();
    route();
});

const routes = {
    404: {
        template: "/src/html/pages/404.html",
        title: "404",
        description: "Page not found",
    },
    "/": {
        template: "/src/html/pages/home.html",
        title: "Home",
        description: "This is the home page",
    },
    "/about": {
        template: "/src/html/pages/about.html",
        title: "About Me",
        description: "This is the about page",
    },
    "/contact": {
        template: "/src/html/pages/contact.html",
        title: "Contact Me",
        description: "This is the contact page",
    },
    "/projects": {
        template: "/src/html/pages/projects.html",
        title: "Projects",
        description: "My projects",
    },
    "/organizations": {
        template: "/src/html/pages/organizations.html",
        title: "Organizations",
        description: "My organizations",
    },
};


const locationHandler = async () => {
    // get the url path, replace hash with empty string
    var location = window.location.hash.replace("#", "");
    // if the path length is 0, set it to primary page route
    if (location.length == 0) {
        location = "/";
    }
    // get the route object from the routes object
    const route = routes[location] || routes["404"];
    // get the html from the template
    const html = await fetch(route.template).then((response) => response.text());
    // set the content of the content div to the html
    document.getElementById("content").innerHTML = html;
    // set the title of the document to the title of the route
    document.title = route.title;
    // set the description of the document to the description of the route
    document
        .querySelector('meta[name="description"]')
        .setAttribute("content", route.description);
};

// create a function that watches the hash and calls the urlLocationHandler
window.addEventListener("hashchange", locationHandler);
// call the urlLocationHandler to load the page
locationHandler();