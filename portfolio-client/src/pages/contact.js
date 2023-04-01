import React from 'react'
import BuyTeaSection  from "../components/BuyTeaSection"
import { useGlobalContext} from '../context/context'

const Contact = () => {
  const [formStatus, setFormStatus] = React.useState('Send')
  const {cname, setName, message, setMessage, handlers} = useGlobalContext()

  
  const nameValue = React.useRef('');
  const messageValue = React.useRef('');

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
    <>
    <div className='main-area'{...handlers}>
      <p>Contact Us</p>
        <div className='form-container'>
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input className="form-control" type="text" id="name" ref={nameValue} required onChange={() => setName(nameValue.current.value)}/>
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
              <textarea className="form-control" id="message" ref={messageValue} required onChange={() => setMessage(messageValue.current.value) }/>
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
    </>
    
  )
}

export default Contact