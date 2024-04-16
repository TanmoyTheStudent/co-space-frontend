import {Form,FormGroup,Label,Input,FormText,Button} from 'reactstrap'


function App() {
  return (
    <div className='row'>
      <div className='col-md-2'>

      </div>
      <div className='col-md-8'>
        <Form>
        <FormGroup>
          <Label for="exampleEmail">
            Email
          </Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="with a placeholder"
            type="email"
            
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">
            Password
          </Label>
          <Input
            id="examplePassword"
            name="password"
            placeholder="password placeholder"
            type="password"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">
            Select
          </Label>
          <Input
            id="exampleSelect"
            name="select"
            type="select"
          >
            <option>
              1
            </option>
            <option>
              2
            </option>
            <option>
              3
            </option>
            <option>
              4
            </option>
            <option>
              5
            </option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelectMulti">
            Select Multiple
          </Label>
          <Input
            id="exampleSelectMulti"
            multiple
            name="selectMulti"
            type="select"
          >
            <option>
              1
            </option>
            <option>
              2
            </option>
            <option>
              3
            </option>
            <option>
              4
            </option>
            <option>
              5
            </option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">
            Text Area
          </Label>
          <Input
            id="exampleText"
            name="text"
            type="textarea"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">
            File
          </Label>
          <Input
            id="exampleFile"
            name="file"
            type="file"
          />
          <FormText color='blue'>
            This is some placeholder block-level help text for the above input. It‘s a bit lighter and easily wraps to a new line.
          </FormText>
        </FormGroup>
        <FormGroup tag="fieldset">
          <legend>
            Radio Buttons
          </legend>
          <FormGroup check>
            <Input
              name="radio1"
              type="radio"
            />
            {' '}
            <Label check>
              Option one is this and that—be sure to include why it‘s great
            </Label>
          </FormGroup>
          <FormGroup check>
            <Input
              name="radio1"
              type="radio"
            />
            {' '}
            <Label check>
              Option two can be something else and selecting it will deselect option one
            </Label>
          </FormGroup>
          <FormGroup
            check
            disabled
          >
            <Input
              disabled
              name="radio1"
              type="radio"
            />
            {' '}
            <Label check>
              Option three is disabled
            </Label>
          </FormGroup>
        </FormGroup>
        <FormGroup check>
          <Input type="checkbox" />
          {' '}
          <Label check>
            Check me out
          </Label>
        </FormGroup>
        <Button>
          Submit
        </Button>
      </Form>
      </div>
    </div>
  );
}

export default App;


// import React, { useState } from 'react';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// function App() {
//   const [modal, setModal] = useState(false);

//   const toggle = () => setModal(!modal);

//   return (
//     <div>
//       <Button color="danger" onClick={toggle}>
//         Click Me
//       </Button>
//       <Modal isOpen={modal} toggle={toggle} >
//         <ModalHeader toggle={toggle}>Modal title</ModalHeader>
//         <ModalBody>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//           aliquip ex ea commodo consequat. Duis aute irure dolor in
//           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//           culpa qui officia deserunt mollit anim id est laborum.
//         </ModalBody>
//         <ModalFooter>
//           <Button color="primary" onClick={toggle}>
//             Do Something
//           </Button>{' '}
//           <Button color="secondary" onClick={toggle}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// }

// export default App;