import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Container, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Tooltip, Typography, paperClasses } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PeopleIcon from '@mui/icons-material/People';
import CodeIcon from '@mui/icons-material/Code';

const colorConvert = {
  blue: 'primary',
  purple: 'secondary',
  green: 'success',
  orange: 'warning',
  red: 'error',
  gray: 'default'
}

// Each employee needs:
// level = 2 or 3, number, cost, profit
const worker1 = {number: 1, cost: 10, profit: 5, color: 'blue', frontend: true};
const worker2 = {number: 2, cost: 10, profit: 5, color: 'purple', level: 2};
const worker3 = {number: 3, cost: 13, profit: 23, color: 'green', frontend: true};
const worker4 = {name: 'I am special', cost: 14, profit: 24, color: 'orange', level: 2, frontend: true};

export default function Employees({employees, setEmployees, numEmployees, maxEmployees,
  numFrontend, setNumFrontend, numBackend, setNumBackend, numFrontendLOC, setNumFrontendLOC, numBackendLOC, setNumBackendLOC, totalCost, setTotalCost,
  handleAddApplication, handleCloseAddedForm,
  papers, totalProjects, setFireMe, numHireForms,
}) {

  const [workers1, setWorkers1] = React.useState(null);
  const [workers2, setWorkers2] = React.useState(null);
  const [workers3, setWorkers3] = React.useState(null);
  const [numEmployeeForms, setNumEmployeeForms] = React.useState(0);

  React.useEffect(() => {
    let cnt = 0;
    papers.forEach((p) => {
      if (p.worker) cnt += 1;
    });
    if (cnt !== numEmployeeForms) setNumEmployeeForms(cnt);
  }, [papers, numEmployeeForms]);

  React.useEffect(() => {
    if(!workers1) {
      setEmployees(employees.filter((e) => !e.fired));
      let p = [[], [], []];
      let idx = 0;
      let numF = 0, numB = 0, fLOC = 0, bLOC = 0, tot = 0;
      employees.forEach((e) => {
        if (e.fired) return;
        tot += e.cost;
        if(e.frontend){
          numF += 1;
          fLOC += e.profit;
        }
        else{
          numB += 1;
          bLOC += e.profit;
        }
        p[idx % 3].push(e);
        idx++;
      });
      setNumFrontend(numF);
      setNumBackend(numB);
      setNumFrontendLOC(fLOC);
      setNumBackendLOC(bLOC);
      setTotalCost(tot);
      setWorkers1(p[0]);
      setWorkers2(p[1]);
      setWorkers3(p[2]);
    }
  }, [employees, setEmployees, workers1, workers2, workers3, numFrontend, setNumFrontend, numBackend, setNumBackend, numFrontendLOC, setNumFrontendLOC, numBackendLOC, setNumBackendLOC, totalCost, setTotalCost]);

  const terminate = (employee) => {
    if(employee.fired) return;
    employee.fired = true;
    setEmployees(employees);
    setFireMe(employee);
  }
  
  return (
    <Grid container sx={{
      mt: 4,
      '--Grid-borderWidth': '1px',
      // borderTop: 'var(--Grid-borderWidth) solid',
      borderLeft: 'var(--Grid-borderWidth) solid',
      borderColor: 'divider',
      '& > div': {
        borderRight: 'var(--Grid-borderWidth) solid',
        // borderBottom: 'var(--Grid-borderWidth) solid',
        borderColor: 'divider',
      },
    }}>
      <Grid xs={3}>
        <Container disableGutters>
        <List>
          <Tooltip title={`You have ${numEmployees} out of a maximum of ${maxEmployees} employees`}>
          <ListItemButton>
            <Stack>
            <Typography variant='h4'><strong>Workforce</strong></Typography>
              <Typography fontFamily='monospace'>{numEmployees}/{maxEmployees} employees</Typography>
            </Stack>
          </ListItemButton>
          </Tooltip>
          <ListItemButton>
            <Tooltip title='People'>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
            </Tooltip>
            <Stack>
            <ListItemText>Frontend developers: <strong>{numFrontend}</strong></ListItemText>
            <ListItemText>Backend developers: <strong>{numBackend}</strong></ListItemText>
            </Stack>
          </ListItemButton>
          <ListItemButton>
            <Tooltip title='Code'>
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
            </Tooltip>
            <Tooltip title='LOC stands for Lines Of Code'>
            <Stack>
            <ListItemText>Frontend LOC per hour: <strong>{numFrontendLOC}</strong></ListItemText>
            <ListItemText>Backend LOC per hour: <strong>{numBackendLOC}</strong></ListItemText>
            </Stack>
            </Tooltip>
          </ListItemButton>
          <ListItem>
            <Stack>
            {numEmployeeForms + numEmployees + numHireForms >= maxEmployees ?
            <Typography variant='body2'>You have reached the maximum number of employees!</Typography> :
            <Typography variant='body2'>This adds a form to hire a new employee in the 'Paperwork' section.</Typography>}
            <Button disabled={numEmployeeForms + numEmployees + numHireForms >= maxEmployees} variant='contained' color='success' onClick={handleAddApplication}>Add Employee Application</Button>
            </Stack>
          </ListItem>
        </List>
        </Container>
      </Grid>
      <Grid xs={3}>
        <Container disableGutters>
          <List sx={{maxHeight: '90vh', overflow: 'auto'}}>
          {(workers1 || []).map((E, idx) => (
            <ListItem key={`1 ${idx}`} disablePadding dense secondaryAction={
              <Tooltip title='Fire'><span>
                <IconButton disabled={maxEmployees < 5} onClick={() => terminate(E)} edge='end'>
                  <PersonOffIcon fontSize='small' />
                </IconButton>
                </span></Tooltip>
            }>
              <ListItemButton sx={{color: E.fired ? 'red' : ''}}>
                <Stack>
                <ListItemIcon>
                  {
                  E.level === 2 && E.frontend ? <Tooltip title='Exceptional Frontend Developer'><SupervisedUserCircleIcon color={E.color ? colorConvert[E.color] : ''} /></Tooltip> :
                  E.frontend ?    <Tooltip title='Frontend Developer'><AccountCircleIcon color={E.color ? colorConvert[E.color] : ''} /></Tooltip> :
                  E.level === 2 ? <Tooltip title='Exceptional Backend Developer'><ContactEmergencyIcon color={E.color ? colorConvert[E.color] : ''} /></Tooltip> :
                                  <Tooltip title='Backend Developer'><AccountBoxIcon color={E.color ? colorConvert[E.color] : ''} /></Tooltip>
                  }
                </ListItemIcon>
                <Typography sx={{ml: '-1.8ch', color: '#777'}} variant='caption'>{E.frontend ? 'Frontend' : 'Backend'}</Typography>
                </Stack>
                <Stack>
                <Typography variant='body1'>{E.name ? <strong>{E.name}</strong> : <strong>Employee {E.number || '1'}</strong>}</Typography>
                <Typography variant='body2' sx={{color: E.fired ? 'red' : '#666'}}>{E.fired ? 'This employee was fired.' : <span>Pay per hour: <strong>{E.cost}</strong></span>}</Typography>
                <Typography variant='body2' sx={{color: '#666'}}>{E.fired ? '' : <span>Lines of code per hour: <strong>{E.profit}</strong></span>}</Typography>
                </Stack>
              </ListItemButton>
            </ListItem>
          ))}
          </List>
        </Container>
      </Grid>
      <Grid xs={3}>
        <Container disableGutters>
          <List sx={{maxHeight: '90vh', overflow: 'auto'}}>
          {(workers2 || []).map((E, idx) => (
            <ListItem key={`2 ${idx}`} disablePadding dense secondaryAction={
              <Tooltip title='Fire'><span>
                <IconButton disabled={maxEmployees < 5} onClick={() => terminate(E)} edge='end'>
                  <PersonOffIcon fontSize='small' />
                </IconButton>
              </span></Tooltip>
            }>
              <ListItemButton sx={{color: E.fired ? 'red' : ''}}>
                <Stack>
                <ListItemIcon>
                  {
                  E.level === 2 && E.frontend ? <Tooltip title='Exceptional Frontend Developer'><SupervisedUserCircleIcon color={E.color ? colorConvert[E.color] : ''} /></Tooltip> :
                  E.frontend ?    <Tooltip title='Frontend Developer'><AccountCircleIcon color={E.color ? colorConvert[E.color] : ''} /></Tooltip> :
                  E.level === 2 ? <Tooltip title='Exceptional Backend Developer'><ContactEmergencyIcon color={E.color ? colorConvert[E.color] : ''} /></Tooltip> :
                                  <Tooltip title='Backend Developer'><AccountBoxIcon color={E.color ? colorConvert[E.color] : ''} /></Tooltip>
                  }
                </ListItemIcon>
                <Typography sx={{ml: '-1.8ch', color: '#777'}} variant='caption'>{E.frontend ? 'Frontend' : 'Backend'}</Typography>
                </Stack>
                <Stack>
                <Typography variant='body1'>{E.name ? <strong>{E.name}</strong> : <strong>Employee {E.number || '1'}</strong>}</Typography>
                <Typography variant='body2' sx={{color: E.fired ? 'red' : '#666'}}>{E.fired ? 'This employee was fired.' : <span>Pay per hour: <strong>{E.cost}</strong></span>}</Typography>
                <Typography variant='body2' sx={{color: '#666'}}>{E.fired ? '' : <span>Lines of code per hour: <strong>{E.profit}</strong></span>}</Typography>
                </Stack>
              </ListItemButton>
            </ListItem>
          ))}
          </List>
        </Container>
      </Grid>
      <Grid xs={3}>
        <Container disableGutters>
          <List sx={{maxHeight: '90vh', overflow: 'auto'}}>
          {(workers3 || []).map((E, idx) => (
            <ListItem key={`3 ${idx}`} disablePadding dense secondaryAction={
              <Tooltip title='Fire'><span>
                <IconButton disabled={maxEmployees < 5} onClick={() => terminate(E)} edge='end'>
                  <PersonOffIcon fontSize='small' />
                </IconButton>
                </span></Tooltip>
            }>
              <ListItemButton sx={{color: E.fired ? 'red' : ''}}>
                <Stack>
                <ListItemIcon>
                  {
                  E.level === 2 && E.frontend ? <Tooltip title='Exceptional Frontend Developer'><SupervisedUserCircleIcon color={E.color ? colorConvert[E.color] : ''} /></Tooltip> :
                  E.frontend ?    <Tooltip title='Frontend Developer'><AccountCircleIcon color={E.color ? colorConvert[E.color] : ''} /></Tooltip> :
                  E.level === 2 ? <Tooltip title='Exceptional Backend Developer'><ContactEmergencyIcon color={E.color ? colorConvert[E.color] : ''} /></Tooltip> :
                                  <Tooltip title='Backend Developer'><AccountBoxIcon color={E.color ? colorConvert[E.color] : ''} /></Tooltip>
                  }
                </ListItemIcon>
                <Typography sx={{ml: '-1.8ch', color: '#777'}} variant='caption'>{E.frontend ? 'Frontend' : 'Backend'}</Typography>
                </Stack>
                <Stack>
                <Typography variant='body1'>{E.name ? <strong>{E.name}</strong> : <strong>Employee {E.number || '1'}</strong>}</Typography>
                <Typography variant='body2' sx={{color: E.fired ? 'red' : '#666'}}>{E.fired ? 'This employee was fired.' : <span>Pay per hour: <strong>{E.cost}</strong></span>}</Typography>
                <Typography variant='body2' sx={{color: '#666'}}>{E.fired ? '' : <span>Lines of code per hour: <strong>{E.profit}</strong></span>}</Typography>
                </Stack>
              </ListItemButton>
            </ListItem>
          ))}
          </List>
        </Container>
      </Grid>
    </Grid>
  );
}