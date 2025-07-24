import { useState, useEffect,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { addprojectApi } from '../services/allApis';
import { AddResponseContext } from '../ContextApi/context';



function Addproject() {
  const [show, setShow] = useState(false);
  const [project, setproject] = useState({
    title: "", description: "", languages: "", gitrepo: "", demo: "", image: ""
  })
  const [preview, setpreview] = useState("")


  useEffect(() => {
    if (project.image) {
      setpreview(URL.createObjectURL(project.image))
    }
    else {
      setpreview("")
    }

  }, [project.image])

  const {setAddResponse}=useContext(AddResponseContext)

  

  const handlesubmit = async () => {
    console.log(project);
    const { title, description, languages, gitrepo, demo, image } = project
    if (!title || !description || !languages || !gitrepo || !demo || !image) {
      toast.warning("enter valid inputs!!")
    }
    else {
      const response = await addprojectApi(project)
      console.log(response);
      if (response.status === 200) {
        toast.success("project Added!!")
        setproject({ title: "", description: "", languages: "", gitrepo: "", demo: "", image: "" })
        setpreview("")
        setAddResponse(response)

        handleClose()
        


      }
      else {
        toast.error("project adding failed!!")
      }


    }

  }



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button onClick={handleShow} className='btn btn-success '>Add project</button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col">
              <label htmlFor="ff">
                <input onChange={(e) => setproject({ ...project, image: e.target.files[0] })} type="file" id='ff' style={{ display: 'none' }} />
                <img src={preview ? preview : "https://img.freepik.com/premium-vector/stylish-default-user-profile-photo-avatar-vector-illustration_664995-353.jpg?ga=GA1.1.1842626415.1747459649&semt=ais_hybrid&w=740"} alt="" className='img-fluid' />
              </label>
            </div>
            <div className="col ">
              <input onChange={(e) => setproject({ ...project, title: e.target.value })} type="text" placeholder='Enter title ' className='form-control ' />
              <input onChange={(e) => setproject({ ...project, description: e.target.value })} type="text" placeholder='Enter Description' className='form-control mt-3' />
              <input onChange={(e) => setproject({ ...project, languages: e.target.value })} type="text" placeholder='Enter language used' className='form-control mt-3' />
              <input onChange={(e) => setproject({ ...project, gitrepo: e.target.value })} type="text" placeholder='Enter Git Repo URL' className='form-control mt-3' />
              <input onChange={(e) => setproject({ ...project, demo: e.target.value })} type="text" placeholder='Enter Demo URL' className='form-control mt-3' />



            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handlesubmit} variant="success">SAVE</Button>
        </Modal.Footer>
      </Modal>


    </>
  )
}

export default Addproject
