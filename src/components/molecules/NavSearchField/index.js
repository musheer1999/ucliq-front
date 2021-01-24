import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
} from 'reactstrap';
import React from 'react';
import './custom.css';
import {MdSearch} from 'react-icons/md';

export const NavSearchField = () => {
    return(
        <InputGroup className="searchInput">
            <Input placeholder="Search here..."/>
            <InputGroupAddon addonType="prepend"><Button><MdSearch /></Button></InputGroupAddon>
        </InputGroup>
    );
};

