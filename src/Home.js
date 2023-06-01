import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Card, CardHeader, Collapse, Container, Divider, IconButton, LinearProgress, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Stack, Tooltip, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import AdbIcon from '@mui/icons-material/Adb';
import { grey } from '@mui/material/colors';
import { TransitionGroup } from 'react-transition-group';
import ProjectIcon from './ProjectIcon';

export default function Home({ money, day, hour, numEmployees, maxEmployees, totalLOC, totalProjects, setTotalProjects, totalPapers, currentProject, projects, setProjects, brightnessMode }) {
  const frontendProgress = currentProject ? currentProject.frontend[0] / currentProject.frontend[1] * 100 : 0;
  const backendProgress = currentProject ? currentProject.backend[0] / currentProject.backend[1] * 100 : 0;

  const MAX_UPCOMING = 8;
  const [upcomingProjects, setUpcomingProjects] = React.useState([]);

  // Update the list of shown upcoming projects
  React.useEffect(() => {
    // console.log(projects);
    let up = projects.slice(0, MAX_UPCOMING);
    let isDifferent = up.length !== upcomingProjects.length;
    for (let i=0; i<up.length; i++) {
      if (projects[i].name !== up[i].name) {
        isDifferent = true;
        break;
      }
    }
    if (isDifferent) {
      setUpcomingProjects(up);
    }
  }, [upcomingProjects, projects, projects.length]);

  const getReward = (p) => {
    if (!p) {
      return 'N/A';
    }
    if (p.money) { // Earn money
      return `$${p.money}`
    }
    if (p.worker) { // Get a special employee
      return `Unlock employee ${p.worker.name}`
    }
    if (p.maxEmployees) { // Increase max number of employees
      return `+${p.maxEmployees} max number of employees`
    }
    if (p.currentLOC) { // Increase lines of code for all current employees
      return `+${p.currentLOC} LOC per hour for all current employees`
    }
    if (p.futureLOC) { // Increase lines of code for all future employees
      return `+${p.futureLOC} LOC per hour for all future employees`
    }
    if (p.project) {
      return `Unlock project ${p.project.name}`
    }
    if (p.specialProjectRate) {
      return `Increases the rate of special projects`
    }
    return 'N/A'
  }
  const handleRemove = (project) => {
    console.log(`Removing project ${project.name}`);
    setProjects(projects.filter((p) => p.name !== project.name));
  }

  return (
    <Grid container sx={{ mt: 2 }}>
      <Grid xs={6}>
        <Card sx={{bgcolor: brightnessMode === 'dark' ? grey[700] : grey[50], width: 425, my: 2}}>
          <Container>
            <List sx={{mt: 1}}>
              <ListItemButton sx={{bgcolor: brightnessMode === 'dark' ? grey[900] : grey[200]}}>
                <Stack>
                <Typography fontFamily='monospace' variant='h4'><strong>Dashboard</strong></Typography>
                <Typography fontFamily='monospace'>Day {day} - Hour {hour}</Typography>
                </Stack>
              </ListItemButton>
            </List>
            <Grid container spacing={1}>
              <Grid xs={8}>
                <List>
                  <Tooltip title={`Your company's total wealth`}>
                  <ListItemButton dense sx={{bgcolor: brightnessMode === 'dark' ? grey[900] : grey[200]}}>
                    <ListItemIcon>
                      <AttachMoneyIcon />
                    </ListItemIcon>
                    <Typography fontFamily='monospace'>
                      Balance
                    </Typography>
                  </ListItemButton>
                  </Tooltip>
                </List>
                <List sx={{mt: -1}}>
                  <Tooltip title={`Number of employees out of maximum number of employees`}>
                  <ListItemButton dense sx={{bgcolor: brightnessMode === 'dark' ? grey[900] : grey[200]}}>
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <Typography fontFamily='monospace'>
                      Employees
                    </Typography>
                  </ListItemButton>
                  </Tooltip>
                </List>
                <List sx={{mt: -1}}>
                  <ListItemButton dense sx={{bgcolor: brightnessMode === 'dark' ? grey[900] : grey[200]}}>
                    <ListItemIcon>
                      <CodeIcon />
                    </ListItemIcon>
                    <Tooltip title='LOC stands for Lines Of Code'>
                      <Typography fontFamily='monospace'>
                        LOC written
                      </Typography>
                    </Tooltip>
                  </ListItemButton>
                </List>
                <List sx={{mt: -1}}>
                  <Tooltip title="Number of projects you've completed">
                  <ListItemButton dense sx={{bgcolor: brightnessMode === 'dark' ? grey[900] : grey[200]}}>
                    <ListItemIcon>
                      <WebIcon />
                    </ListItemIcon>
                    <Typography fontFamily='monospace'>
                      Websites built
                    </Typography>
                  </ListItemButton>
                  </Tooltip>
                </List>
                <List sx={{mt: -1}}>
                  <Tooltip title="Number of forms you've submitted">
                  <ListItemButton dense sx={{bgcolor: brightnessMode === 'dark' ? grey[900] : grey[200]}}>
                    <ListItemIcon>
                      <ArticleIcon />
                    </ListItemIcon>
                    <Typography fontFamily='monospace'>
                      Paperwork done
                    </Typography>
                  </ListItemButton>
                  </Tooltip>
                </List>
              </Grid>
              <Grid xs={4}>
                <List>
                  <ListItemButton dense sx={{bgcolor: brightnessMode === 'dark' ? grey[900] : grey[200]}}>
                    <Typography fontFamily='monospace'>
                      {Math.round(money)}
                    </Typography>
                  </ListItemButton>
                </List>
                <List sx={{mt: -1}}>
                  <ListItemButton dense sx={{bgcolor: brightnessMode === 'dark' ? grey[900] : grey[200]}}>
                    <Typography fontFamily='monospace'>
                      {numEmployees}/{maxEmployees}
                    </Typography>
                  </ListItemButton>
                </List>
                <List sx={{mt: -1}}>
                  <ListItemButton dense sx={{bgcolor: brightnessMode === 'dark' ? grey[900] : grey[200]}}>
                    <Typography fontFamily='monospace'>
                      {Math.round(totalLOC)}
                    </Typography>
                  </ListItemButton>
                </List>
                <List sx={{mt: -1}}>
                  <ListItemButton dense sx={{bgcolor: brightnessMode === 'dark' ? grey[900] : grey[200]}}>
                    <Typography fontFamily='monospace'>
                      {totalProjects}
                    </Typography>
                  </ListItemButton>
                </List>
                <List sx={{mt: -1}}>
                  <ListItemButton dense sx={{bgcolor: brightnessMode === 'dark' ? grey[900] : grey[200]}}>
                    <Typography fontFamily='monospace'>
                      {totalPapers}
                    </Typography>
                  </ListItemButton>
                </List>
              </Grid>
            </Grid>
          </Container>
        </Card>

        <Typography fontFamily='monospace' variant='h4'><strong>&nbsp;Current Project</strong></Typography>
        <Card sx={{bgcolor: currentProject?.color || (brightnessMode === 'dark' ? grey[800] : grey[50]), width: 425, mb: 1}}>
          <CardHeader
            avatar={<IconButton>
                      <ProjectIcon icon={currentProject?.icon || 0} color={currentProject?.iconColor || 'blue'} />
                    </IconButton>}
            title={<Typography variant='h5'>{currentProject?.name || 'N/A'}</Typography>}
            subheader={currentProject?.color ? 'Special Project' : 'Normal Project'}
          />
          <Divider sx={{my: -1}} />
            <List>
              <ListItemButton dense>
                <Container>
                <Stack>
                  <Typography variant='h6'><strong>Frontend</strong></Typography>
                  <Tooltip title={`${Math.round(frontendProgress)}%`}>
                    <LinearProgress variant='determinate' value={frontendProgress} />
                  </Tooltip>
                  <Tooltip title='Total number of lines of code written'>
                    <Typography fontFamily='monospace'>{Math.round(currentProject?.frontend[0] || 0)} / {Math.round(currentProject?.frontend[1] || 0)} LOC completed</Typography>
                  </Tooltip>
                </Stack>
                </Container>
              </ListItemButton>
              <ListItemButton dense>
                <Container>
                <Stack>
                  <Typography variant='h6'><strong>Backend</strong></Typography>
                  <Tooltip title={`${Math.round(backendProgress)}%`}>
                    <LinearProgress variant='determinate' value={backendProgress} />
                  </Tooltip>
                  <Tooltip title='LOC stands for Lines Of Code'>
                    <Typography fontFamily='monospace'>{Math.round(currentProject?.backend[0] || 0)} / {Math.round(currentProject?.backend[1] || 0)} LOC completed</Typography>
                  </Tooltip>
                </Stack>
                </Container>
              </ListItemButton>
              <ListItemButton dense sx={{mb: 1}}>
                <Container>
                <Stack>
                  <Typography variant='h6'><strong>Reward</strong></Typography>
                  <Typography fontFamily='monospace' color='#00b000' ><strong>{getReward(currentProject)}</strong></Typography>
                </Stack>
                </Container>
              </ListItemButton>
            </List>
        </Card>

      </Grid>
      <Grid xs={6}>
        <Typography fontFamily='monospace' variant='h4' sx={{mt: 2}}><strong>&nbsp;Upcoming Projects</strong></Typography>
        <Card sx={{bgcolor: brightnessMode === 'dark' ? grey[900] : grey[50], width: 391, mb: 1}}>
          <List>
          { upcomingProjects.length === 0 ? 
            <ListItem>
              <ListItemAvatar>
                <IconButton>
                  <AdbIcon />
                </IconButton>
              </ListItemAvatar>
              <ListItemText primary='None available' />
            </ListItem> :
            <TransitionGroup>
              {upcomingProjects.map((p) => (
                <Collapse key={p.name}>
                  <ListItem
                    sx={{ bgcolor: p.color }}
                    secondaryAction={
                      <Tooltip title='Remove project from queue'><span>
                        <IconButton
                          edge='end'
                          onClick={() => handleRemove(p)}
                          disabled={maxEmployees<5}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </span></Tooltip>
                    }
                  >
                    <Stack sx={{mr: 2}}>
                      <Stack sx={{width: '8vw'}} direction='row'>
                        <ProjectIcon icon={p.icon || 0} color={p.iconColor || 'blue'} size='16px' />
                        <Typography sx={{mt: -0.4}}><strong>&nbsp;&nbsp;{p.name}</strong></Typography>
                      </Stack>
                      <Typography fontFamily='monospace' variant='caption'>{p.frontend[1]} frontend LOC</Typography>
                      <Typography fontFamily='monospace' variant='caption' sx={{my: -0.5}}>{p.backend[1]} backend LOC</Typography>
                    </Stack>
                    <Typography sx={{my: 'auto'}} fontFamily='monospace' color='#00b000' variant='caption'><strong>{getReward(p)}</strong></Typography>
                  </ListItem>
                  <Divider />
                </Collapse>
              ))}
            </TransitionGroup>
          }
          </List>
        </Card>
      </Grid>
      <Grid sx={{mt: 1}} xs={6}>
        
      </Grid>

    </Grid>
  )
}