import * as React from 'react';
import { Collapse, Container, List, Skeleton, Stack, Typography } from '@mui/material';
import Form from './Form';
import { TransitionGroup } from 'react-transition-group';

// const field1 = {name: 'Field 1', type: 'input'};
// const field2 = {name: 'Field 2', type: 'checkboxes', values: ['a', 'b', 'c']};
// const field3 = {name: 'Field 3', type: 'radios', values: ['pp1', 'pp2'], row: true};
// const field4 = {name: 'Field 4', type: 'rating'};
// const field5 = {name: 'Field 5', type: 'select', values: ['bad', 'bed', 'bid', 'bod', 'bud']};
// const field6 = {name: 'Field 6', type: 'slider', min: 50000, max: 200000, step: 1000, range: true};
// const paper1 = {color: 'purple', avatar: 'a', title: 'Form 1', subheader: 'May 16, 2023', fields: [field1, field2, field3, field4, field6, field5], reward: ['employee', {}] };
// const paper2 = {color: 'blue', avatar: 'y', frontend: true, subheader: 'Frontend Developer', title: 'Employee 899 Application',
                // fields: [{name: 'Consent?', type: 'radios2', values: ['y', 'n']}, {name: 'confidence', type: 'rating'}]};

export default function Paperwork({ papers, setPapers, employees, setEmployees, setRewardForm, totalPapers, setTotalPapers, brightnessMode }) {

  const handleRemove = (papertitle) => {
    console.log(`Form "${papertitle}" removed!`);
    setPapers(papers.filter((p) => p.title !== papertitle));
  }

  // React.useEffect(() => {
  //   console.log('papers', papers);
  // }, [papers]);

  return (
  <Container maxWidth='sm'>
    { papers.length === 0 ? 
    <>
      <Typography sx={{my: 2}} variant='h3'>No papers available</Typography>
      <Stack direction='row' spacing={3}>
        <Skeleton animation='wave' variant='circular' width={50} height={50} />
        <Stack>
          <Skeleton animation='wave' sx={{mt: 1}} variant='text' width={340} />
          <Skeleton animation='wave' variant='text' width={250} />
        </Stack>
      </Stack>
      
      <Stack direction='row'>
        <Stack>
          <Skeleton animation='wave' variant='rounded' sx={{my: 1}} width={150} height={100} />
          <Skeleton animation='wave' variant='rounded' width={150} height={100} />
        </Stack>
        <Skeleton animation='wave' variant='rounded' sx={{ml: 2, mt: 1}} width={250} height={210} />
      </Stack>

      <Skeleton animation='wave' sx={{mt: 2, ml: 5}} variant='text' width={375} />
      <Skeleton animation='wave' variant='text' width={415} />
      <Skeleton animation='wave' variant='text' width={415} />
      <Stack direction='row'>
        <Skeleton animation='wave' sx={{my: 1, mr: 4}} variant='circular' width={50} height={50} />
        <Stack>
          <Skeleton animation='wave' variant='text' width={333} />
          <Skeleton animation='wave' variant='text' width={333} />
          <Skeleton animation='wave' variant='text' width={333} />
          <Skeleton animation='wave' variant='text' width={333} />
        </Stack>
      </Stack>
      <Skeleton animation='wave' variant='text' width={400} />
      
      <Skeleton animation='wave' sx={{mt: 2, ml: 5}} variant='text' width={375} />
      <Skeleton animation='wave' variant='text' width={415} />
      <Skeleton animation='wave' variant='text' width={415} />
      <Skeleton animation='wave' variant='text' width={300} />

    </>
    :
    <List>
      <TransitionGroup>
        {papers.map((paper) => (
          <Collapse key={paper.title}>
            <Form
              form={paper}
              handleRemove={() => handleRemove(paper.title)}
              setRewardForm={setRewardForm}
              totalPapers={totalPapers}
              setTotalPapers={setTotalPapers}
              brightnessMode={brightnessMode}
            />
          </Collapse>
        ))}
      </TransitionGroup>
    </List>
    }
  </Container>
  )
}