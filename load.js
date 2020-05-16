
const load = () => {
    var posts = ["3", "2", "1"]

    get(posts)
    .then((data) => {
        for (i = 0; i < posts.length; i++){

            var post = document.createElement('div')
            post.className = "post"
            document.body.append(post)

            for (d of data[i].split(/\r?\n/))   { 
                // Title of post
                if (d.slice(0, 10) === "##########"){
                    var el = document.createElement('h2')
                    el.innerHTML = d.slice(11)
                    post.append(el)
                }
                // Date published
                else if (d.slice(0, 9) === "#########"){
                    var el = document.createElement('h6')
                    el.innerHTML = d.slice(10)
                    post.append(el)
                }
                // Header 3
                else if (d.slice(0, 2) === "###"){
                    var el = document.createElement('h3')
                    el.innerHTML = d.slice(3)
                    post.append(el)
                }
                // Header 4
                else if (d.slice(0, 3) === "####"){
                    var el = document.createElement('h4')
                    el.innerHTML = d.slice(4)
                    post.append(el)
                }
                // Paragraph
                else{
                    var el = document.createElement('p')
                    el.innerHTML = d
                    post.append(el)
                }
            }

            var br = document.createElement('br')
            document.body.append(br)
        }
    })
}

const get = async (posts) => {
    var ret = []
    for (p of posts){
        var url = '/posts/' + p
        var data = await fetch(url).then(response => response.text())
        ret.push(data)
    }
    return ret
}

load()