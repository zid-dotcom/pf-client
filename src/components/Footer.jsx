import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <>
            <div className="container-fluid bg-success mt-3">
                <div className="row">
                    <div className="col ">
                        <h2 className='text-light'>ProjectFare 2025</h2>
                        <p style={{ textAlign: 'justify' }} className='text-light'>
                            © 2025 ProjectFare. All rights reserved.
                            Empowering developers with real-world project experience. Build, collaborate, and showcase your skills with ProjectFare — your gateway to professional growth.


                        </p>


                    </div>
                    <div className="col-2">
                        <h1 className='text-center text-light'>Links</h1>
                        <div className="d-flex justify-content-around flex-column align-items-center ">
                            <Link className='text-light' to={'/'}>Landing</Link >
                            <Link className='text-light' to={'/auth'}>Login</Link>


                        </div>
                    </div>
                    <div className="col">
                        <h2 className='text-light'>feedbacks</h2>
                        <textarea className='form-control' name="" id="" placeholder='Enter feedbacks '></textarea>
                        <button className='btn btn-success  my-3'>Send</button>

                    </div>
                </div>
                <h6 className='text-center text-light p-2'> Projectfare 2025  &copy; copyrights reserved  </h6>
            </div>


        </>
    )
}

export default Footer
