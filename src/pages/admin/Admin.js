import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';

const Admin = () => {
  const [requests, setRequests] = useState();

  useEffect(async () => {
    const res = await axios.get('/api/v1/admin');
    setRequests(res.data);
  }, []);

  const rows = [];
  if (requests) {
    for (const [Requests, URIs] of Object.entries(requests)) {
      for (const [URI, numberOfRequest] of Object.entries(URIs)) {
        rows.push(
          <Tr>
            <Th>{Requests}</Th>
            <Th>{URI}</Th>
            <Th>{numberOfRequest}</Th>
          </Tr>
        );
      }
    }
  }
  return (
    <div>
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
    </div>
  );
};

export default Admin;
