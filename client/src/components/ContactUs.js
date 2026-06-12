import React from 'react'

function ContactUs() {
  return (
    <>
    <h1 className='my-4'>Contact Us</h1>
    <form action="https://api.web3forms.com/submit" method="POST">
    <input type="hidden" name="access_key" value="f0fa4742-debd-4576-9f2c-250a4a4d8407"/>
    <div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
  <input type="email" className="form-control" name="email" id="exampleFormControlInput1" placeholder="name@example.com"/>
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlTextarea1" className="form-label">Write Your Problem</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" name='message' rows="3"></textarea>
</div>
 <button type='submit' className='btn btn-success'>Submit</button>
    </form>
    </>
  )
}

export default ContactUs
