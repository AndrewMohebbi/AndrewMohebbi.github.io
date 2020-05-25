const load = () => {
  var posts = ["3", "2", "1"]

  get(posts).then((data) => {
    for (i = 0; i < posts.length; i++) {
      // Add a break
      document.body.append(document.createElement("br"))

      // Make the post element
      var post = document.createElement("div")
      if (data[i].length > 2000) {
        // If it's over 2000 chars, hide some content
        post.className = "post fade"
      } else {
        post.className = "post"
      }
      document.body.append(post)

      // Make the footnotes modal
      var mod = document.createElement("div")
      mod.className = "modal-content"
      // Make the contents box
      var content = document.createElement("div")
      content.className = "modal-content"
      // Make the x exit button
      var span = document.createElement("span")
      span.className = "close"
      span.innerHTML = "&times;"
      content.append(span)

      // Parse and process the text
      for (d of data[i].split(/\r?\n/)) {
        // Title of post
        if (d.slice(0, 2) === "# ") {
          var el = document.createElement("h1")
          var link = document.createElement("a")
          link.href = "#"; // This can link to the single blog post
          link.innerHTML = d.slice(2)
          el.append(link)
          post.append(el)
        }
        // Article Title Metadata
        else if (d.slice(0, 2) === "$ ") {
        }
        // Date published
        else if (d.slice(0, 2) === "& ") {
          var el = document.createElement("h6")
          el.innerHTML = d.slice(2)
          post.append(el)
        }
        // Section Header
        else if (d.slice(0, 4) === "### ") {
          var el = document.createElement("h3")
          el.innerHTML = d.slice(4)
          post.append(el)
        }
        // Subsection Header
        else if (d.slice(0, 3) === "## ") {
          var el = document.createElement("h2")
          el.innerHTML = d.slice(3)
          post.append(el)
        }
        // Media
        else if (d.slice(0, 2) === "! ") {
        }
        // Paragraph
        else {
          var el = document.createElement("p")

          var ind
          last = 0
          //Check to see if a character is {
          for (ind = 0; ind < d.length; ind++) {
            if (d[ind] === "{") {
              //Append the text that came before
              var node = document.createTextNode(d.slice(last, ind))
              el.append(node)

              // Search for the }
              var j;
              for (j = ind + 1; j < d.length; j++) {
                // When you find it, append it
                if (d[j] === "}") {
                  // Append the superscript
                  var sup = document.createElement("sup")
                  sup.className = "superscript"
                  sup.innerHTML = d[ind+1]
                  el.append(sup);

                  // Append the note to the modal content
                  var note = document.createElement("p")
                  note.innerHTML = d.slice(ind+2, j)
                  content.append(note)
                  break;
                }
              }
              // Set to the character after the }
              last = j + 1;
              ind = j
            }
          }
          // If the post doesnt end in a footnote, append text that you have not gotten to
          if (last != ind) {
            var node = document.createTextNode(d.slice(last))
            el.append(node)
          }

          // Append the full paragraph to the page
          post.append(el)
        }
      }
      // Append modal content in backwards order: content to modal, modal to page
      mod.append(content)
      document.body.append(mod)
    }

    // Add some space at the bottom
    document.body.append(document.createElement("br"))
    document.body.append(document.createElement("br"))
    document.body.append(document.createElement("br"))
  })
}

const get = async (posts) => {
  var ret = [];
  for (p of posts) {
    var url = "/posts/" + p;
    var data = await fetch(url).then((response) => response.text());
    ret.push(data);
  }
  return ret;
}

load()