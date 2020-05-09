import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CustomInput } from 'reactstrap';


export function ProductImageLoader({ id }) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(false);
    const imageUrldata = "api/file/" + id + "?t=" + new Date().getTime();
    const [imageUrl, setImageUrl] = useState(imageUrldata);
    const [fileMissed, setFileMissed] = useState(true);

    const userUploadedFile = (data) => {
        let input = document.querySelector('input[type="file"]')
        if (input.files.length === 0) {
            setFileMissed(true);
        }
        else {
            setFileMissed(false);
        }
    }

    const sendFile = () => {
        let input = document.querySelector('input[type="file"]')
        if (input.files.length === 0) {
            return;
        }

        let data = new FormData()
        data.append('file', input.files[0])
        console.log(input);
        //data.append('user', 'hubot')

        fetch(`api/file/create/${id}`, { // Your POST endpoint
            method: 'POST',
            body: data//input.files[0] // This is your file object
        }).then(
            response => { response.text() } // if the response is a JSON object
        ).then(
            (success) => {
                console.log("Good");
                let url = "api/file/" + id + "?t=" + new Date().getTime();
                setImageUrl(url)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        );
    }

    return (
        <>
            <Button onClick={() => setModal(true)} color="info">Image</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Image </ModalHeader>
                <ModalBody>
                    {
                        modal &&
                        <img src={imageUrl} alt="Italian Trulli" width="400" height="300" />
                    }

                    <h4>Upload file</h4>
                    <input id={"image" + id} onChange={(e) => userUploadedFile(e)} type="file"></input>
                    <br/>
                    <Button disabled={fileMissed} color="primary" onClick={sendFile}>Update image</Button>
                </ModalBody>
                <ModalFooter>
                    <Button  color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </>
    )


};