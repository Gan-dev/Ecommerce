import { useState } from "react"
import { Form } from "react-bootstrap"

const SearchBar = ({ filterData }) => {
    const [textQuery, setTextQuery] = useState('')

    const handleSearch = e => {
        const inputValue = e.target.value
        setTextQuery(inputValue)
        filterData(inputValue)
    }

    return (
        <>

            <Form className="search-form">
                <Form.Group>
                    <Form.Control type="search" placeholder="Search" value={textQuery} onChange={handleSearch} />
                </Form.Group>
            </Form>

        </>
    )
}

export default SearchBar