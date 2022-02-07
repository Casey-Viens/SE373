const mainPage = (req, res) => {
    res.render('home', {
        post: [{
            author: "Casey Viens",
            image: "https://picsum.photos/500/500",
            comments: ["comment 1", "comment 2", "comment 3"],
        },
        {
            author: "Jordan D",
            image: "https://picsum.photos/500/500?2",
            comments: [],
        },
        {
            author: "Jon D",
            image: "https://picsum.photos/500/500?3",
            comments: ["Yo, this is awesome", "Sint dolor aliquip deserunt ipsum sunt elit et. Est commodo eu dolore adipisicing mollit Lorem. Occaecat ullamco culpa officia excepteur occaecat nostrud amet. Est ex pariatur consectetur laboris. Labore irure velit culpa enim. Incididunt laboris nostrud duis proident magna id nisi irure.", "this is the best"],
        }
        ]

    })
}

const pageTwo = (req, res) => {
    res.render('index', {
        title: "Page Two",
        name: "Bart Simpson",
        phoneNumber: "4014677744",
        address: "1 New England Tech Blvd",
        email: "bsimpson@neit.edu",
        occupation: "esteemed professor of skateboarding"
    })
}

const pageThree = (req, res) => {
    res.render('index', { title: "Page Three" })
}

module.exports = {
    mainPage,
    pageTwo,
    pageThree
}