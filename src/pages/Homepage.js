import React from 'react';
import { Grid, Row, Col } from 'rsuite';
import Sidebar from '../components/Sidebar';

export default function Homepage() {
  return <Grid fluid className='h-100'>
      <Row>
          <Col sx={24} md={8}>
            <Sidebar />
          </Col>
      </Row>
  </Grid>;
}
