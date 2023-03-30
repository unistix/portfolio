import React from 'react'
import BuyTeaSection  from "../components/BuyTeaSection"

const Contact = () => {
  const [formStatus, setFormStatus] = React.useState('Send')

  async function handleSubmit(e){
    e.preventDefault(); //stop page reload on submit
    
    console.log("sumbit button pressed")
    setFormStatus('Submitting')
    /*make submitting button unclickable */

    const { name, email, message } = e.target.elements
    let formData = {
      name: name.value,
      email: email.value,
      message: message.value,
    }
    //console.log(formData)

    const response = await fetch("http://127.0.0.1:8080/contact", {
      method: "POST", 
      headers: {
      "Content-Type": "application/json"
      },

      body: JSON.stringify(formData)


    })

    const data = await response.json();
    //console.log(data.success)
    if(data.success){
      setFormStatus('Sent')
      /*make sent button unclickable */
      /*Clear form and reset form after 2 secs */

    }else{
      setFormStatus('Error')

    }
    

    

    }
    //console.log("handling submit")
    //console.log([input])

    /*let chatLogNew = [...chatLog, {user: "me", message: input}]
    setInput("");
    
    setChatLog(chatLogNew)
   
    const messages = chatLogNew.map((message) => message.message).join("\n")
   

  
    const response = await fetch("http://ec2-3-101-104-157.us-west-1.compute.amazonaws.com:8080/", {

    method: "POST", 
    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      message: messages
    })


    })

    

    const data = await response.json();
    console.log(data.message)
    setChatLog([...chatLogNew, {user: "gpt", message: `${data.message}`}])
    console.log(chatLog)*/
    
    


  
  return (
    <div>
      <p>Contact Us</p>
        <div className='form-container'>
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input className="form-control" type="text" id="name" required />
            </div>
            <div className="form-input">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input className="form-control" type="email" id="email" required />
            </div>
            <div className="form-input">
              <label className="form-label" htmlFor="message">
                Message
              </label>
              <textarea className="form-control" id="message" required />
            </div>
            <button className="btn" type="submit">
              {formStatus}
            </button>
          </form>
        </div>
        <div className='buy-tea-container'>
          <BuyTeaSection/>
        </div>
    </div>
    
  )
}

export default Contact