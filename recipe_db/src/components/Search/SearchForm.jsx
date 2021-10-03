import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axiosInstance from '../../AxiosAPI';
import { DataContext } from '../Main/DataContext';
import '../../css/Search/SearchForm.css'
import { useHistory } from 'react-router';
import axios from 'axios';


function SearchForm(props) {

    // context
    const {searchResults, setSearchResults} = useContext(DataContext)

    // history
    const history = useHistory()

    // state
    const [searchState, setSearchState] = useState("")

    // handle submit
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.get(`https://recipe-db-p4.herokuapp.com/api/recipes/search/?q=${searchState.search}`)
        .then(res => setSearchResults(res.data))
        .then(setSearchState(""))
        .finally(history.push(`/results/${searchState.search}`))
        .catch(console.error)
    }
    // handle change
    const handleChange = (event) => {
        setSearchState({
            ...searchState, [event.target.id]: event.target.value
        })

    }

    return (
        <div className = "searchForm">
            <Form className = "sForm" onSubmit = { handleSubmit }>
            <Row>
                <Col xs={6}>
                <Form.Group>
                    <Form.Control
                    id = "search"
                    onChange = { handleChange }
                    placeholder = "Search Recipes"
                    value = { searchState.search }
                    />


                </Form.Group>
                </Col>
                <Col>
                <Form.Group>
                    <Button variant = 'primary' type = 'submit'>Search</Button>
                </Form.Group>
                </Col>
            </Row>
            </Form>
        </div>
    );
}

export default SearchForm;