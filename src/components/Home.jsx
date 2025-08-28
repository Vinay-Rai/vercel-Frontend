import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import remarkGfm from 'remark-gfm';
import axios from "axios"




import { useAuth0 } from "@auth0/auth0-react";


function App() {

  const { loginWithRedirect, user, isAuthenticated, logout, isLoading } = useAuth0();
  // console.log("current user", user)

  const [code, setCode] = useState(`
    function sum(){
    return 1+1}`)

  const [review, setReview] = useState(``)
  

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    const response = await axios.post(`https://vercel-backend-gamma-swart.vercel.app/ai/get-review`, { code })
    setReview(response.data)
  }

  // const data = {
  //   userid:user.sub,
  //   code: code,
  //   review: review

  // }

  // async function saveCode() {
  //   const response = await axios.post(`http://localhost:3000/history/save-history`, { data })
  //   console.log(response.data)
  // }

  async function saveCode() {
  const response = await fetch(`https://vercel-backend-gamma-swart.vercel.app/history/save-history`, {
  method: 'POST', // Specify the HTTP method
  headers: {
    'Content-Type': 'application/json', // Inform the server about the data format
  },
  body: JSON.stringify({
    userId:user.sub,
    code: code,
    review: review
  }), // Convert the data to a JSON string
})
    let data = await response.json()
    alert(data.message)
    // console.log( data)
    
  }


  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>

          {
            isAuthenticated&&<div
            onClick={saveCode}
            className="save">Save</div>
          }
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>

        <div className="right">
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}

          >{review}</Markdown>
        </div>
      </main>
    </>
  )
}




export default App
