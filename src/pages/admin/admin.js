import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  Container,
} from '@chakra-ui/react';

const Admin = () => {
  const [requests, setRequests] = useState();

  useEffect(() => {
    axios.get('/api/v1/admin').then((res) => {
      setRequests(res.data);
    });
  }, []);

  const rows = [];
  if (requests) {
    console.log(requests);
    for (const [Requests, URIs] of Object.entries(requests)) {
      for (const [URI, numberOfRequest] of Object.entries(URIs)) {
        rows.push(
          <Tr key={Requests + URI}>
            <Th>{Requests}</Th>
            <Th>{URI}</Th>
            <Th>{numberOfRequest}</Th>
          </Tr>
        );
      }
    }
  }
  return (
    <Container>
      <Table variant='simple'>
        <TableCaption>Admin Page requests</TableCaption>
        <Thead>
          <Tr>
            <Th>Method</Th>
            <Th>URI</Th>
            <Th># of requests</Th>
          </Tr>
        </Thead>
        <Tbody>{rows}</Tbody>
      </Table>
    </Container>
  );
};

export default Admin;
