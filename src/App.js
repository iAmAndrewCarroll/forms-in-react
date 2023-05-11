import React from 'react';
// listGroup component is Bootstrap's version of UL
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

let data = [1,2,3,4,5,6,7,8,9,10];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      howToFilter: '',
      rawData: data,
      filteredData: data
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let fullName = `${event.target.firstname.value} ${event.target.lastname.value}`;
    console.log(fullName);

  this.setState({
    fullName: fullName,
    // howToFilter: event.target.selected.value
  });
  // setState is slow so you can't use it right away
  // console.log(this.state.howToFilter); // odd, even, all
  if (this.state.howToFilter === 'even') {
    let newData = this.state.rawData.filter((num) => num % 2 === 0);
    console.log(newData);
    this.setState({filteredData: newData})

  } else if (this.state.howToFilter === 'odd') {
    let newData = this.state.rawData.filter((num) => num % 2 === 1);
    console.log(newData);
    this.setState({filteredData: newData})
  } else {
    // "all"
    this.setState({filteredData: this.state.rawData});
  }


  // access a value from a Form.Group
  console.log(event.targe.username.value);
}

handleSelectedChange = (event) => {
  let selected = event.target.value;
  this.setState({
    howToFilter: selected 
  });
}
  
  render() {

    let numbers = this.state.filteredData.map((num, idx) => {
      return <ListGroup.Item key={idx}>{num}</ListGroup.Item>
    })

    return (
      <>
      <header>
      <h1>Forms in React</h1>
      </header>
      <main className="main">
        <Form onSubmit={this.handleSubmit}>
          {/* "for" means a for loop in JS; we have to use htmlFor to link a label and input for HTML screen readers */}
          <Form.Label htmlFor="firstname">First Name</Form.Label>
          <Form.Control id="firstname" type="text" name="firstname"/>

          <Form.Label>Last Name
            <Form.Control type="text" name="lastname"/>
          </Form.Label>

{/* controlId is how we access the values via our event handlers */}
{/* does not need an htmlFor, an id or name */}
          <Form.Group controlId="username">
            <Form.Label>username</Form.Label>
            <Form.Control type="text"/>
          </Form.Group>

          <Form.Label>Select Numbers
          <Form.Select name="selected">
            <option value="all">All</option>
            <option value="odd">Odd</option>
            <option value="even">Even</option>
          </Form.Select>
          </Form.Label>

          <Button type="submit">Submit</Button>
        </Form>
      </main>
      {/* ListGroup is our UL */}
      <ListGroup>
        {numbers}
      </ListGroup>
      </>
    )
  }
}

export default App;
