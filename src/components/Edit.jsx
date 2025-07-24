import React, { useEffect, useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import base_Url from '../services/base_url';
import { toast } from 'react-toastify';
import { editprojectApi } from '../services/allApis';
import { EditResponseContext } from '../ContextApi/context';



const Edit = ({ project }) => {
    const [preview, setpreview] = useState("")
    const [show, setShow] = useState(false);
    const [newproject, setNewproject] = useState(project)

    useEffect(() => {
        if (newproject.image.type) {
            setpreview(URL.createObjectURL(newproject.image))

        }
        else {
            setpreview("")
        }

    }, [newproject.image.type])

    const { setEditResponse } = useContext(EditResponseContext)





    const handleedit = async () => {
        console.log(newproject);
        const { title, description, languages, demo, gitrepo, image } = newproject
        if (!title || !description || !languages || !demo || !gitrepo || !image) {
            toast.warning('Enter valid inputs')
        } else {
            if (image.type) {
                const header = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Token ${sessionStorage.getItem('token')}`
                }
                const response = await editprojectApi(project._id, newproject, header)
                if (response.status == 200) {
                    toast.success("project updated")
                    setpreview("")
                    setEditResponse(response)
                    handleClose()


                }
                else {
                    toast.error("something went wrong")
                    console.log(response);


                }

            }
            else {
                const header = {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${sessionStorage.getItem('token')}`
                }
                const response = await editprojectApi(project._id, newproject, header)
                if (response.status == 200) {
                    toast.success("project updated")
                    setpreview("")
                    setEditResponse(response)
                    handleClose()
                }
                else {
                    toast.error("something went wrong")
                    console.log(response);


                }

            }
        }



    }




    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button onClick={handleShow} className="btn me-2">
                <i className="fa-solid fa-pen-to-square fa-xl text-warning"></i>
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="ff">
                                <input type="file" onChange={(e) => setNewproject({ ...newproject, image: e.target.files[0] })} id='ff' style={{ display: 'none' }} />
                                <img src={preview ? preview : `${base_Url}/projectimg/${project.image}`} alt="" className='img-fluid' />
                            </label>
                        </div>
                        <div className="col ">
                            <input onChange={(e) => setNewproject({ ...newproject, title: e.target.value })} type="text" placeholder='Enter title ' defaultValue={project?.title} className='form-control ' />
                            <input onChange={(e) => setNewproject({ ...newproject, description: e.target.value })} type="text" placeholder='Enter Description' defaultValue={project?.description} className='form-control mt-3' />
                            <input onChange={(e) => setNewproject({ ...newproject, languages: e.target.value })} type="text" placeholder='Enter language used' defaultValue={project?.languages} className='form-control mt-3' />
                            <input onChange={(e) => setNewproject({ ...newproject, gitrepo: e.target.value })} type="text" placeholder='Enter Git Repo URL' defaultValue={project?.gitrepo} className='form-control mt-3' />
                            <input onChange={(e) => setNewproject({ ...newproject, demo: e.target.value })} type="text" placeholder='Enter Demo URL' defaultValue={project?.demo} className='form-control mt-3' />



                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleedit} variant="success">UPDATE</Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default Edit






